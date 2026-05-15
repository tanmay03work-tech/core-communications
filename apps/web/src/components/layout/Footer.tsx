import Link from 'next/link';
import { SITE, FOOTER } from '@/lib/constants';
import { Container } from './Container';
import BrandLockup from './BrandLockup';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy/[0.08] bg-[linear-gradient(180deg,#F5F7FA_0%,#ffffff_42%,#F5F7FA_100%)] pt-20 pb-8 text-navy">
      <Container>
        <div className="mb-12 overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_28px_70px_rgba(28,46,74,0.08)] ring-1 ring-navy/[0.05]">
          <div className="h-1 w-full bg-[linear-gradient(90deg,#1C2E4A_0%,#5BC0EB_100%)]" />
          <div className="grid grid-cols-1 gap-12 px-8 py-10 md:grid-cols-[1.35fr_0.85fr_0.85fr_1fr] lg:px-12 lg:py-12">
            <div className="flex flex-col gap-6">
              <BrandLockup footer />
              <p className="max-w-[320px] text-[1rem] font-light leading-[1.9] text-navy/62">
              {SITE.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_16px_rgba(91,192,235,0.45)]" />
                <span className="text-[0.68rem] uppercase tracking-[0.24em] text-navy/44">
                  Sydney and Mumbai
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="mb-1 text-[0.66rem] font-bold uppercase tracking-[0.28em] text-navy/38">
                Services
              </h4>
              <ul className="flex list-none flex-col gap-3.5">
                {FOOTER.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[1rem] font-light text-navy/66 no-underline transition-colors hover:text-deep"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="mb-1 text-[0.66rem] font-bold uppercase tracking-[0.28em] text-navy/38">
                Sectors
              </h4>
              <ul className="flex list-none flex-col gap-3.5">
                {FOOTER.sectors.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[1rem] font-light text-navy/66 no-underline transition-colors hover:text-deep"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="mb-1 text-[0.66rem] font-bold uppercase tracking-[0.28em] text-navy/38">
                Contact
              </h4>
              <div className="rounded-[1.35rem] border border-navy/[0.08] bg-[linear-gradient(180deg,#ffffff_0%,#F5F7FA_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <div className="flex flex-col gap-3">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="break-all text-[1rem] font-light text-navy/68 no-underline transition-colors hover:text-deep"
                  >
                    {SITE.email}
                  </a>
                  <a
                    href={`tel:${SITE.phone}`}
                    className="text-[1rem] font-light text-navy/68 no-underline transition-colors hover:text-deep"
                  >
                    {SITE.phone}
                  </a>
                </div>
                <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
                <div className="flex flex-col gap-1.5">
                  {SITE.locations.map((loc) => (
                    <span key={loc} className="text-[0.92rem] font-light text-navy/46">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-navy/[0.08] pt-7 sm:flex-row">
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-navy/34">
            Copyright {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[0.68rem] uppercase tracking-[0.2em] text-navy/34 no-underline transition-colors hover:text-navy/60"
            >
              Privacy
            </Link>
            <span className="text-navy/20">.</span>
            <Link
              href="/terms"
              className="text-[0.68rem] uppercase tracking-[0.2em] text-navy/34 no-underline transition-colors hover:text-navy/60"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
