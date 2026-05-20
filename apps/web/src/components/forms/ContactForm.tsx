'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { contactFormSchema, type ContactFormInput } from '@/lib/schema';

type ContactResponse =
  | { ok: true; message: string }
  | { ok: false; message?: string; errors?: string[] };

const baseInputClassName =
  'w-full border border-navy/15 bg-white px-4 py-3 text-base text-navy outline-none transition placeholder:text-navy/35 focus:border-accent';

export function ContactForm() {
  const [submitState, setSubmitState] = useState<{
    status: 'idle' | 'success' | 'error';
    message?: string;
  }>({ status: 'idle' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState({ status: 'idle' });

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as ContactResponse;

    if (!response.ok || !payload.ok) {
      const message =
        'errors' in payload && payload.errors?.length
          ? payload.errors[0]
          : payload.message ?? 'Something went wrong. Please try again.';

      setSubmitState({
        status: 'error',
        message,
      });
      return;
    }

    reset();
    setSubmitState({
      status: 'success',
      message: payload.message,
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5">
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

      <Field label="Company" error={errors.company?.message}>
        <input
          {...register('company')}
          autoComplete="organization"
          className={baseInputClassName}
          placeholder="Company name"
        />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register('message')}
          className={`${baseInputClassName} min-h-[180px] resize-y`}
          placeholder="Tell us what you're building, what you need, and what success looks like."
        />
      </Field>

      <div className="flex flex-col gap-3 border-t border-navy/10 pt-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center bg-navy px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Sending...' : 'Send Enquiry'}
        </button>

        {submitState.message ? (
          <p
            className={`text-sm ${
              submitState.status === 'error' ? 'text-[#a33a32]' : 'text-[#226b4b]'
            }`}
          >
            {submitState.message}
          </p>
        ) : null}
      </div>
    </form>
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
      <span className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-navy/65">
        {label}
      </span>
      {children}
      {error ? <span className="text-sm text-[#a33a32]">{error}</span> : null}
    </label>
  );
}
