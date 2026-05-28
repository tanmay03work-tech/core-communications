import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'outline';
  }
>;

export default function Button({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition-all',
        variant === 'primary'
          ? 'bg-accent text-ink hover:bg-navy hover:text-white'
          : 'border border-current text-current hover:bg-current hover:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
