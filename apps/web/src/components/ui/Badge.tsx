import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

export default function Badge({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border border-current/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em]',
        className,
      )}
    >
      {children}
    </span>
  );
}

