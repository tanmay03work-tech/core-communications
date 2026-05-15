import Link from 'next/link';

type BrandLockupProps = {
  href?: string;
  compact?: boolean;
  footer?: boolean;
};

export default function BrandLockup({
  href = '/',
  compact = false,
  footer = false,
}: BrandLockupProps) {
  const iconSize = compact ? 'h-[3.35rem] w-[3.35rem]' : 'h-[3.8rem] w-[3.8rem]';
  const titleSize = compact ? 'text-[2.15rem]' : 'text-[2.45rem]';
  const subtitleSize = compact ? 'text-[0.86rem]' : 'text-[0.94rem]';

  return (
    <Link
      href={href}
      aria-label="Core Communications Home"
      className="inline-flex items-center gap-4 no-underline"
    >
      <span className={`relative shrink-0 ${iconSize}`}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          aria-hidden="true"
        >
          <circle cx="32" cy="32" r="22" stroke="#5BC0EB" strokeWidth="2.4" />
          <circle cx="32" cy="32" r="10" stroke="#5BC0EB" strokeWidth="2.4" />
          <path d="M32 7.5V20.5" stroke="#5BC0EB" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="32" cy="8" r="3.2" fill="#5BC0EB" />
          <circle cx="32" cy="32" r="2.6" fill="#5BC0EB" />
        </svg>
      </span>

      <span className="flex flex-col justify-center leading-none">
        <span className={`font-title font-black uppercase tracking-[0.08em] text-white ${titleSize}`}>
          CORE
        </span>
        <span className={`mt-1.5 font-sans uppercase tracking-[0.29em] text-accent ${subtitleSize}`}>
          Communications
        </span>
        {footer && (
          <span className="mt-3 inline-flex w-fit rounded-full border border-accent/20 bg-accent/8 px-3 py-1 text-[0.58rem] uppercase tracking-[0.24em] text-accent">
            APAC Tech Communications
          </span>
        )}
      </span>
    </Link>
  );
}
