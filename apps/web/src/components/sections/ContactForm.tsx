'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, LoaderCircle, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  contactFormSchema,
  contactServiceOptions,
  type ContactApiResponse,
  type ContactFormInput,
} from '@/lib/schema';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          size: 'invisible';
          callback: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        },
      ) => string;
      execute: (widgetId: string) => void;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const baseInputClassName =
  'w-full rounded-[1rem] border border-navy/12 bg-[rgba(245,247,250,0.95)] px-4 py-3.5 text-base text-navy outline-none transition placeholder:text-navy/35 focus:border-accent focus:bg-white disabled:cursor-not-allowed disabled:opacity-60';

type SubmitState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

type ToastState =
  | { tone: 'error' | 'success'; message: string }
  | null;

export function ContactForm() {
  const turnstileId = useId().replace(/:/g, '');
  const widgetIdRef = useRef<string | null>(null);
  const executeResolverRef = useRef<((token: string) => void) | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });
  const [toast, setToast] = useState<ToastState>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      service: contactServiceOptions[0],
      message: '',
    },
  });

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => setToast(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (!turnstileSiteKey) {
      return;
    }

    let cancelled = false;

    const mountWidget = () => {
      if (cancelled || !window.turnstile || widgetIdRef.current) {
        return;
      }

      const container = document.getElementById(turnstileId);
      if (!container) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: turnstileSiteKey,
        size: 'invisible',
        callback: (token) => {
          executeResolverRef.current?.(token);
          executeResolverRef.current = null;
        },
        'expired-callback': () => {
          executeResolverRef.current = null;
        },
        'error-callback': () => {
          executeResolverRef.current = null;
          setToast({
            tone: 'error',
            message: 'Spam protection could not be verified. Please try again.',
          });
        },
      });
    };

    if (window.turnstile) {
      mountWidget();
    } else {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[data-turnstile-script="true"]',
      );

      const onLoad = () => mountWidget();

      if (existingScript) {
        existingScript.addEventListener('load', onLoad);

        return () => {
          existingScript.removeEventListener('load', onLoad);
          cancelled = true;
          if (widgetIdRef.current && window.turnstile) {
            window.turnstile.remove(widgetIdRef.current);
            widgetIdRef.current = null;
          }
        };
      }

      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.turnstileScript = 'true';
      script.addEventListener('load', onLoad);
      document.head.appendChild(script);

      return () => {
        script.removeEventListener('load', onLoad);
        cancelled = true;
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [turnstileId]);

  const getTurnstileToken = async () => {
    if (!turnstileSiteKey) {
      throw new Error('Turnstile is not configured.');
    }

    if (!window.turnstile || !widgetIdRef.current) {
      throw new Error('Turnstile is still loading.');
    }

    return new Promise<string>((resolve, reject) => {
      executeResolverRef.current = resolve;
      window.turnstile?.reset(widgetIdRef.current!);
      window.turnstile?.execute(widgetIdRef.current!);

      window.setTimeout(() => {
        if (executeResolverRef.current) {
          executeResolverRef.current = null;
          reject(new Error('Turnstile verification timed out.'));
        }
      }, 10000);
    });
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState({ status: 'idle' });

    try {
      const turnstileToken = await getTurnstileToken();
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          turnstileToken,
        }),
      });

      const payload = (await response.json()) as ContactApiResponse;

      if (!payload.ok) {
        if (payload.errors) {
          for (const [field, messages] of Object.entries(payload.errors)) {
            if (!messages?.length) {
              continue;
            }

            setError(field as keyof ContactFormInput, {
              type: 'server',
              message: messages[0],
            });
          }
        }

        const message = payload.message || 'Something went wrong. Please try again.';
        setSubmitState({ status: 'error', message });
        setToast({ tone: 'error', message });
        return;
      }

      if (!response.ok) {
        const message = 'Something went wrong. Please try again.';
        setSubmitState({ status: 'error', message });
        setToast({ tone: 'error', message });
        return;
      }

      reset({
        name: '',
        email: '',
        company: '',
        service: contactServiceOptions[0],
        message: '',
      });
      setSubmitState({ status: 'success', message: payload.message });
      setToast({ tone: 'success', message: payload.message });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setSubmitState({ status: 'error', message });
      setToast({ tone: 'error', message });
    }
  });

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" error={errors.name?.message}>
            <input
              {...register('name')}
              autoComplete="name"
              className={baseInputClassName}
              placeholder="Your name"
            />
          </Field>

          <Field label="Email" error={errors.email?.message}>
            <input
              {...register('email')}
              autoComplete="email"
              className={baseInputClassName}
              placeholder="you@company.com"
              type="email"
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Company" error={errors.company?.message}>
            <input
              {...register('company')}
              autoComplete="organization"
              className={baseInputClassName}
              placeholder="Company name"
            />
          </Field>

          <Field label="Service" error={errors.service?.message}>
            <select {...register('service')} className={baseInputClassName} defaultValue={contactServiceOptions[0]}>
              {contactServiceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Message" error={errors.message?.message}>
          <textarea
            {...register('message')}
            className={`${baseInputClassName} min-h-[180px] resize-y`}
            placeholder="Tell us what you're building, what you need, and what success looks like."
          />
        </Field>

        <div id={turnstileId} className="sr-only" aria-hidden="true" />

        <div className="flex flex-col gap-4 border-t border-navy/10 pt-6">
          <button
            type="submit"
            disabled={isSubmitting || !turnstileSiteKey}
            className="inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[1rem] bg-[linear-gradient(180deg,rgba(25,46,78,0.98),rgba(18,35,61,0.98))] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span
              className={cn(
                'inline-flex items-center gap-3 transition-all duration-300',
                isSubmitting ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-100',
              )}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Sending Message
                </>
              ) : submitState.status === 'success' ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Message Sent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Start the Conversation
                </>
              )}
            </span>
          </button>

          {!turnstileSiteKey ? (
            <p className="text-sm text-[#a33a32]">
              Contact form is unavailable until `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is configured.
            </p>
          ) : null}

          {submitState.status === 'success' ? (
            <div className="flex items-start gap-3 rounded-2xl border border-[#226b4b]/20 bg-[#226b4b]/5 px-4 py-3 text-[#226b4b] animate-in fade-in duration-300">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm">{submitState.message}</p>
            </div>
          ) : null}

          {submitState.status === 'error' && !toast ? (
            <p className="text-sm text-[#a33a32]">{submitState.message}</p>
          ) : null}
        </div>
      </form>

      {toast ? (
        <div
          className={cn(
            'fixed right-4 top-24 z-50 max-w-sm rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur animate-in slide-in-from-top-3 duration-300',
            toast.tone === 'error'
              ? 'border-[#a33a32]/20 bg-white text-[#a33a32]'
              : 'border-[#226b4b]/20 bg-white text-[#226b4b]',
          )}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      ) : null}
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-navy/60">
        {label}
      </span>
      {children}
      {error ? <span className="text-sm text-[#a33a32]">{error}</span> : null}
    </label>
  );
}
