import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ children, className, as: Component = 'div' }: ContainerProps) {
  return (
    <Component className={cn('max-w-[1440px] mx-auto px-container-padding w-full', className)}>
      {children}
    </Component>
  );
}
