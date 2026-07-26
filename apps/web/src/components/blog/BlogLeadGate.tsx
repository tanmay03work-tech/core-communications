'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Lock, CheckCircle2, ArrowRight, ShieldCheck, Mail, User, Phone, Sparkles } from 'lucide-react';
import PortableTextContent from '@/components/sections/PortableTextContent';
import type { PortableTextNode } from '@/types';

type BlogLeadGateProps = {
  blogTitle: string;
  blogSlug: string;
  bodyContent?: PortableTextNode[];
  children?: ReactNode;
};

export default function BlogLeadGate({ blogTitle, blogSlug, bodyContent, children }: BlogLeadGateProps) {
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    try {
      const unlocked = localStorage.getItem('core_blog_unlocked');
      if (unlocked === 'true') {
        setIsUnlocked(true);
      } else {
        setIsUnlocked(false);
      }
    } catch {
      setIsUnlocked(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/blog-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          blogTitle,
          blogSlug,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit details');
      }

      try {
        localStorage.setItem('core_blog_unlocked', 'true');
        localStorage.setItem('core_lead_user', JSON.stringify({ name, email, phone }));
      } catch {
        // Fallback if localStorage is disabled
      }

      setSuccessMsg(true);
      setTimeout(() => {
        setIsUnlocked(true);
      }, 700);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setErrorMsg(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Prevent flicker during client hydration
  if (isUnlocked === null) {
    return (
      <div className="animate-pulse space-y-4 py-8">
        <div className="h-6 w-3/4 rounded bg-navy/10" />
        <div className="h-4 w-full rounded bg-navy/10" />
        <div className="h-4 w-5/6 rounded bg-navy/10" />
      </div>
    );
  }

  const safeBodyContent = Array.isArray(bodyContent) ? bodyContent : [];

  if (isUnlocked) {
    return (
      <>
        {safeBodyContent.length > 0 ? (
          <div className="border border-navy/10 bg-white p-5 md:p-8">
            <PortableTextContent value={safeBodyContent} className="text-navy" />
          </div>
        ) : null}
        {children}
      </>
    );
  }

  // Render Gated State: Preview text + Blur + Lead Capture Form
  const previewBlocks = safeBodyContent.slice(0, 2);

  return (
    <div className="relative">
      {/* Article Preview Section */}
      {previewBlocks.length > 0 ? (
        <div className="border border-b-0 border-navy/10 bg-white p-5 md:p-8">
          <PortableTextContent value={previewBlocks} className="text-navy" />
        </div>
      ) : null}

      {/* Blurred Fade-out Effect */}
      <div className="relative z-10 -mt-12 bg-gradient-to-b from-white/60 via-white/95 to-white pb-6 pt-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
          <Lock className="h-3.5 w-3.5 text-primary" />
          <span>Exclusive Access Content</span>
        </div>
      </div>

      {/* Lead Capture Form Card */}
      <div className="relative z-20 overflow-hidden border border-navy/15 bg-white p-6 shadow-[0_20px_60px_rgba(13,27,42,0.09)] sm:p-8 md:p-10">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-accent">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
            Unlock Full Article & Download Guides
          </h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-navy/70">
            Please enter your contact details below to get instant access to full insights, market reports, and downloadable resources.
          </p>
        </div>

        {successMsg ? (
          <div className="mx-auto mt-6 max-w-md rounded-lg border border-accent/30 bg-accent/10 p-6 text-center text-navy">
            <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-accent" />
            <h4 className="font-heading text-lg font-bold">Access Granted!</h4>
            <p className="mt-1 text-xs text-navy/80">Unlocking article and resources...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-4">
            {errorMsg ? (
              <div className="rounded border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
                {errorMsg}
              </div>
            ) : null}

            <div>
              <label htmlFor="gate-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/80">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
                <input
                  id="gate-name"
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-navy/15 bg-surface-light px-3.5 py-2.5 pl-10 text-sm text-navy placeholder:text-navy/35 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="gate-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/80">
                Business Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
                <input
                  id="gate-email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-navy/15 bg-surface-light px-3.5 py-2.5 pl-10 text-sm text-navy placeholder:text-navy/35 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="gate-phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/80">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
                <input
                  id="gate-phone"
                  type="tel"
                  required
                  placeholder="+61 400 000 000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-navy/15 bg-surface-light px-3.5 py-2.5 pl-10 text-sm text-navy placeholder:text-navy/35 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 bg-navy px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-navy/90 disabled:opacity-60"
            >
              <span>{submitting ? 'Submitting Details...' : 'Unlock Article & Guides'}</span>
              <ArrowRight className="h-4 w-4 text-accent" />
            </button>

            <div className="flex items-center justify-center gap-1.5 pt-2 text-[0.7rem] text-navy/50">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>We respect your privacy. No spam.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
