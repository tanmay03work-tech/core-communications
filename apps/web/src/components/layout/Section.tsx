import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  spacing?: 'default' | 'large' | 'none';
  theme?: 'dark' | 'light' | 'transparent';
}

export function Section({
  children,
  className,
  id,
  spacing = 'default',
  theme = 'transparent',
}: SectionProps) {
  const themeClasses = {
    dark: 'bg-navy text-white',
    light: 'bg-surface-light text-navy',
    transparent: 'bg-transparent',
  };

  const spacingClasses = {
    default: 'py-section',
    large: 'py-section-lg',
    none: 'py-0',
  };

  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        themeClasses[theme],
        spacingClasses[spacing],
        className
      )}
    >
      {children}
    </section>
  );
}
