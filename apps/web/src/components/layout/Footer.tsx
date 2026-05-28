'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {type MouseEvent as ReactMouseEvent} from 'react';
import {SITE, FOOTER} from '@/lib/constants';
import {Container} from './Container';
import BrandLockup from './BrandLockup';

export default function Footer() {
  const pathname = usePathname() ?? '/';
  const year = new Date().getFullYear();

  const handleFooterClick = (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('/#')) {
      return;
    }

    const id = href.slice(2);

    if (pathname === '/') {
      event.preventDefault();
      const element = document.getElementById(id);

      if (element) {
        window.history.pushState(null, '', href);
        element.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#0D1B2E_0%,#0B1F33_100%)] text-white">
      {/* Top accent bar */}
      <div className="h-[3px] w-full bg-[linear-gradient(90deg,#1C2E4A_0%,#5BC0EB_50%,#1C2E4A_100%)]" />

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(91,192,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(91,192,235,0.04) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.6))',
        }}
      />

      <Container className="relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 items-start gap-8 py-10 md:grid-cols-[1.1fr_0.75fr_1fr] md:gap-10 md:py-12 lg:py-14">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <BrandLockup footer />
            <p className="max-w-[320px] font-sans text-[0.88rem] font-normal leading-[1.65] text-white/78">
              {SITE.description}
            </p>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(91,192,235,0.5)]" />
              <span className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-white/72 sm:tracking-[0.2em]">
                Sydney · Mumbai
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4 md:pt-1">
            <h4 className="break-words text-[0.64rem] font-bold uppercase tracking-[0.2em] text-white sm:tracking-[0.24em]">
              Navigation
            </h4>
            <ul className="flex list-none flex-col gap-2.5">
              {FOOTER.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(event) => handleFooterClick(event, link.href)}
                    className="group inline-flex items-center gap-2 font-sans text-[0.88rem] font-semibold text-white/78 no-underline transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-px w-0 rounded-full bg-accent transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact card */}
          <div className="flex flex-col gap-4 md:pt-1">
            <h4 className="break-words text-[0.64rem] font-bold uppercase tracking-[0.2em] text-white sm:tracking-[0.24em]">
              Contacts
            </h4>
            <div className="rounded-[1rem] border border-white/12 bg-white/[0.04] p-4 backdrop-blur-sm">
              {/* Top gradient line */}
              <div className="mb-3 h-px w-full bg-[linear-gradient(90deg,rgba(91,192,235,0.6),transparent)]" />
              <div className="flex flex-col gap-2.5">
                <a
                  href={`mailto:${SITE.email}`}
                  className="break-all font-sans text-[0.88rem] font-semibold text-white/84 no-underline transition-colors hover:text-white"
                >
                  {SITE.email}
                </a>
                <a
                  href={`tel:${SITE.phone}`}
                  className="font-sans text-[0.88rem] font-semibold text-white/84 no-underline transition-colors hover:text-white"
                >
                  {SITE.phone}
                </a>
              </div>
              <div className="my-3 h-px w-full bg-white/8" />
              <div className="flex flex-col gap-1">
                {SITE.locations.map((loc) => (
                  <span key={loc} className="font-sans text-[0.82rem] font-semibold text-white/72">
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] py-5 sm:flex-row">
          <p className="text-[0.64rem] uppercase tracking-[0.18em] text-white/50">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[0.64rem] uppercase tracking-[0.18em] text-white/50 no-underline transition-colors hover:text-white/70"
            >
              Privacy
            </Link>
            <span className="text-white/16">·</span>
            <Link
              href="/terms"
              className="text-[0.64rem] uppercase tracking-[0.18em] text-white/50 no-underline transition-colors hover:text-white/70"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
