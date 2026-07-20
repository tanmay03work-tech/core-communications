'use client';

import Image from 'next/image';

type AnimatedLogoMarkProps = {
  className?: string;
  size?: number;
  light?: boolean;
};

export default function AnimatedLogoMark({
  className,
  size = 48,
  light = false,
}: AnimatedLogoMarkProps) {
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        position: 'relative',
        display: 'inline-block',
        width: size,
        height: size,
      }}
    >
      <Image
        src="/core_logo_final.svg"
        alt=""
        fill
        sizes={`${size}px`}
        className={light ? 'object-contain brightness-0 invert' : 'object-contain'}
        priority={true}
      />
    </span>
  );
}
