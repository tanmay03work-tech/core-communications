import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GridProps {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 12 | 'asymmetrical-left' | 'asymmetrical-right';
  gap?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  as?: React.ElementType;
}

export function Grid({
  children,
  className,
  columns = 1,
  gap = 'lg',
  as: Component = 'div',
}: GridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    12: 'grid-cols-1 lg:grid-cols-12',
    'asymmetrical-left': 'grid-cols-1 lg:grid-cols-[2fr_1fr]',
    'asymmetrical-right': 'grid-cols-1 lg:grid-cols-[1fr_2fr]',
  };

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-4',
    md: 'gap-8',
    lg: 'gap-12 lg:gap-16',
    xl: 'gap-16 lg:gap-24',
  };

  return (
    <Component
      className={cn(
        'grid',
        gridClasses[columns],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </Component>
  );
}
