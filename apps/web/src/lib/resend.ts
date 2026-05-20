import { Resend } from 'resend';
import { SITE } from '@/lib/constants';

const resendApiKey = process.env.RESEND_API_KEY;

export function isResendConfigured() {
  return Boolean(resendApiKey && process.env.RESEND_FROM_EMAIL);
}

export function getResendClient() {
  if (!resendApiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  return new Resend(resendApiKey);
}

export function getContactEmailConfig() {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL_TO ?? SITE.email;

  if (!from) {
    throw new Error('Contact email sender is not configured.');
  }

  return { from, to };
}

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
}
