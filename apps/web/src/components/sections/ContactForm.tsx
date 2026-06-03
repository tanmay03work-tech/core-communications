'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, LoaderCircle, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  SERVICE_INTEREST_OPTIONS,
  contactFormSchema,
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
  'w-full rounded-[1rem] border border-navy/12 bg-[rgba(244,246,249,0.95)] px-4 py-3.5 text-base text-navy outline-none transition placeholder:text-navy/35 focus:border-accent focus:bg-white disabled:cursor-not-allowed disabled:opacity-60';

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
  const executeRejecterRef = useRef<((error: Error) => void) | null>(null);
  const executeTimeoutRef = useRef<number | null>(null);
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
      services: [],
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
          if (executeTimeoutRef.current) {
            window.clearTimeout(executeTimeoutRef.current);
            executeTimeoutRef.current = null;
          }

          executeResolverRef.current?.(token);
          executeResolverRef.current = null;
          executeRejecterRef.current = null;
        },
        'expired-callback': () => {
          if (executeTimeoutRef.current) {
            window.clearTimeout(executeTimeoutRef.current);
            executeTimeoutRef.current = null;
          }

          executeResolverRef.current = null;
          executeRejecterRef.current?.(
            new Error('Spam protection expired. Please try again.'),
          );
          executeRejecterRef.current = null;
        },
        'error-callback': () => {
          const error = new Error(
            'Spam protection could not be verified. Please try again.',
          );

          executeResolverRef.current = null;
          executeRejecterRef.current?.(error);
          executeRejecterRef.current = null;

          if (executeTimeoutRef.current) {
            window.clearTimeout(executeTimeoutRef.current);
            executeTimeoutRef.current = null;
          }

          setToast({
            tone: 'error',
            message: error.message,
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
          if (executeTimeoutRef.current) {
            window.clearTimeout(executeTimeoutRef.current);
            executeTimeoutRef.current = null;
          }
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
        if (executeTimeoutRef.current) {
          window.clearTimeout(executeTimeoutRef.current);
          executeTimeoutRef.current = null;
        }
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }

    return () => {
      cancelled = true;
      if (executeTimeoutRef.current) {
        window.clearTimeout(executeTimeoutRef.current);
        executeTimeoutRef.current = null;
      }
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [turnstileId]);

  const getTurnstileToken = async () => {
    if (!turnstileSiteKey) {
      return '';
    }

    if (!window.turnstile || !widgetIdRef.current) {
      throw new Error('Turnstile is still loading.');
    }

    return new Promise<string>((resolve, reject) => {
      executeResolverRef.current = resolve;
      executeRejecterRef.current = reject;
      window.turnstile?.reset(widgetIdRef.current!);
      window.turnstile?.execute(widgetIdRef.current!);

      executeTimeoutRef.current = window.setTimeout(() => {
        if (executeResolverRef.current) {
          executeResolverRef.current = null;
          executeRejecterRef.current = null;
          executeTimeoutRef.current = null;
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
        services: [],
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
          <Field label="Name" error={errors.name?.message} required>
            <input
              {...register('name')}
              autoComplete="name"
              className={baseInputClassName}
              placeholder="Your name"
            />
          </Field>

          <Field label="Email" error={errors.email?.message} required>
            <input
              {...register('email')}
              autoComplete="email"
              className={baseInputClassName}
              placeholder="you@company.com"
              type="email"
            />
          </Field>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-navy/60">
            What services are you interested in?
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICE_INTEREST_OPTIONS.map((service) => (
              <label
                key={service}
                className="group flex items-start gap-3 rounded-[0.875rem] border border-navy/10 bg-[rgba(244,246,249,0.7)] px-3.5 py-3 text-sm text-navy/78 transition duration-200 hover:border-accent/28 hover:bg-white"
              >
                <input
                  {...register('services')}
                  type="checkbox"
                  value={service}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-navy/20 text-primary accent-primary focus:ring-accent"
                />
                <span className="leading-snug transition-colors duration-200 group-hover:text-navy">
                  {service}
                </span>
              </label>
            ))}
          </div>
          {errors.services?.message ? (
            <span className="text-sm text-gold-600">{errors.services.message}</span>
          ) : null}
        </fieldset>

        <Field label="Message" error={errors.message?.message} optional>
          <textarea
            {...register('message')}
            className={`${baseInputClassName} min-h-[150px] resize-y`}
            placeholder="Anything you want to share? This is optional."
          />
        </Field>

        <div id={turnstileId} className="sr-only" aria-hidden="true" />

        <div className="flex flex-col gap-4 border-t border-navy/10 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[1rem] bg-[linear-gradient(180deg,rgba(13,27,42,0.98),rgba(30,47,68,0.98))] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
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

          {submitState.status === 'success' ? (
            <div className="flex items-start gap-3 rounded-2xl border border-accent/20 bg-accent/5 px-4 py-3 text-accent animate-in fade-in duration-300">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm">{submitState.message}</p>
            </div>
          ) : null}

          {submitState.status === 'error' && !toast ? <p className="text-sm text-gold-600">{submitState.message}</p> : null}
        </div>
      </form>

      {toast ? (
        <div
          className={cn(
            'fixed right-4 top-24 z-50 max-w-sm rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur animate-in slide-in-from-top-3 duration-300',
            toast.tone === 'error'
              ? 'border-gold/20 bg-white text-gold-600'
              : 'border-accent/20 bg-white text-accent',
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
  optional,
  required,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-navy/60">
        {label}
        {required ? <span className="ml-1 text-primary">*</span> : null}
        {optional ? <span className="ml-2 text-navy/35">(Optional)</span> : null}
      </span>
      {children}
      {error ? <span className="text-sm text-gold-600">{error}</span> : null}
    </label>
  );
}
