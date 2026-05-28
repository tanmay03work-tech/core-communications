import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { ZodError } from 'zod';
import { AutoReplyEmail } from '@/emails/AutoReplyEmail';
import { NotificationEmail } from '@/emails/NotificationEmail';
import { getContactEmailConfig, getResendClient, isResendConfigured } from '@/lib/resend';
import {
  validateContactFormInput,
  validateContactSubmission,
  type ContactApiErrorResponse,
  type ContactApiResponse,
} from '@/lib/schema';

const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitStore = new Map<string, { count: number; expiresAt: number }>();
export const maxDuration = 10;

type TurnstileVerificationResponse = {
  success: boolean;
  'error-codes'?: string[];
};

function jsonResponse(body: ContactApiResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers,
  });
}

function flattenValidationErrors(error: ZodError) {
  const fieldErrors = error.flatten().fieldErrors;

  return Object.fromEntries(
    Object.entries(fieldErrors).filter(([, messages]) => messages && messages.length > 0),
  );
}

function getClientIp(requestHeaders: Headers) {
  const cloudflareIp = requestHeaders.get('cf-connecting-ip');
  if (cloudflareIp) {
    return cloudflareIp;
  }

  const forwardedFor = requestHeaders.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown';
  }

  return requestHeaders.get('x-real-ip') ?? 'unknown';
}

async function checkVercelKvRateLimit(ip: string) {
  const restUrl = process.env.KV_REST_API_URL;
  const restToken = process.env.KV_REST_API_TOKEN;

  if (!restUrl || !restToken) {
    return null;
  }

  const key = `contact-rate-limit:${ip}`;
  const requestInit = {
    headers: {
      Authorization: `Bearer ${restToken}`,
    },
    cache: 'no-store' as const,
  };

  const incrementResponse = await fetch(`${restUrl}/incr/${encodeURIComponent(key)}`, requestInit);
  if (!incrementResponse.ok) {
    throw new Error('Rate limit increment failed.');
  }

  const incrementResult = (await incrementResponse.json()) as { result?: number };
  const currentCount = Number(incrementResult.result ?? 0);

  if (currentCount === 1) {
    const expireResponse = await fetch(
      `${restUrl}/expire/${encodeURIComponent(key)}/${RATE_LIMIT_WINDOW_SECONDS}`,
      requestInit,
    );

    if (!expireResponse.ok) {
      throw new Error('Rate limit expiry write failed.');
    }
  }

  return currentCount <= RATE_LIMIT_MAX_REQUESTS;
}

async function checkRateLimit(ip: string) {
  const kvResult = await checkVercelKvRateLimit(ip);
  if (typeof kvResult === 'boolean') {
    return kvResult;
  }

  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.expiresAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_SECONDS * 1000,
    });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  rateLimitStore.set(ip, {
    count: entry.count + 1,
    expiresAt: entry.expiresAt,
  });
  return true;
}

async function verifyTurnstileToken(token: string, ip: string) {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET;

  if (!secret) {
    return true;
  }

  if (!token) {
    return false;
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: ip,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Turnstile verification request failed.');
  }

  const result = (await response.json()) as TurnstileVerificationResponse;
  return result.success;
}

export async function POST(request: Request) {
  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);
  const allowed = await checkRateLimit(ip);

  if (!allowed) {
    return jsonResponse(
      {
        ok: false,
        message: 'Too many requests. Please wait a minute before sending another message.',
      },
      429,
      {
        'Retry-After': String(RATE_LIMIT_WINDOW_SECONDS),
      },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: 'Invalid request body.',
      },
      400,
    );
  }

  const submissionResult = validateContactSubmission(payload);

  if (!submissionResult.success) {
    const errorResponse: ContactApiErrorResponse = {
      ok: false,
      message: 'Please correct the highlighted fields and try again.',
      errors: flattenValidationErrors(submissionResult.error),
    };

    return jsonResponse(errorResponse, 400);
  }

  const turnstileValid = await verifyTurnstileToken(submissionResult.data.turnstileToken, ip).catch(
    () => false,
  );

  if (!turnstileValid) {
    return jsonResponse(
      {
        ok: false,
        message: 'Spam protection check failed. Please try again.',
        errors: {
          turnstileToken: ['Turnstile verification failed.'],
        },
      },
      400,
    );
  }

  const contactResult = validateContactFormInput(submissionResult.data);

  if (!contactResult.success) {
    return jsonResponse(
      {
        ok: false,
        message: 'Please correct the highlighted fields and try again.',
        errors: contactResult.error.flatten().fieldErrors,
      },
      400,
    );
  }

  if (!isResendConfigured()) {
    return jsonResponse(
      {
        ok: false,
        message: 'Contact email is not configured yet.',
      },
      503,
    );
  }

  try {
    const resend = getResendClient();
    const { from, to } = getContactEmailConfig();

    await resend.emails.send({
      from,
      to,
      replyTo: contactResult.data.email,
      subject: `New Core Communications enquiry from ${contactResult.data.name}`,
      react: NotificationEmail(contactResult.data),
    });

    await resend.emails.send({
      from,
      to: contactResult.data.email,
      subject: 'Thanks for contacting Core Communications',
      react: AutoReplyEmail({
        name: contactResult.data.name,
      }),
    });

    return jsonResponse(
      {
        ok: true,
        message: 'Thanks for reaching out. We have your message and will be in touch shortly.',
      },
      200,
    );
  } catch (error) {
    console.error('Contact email send failed', error);

    return jsonResponse(
      {
        ok: false,
        message: 'We could not send your message right now. Please email us directly instead.',
      },
      500,
    );
  }
}
