import Image from 'next/image';
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
  const logoWidth = footer
    ? 'w-[170px] md:w-[210px] lg:w-[240px]'
    : 'w-[170px] md:w-[210px] lg:w-[240px]';
  const logoHeight = footer
    ? 'h-[200px] md:h-[248px] lg:h-[296px]'
    : 'h-[50px] md:h-[62px] lg:h-[72px]';

  return (
    <Link
      href={href}
      aria-label="Core Communications Home"
      className={`inline-flex no-underline ${footer ? 'flex-col items-start' : 'items-center'}`}
    >
      <span className={`relative block shrink-0 ${logoWidth} ${logoHeight}`}>
        <Image
          src="/core_logo_clean.svg"
          alt="Core Communications logo"
          fill
          className="object-contain object-left"
          priority={compact}
        />
      </span>
      {footer && (
        <span className="mt-8 inline-flex w-fit rounded-full border border-[#3DB7F2]/20 bg-[#3DB7F2]/5 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.24em] text-[#3DB7F2]">
          APAC Tech Communications
        </span>
      )}
    </Link>
  );
}
