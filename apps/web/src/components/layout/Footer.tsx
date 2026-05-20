import Link from 'next/link';
import { SITE, FOOTER } from '@/lib/constants';
import { Container } from './Container';
import BrandLockup from './BrandLockup';

export default function Footer() {
  const year = new Date().getFullYear();

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
        <div className="grid grid-cols-1 gap-12 py-16 md:py-20 md:grid-cols-[1.4fr_0.9fr_0.9fr_1.1fr] lg:py-24">

          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <BrandLockup footer />
            <p className="max-w-[300px] text-[0.92rem] font-light leading-[1.85] text-white/52">
              {SITE.description}
            </p>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(91,192,235,0.5)]" />
              <span className="text-[0.65rem] uppercase tracking-[0.26em] text-white/38">
                Sydney · Mumbai
              </span>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/32">
              Services
            </h4>
            <ul className="flex list-none flex-col gap-3">
              {FOOTER.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[0.9rem] font-light text-white/52 no-underline transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-px w-0 rounded-full bg-accent transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectors */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/32">
              Sectors
            </h4>
            <ul className="flex list-none flex-col gap-3">
              {FOOTER.sectors.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[0.9rem] font-light text-white/52 no-underline transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-px w-0 rounded-full bg-accent transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact card */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/32">
              Contact
            </h4>
            <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.04] p-5 backdrop-blur-sm">
              {/* Top gradient line */}
              <div className="mb-4 h-px w-full bg-[linear-gradient(90deg,rgba(91,192,235,0.6),transparent)]" />
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="break-all text-[0.9rem] font-light text-white/62 no-underline transition-colors hover:text-white"
                >
                  {SITE.email}
                </a>
                <a
                  href={`tel:${SITE.phone}`}
                  className="text-[0.9rem] font-light text-white/62 no-underline transition-colors hover:text-white"
                >
                  {SITE.phone}
                </a>
              </div>
              <div className="my-4 h-px w-full bg-white/8" />
              <div className="flex flex-col gap-1.5">
                {SITE.locations.map((loc) => (
                  <span key={loc} className="text-[0.82rem] font-light text-white/36">
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] py-7 sm:flex-row">
          <p className="text-[0.64rem] uppercase tracking-[0.22em] text-white/28">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[0.64rem] uppercase tracking-[0.22em] text-white/28 no-underline transition-colors hover:text-white/55"
            >
              Privacy
            </Link>
            <span className="text-white/16">·</span>
            <Link
              href="/terms"
              className="text-[0.64rem] uppercase tracking-[0.22em] text-white/28 no-underline transition-colors hover:text-white/55"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
