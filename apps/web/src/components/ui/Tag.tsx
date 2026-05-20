import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

export default function Tag({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-4 py-2 text-[0.76rem] uppercase tracking-[0.12em] border border-white/15 text-white/70',
        className,
      )}
    >
      {children}
    </span>
  );
}

