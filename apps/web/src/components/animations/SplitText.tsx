'use client';

import {LazyMotion, domAnimation, m, useInView, useReducedMotion} from 'framer-motion';
import {Fragment, useMemo, useRef} from 'react';

type SplitTextProps = {
  children?: string;
  text?: string;
  stagger?: number;
  delay?: number;
  by?: 'char' | 'word';
  className?: string;
};

export default function SplitText({
  children,
  text,
  stagger = 40,
  delay = 0,
  by = 'char',
  className,
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const source = children ?? text ?? '';
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, {once: true, margin: '-40px'});
  const units = useMemo(() => {
    if (by === 'word') {
      return source.split(/(\s+)/).filter((part) => part.length > 0);
    }

    return Array.from(source);
  }, [by, source]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={source}
      style={{display: 'inline-block'}}
    >
      {units.map((unit, index) => {
        const isWhitespace = /^\s+$/.test(unit);

        if (isWhitespace) {
          return <Fragment key={`space-${index}`}>{unit}</Fragment>;
        }

        return (
          <span
            key={`${unit}-${index}`}
            aria-hidden="true"
            style={{display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', perspective: '1000px'}}
          >
            <LazyMotion features={domAnimation}>
              <m.span
                style={{display: 'inline-block', willChange: 'transform, opacity'}}
                initial={prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: '110%', rotateX: -20}}
                animate={
                  isInView
                    ? {opacity: 1, y: '0%', rotateX: 0}
                    : prefersReducedMotion
                      ? {opacity: 0}
                      : {opacity: 0, y: '110%', rotateX: -20}
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.65,
                  delay: delay / 1000 + (index * stagger) / 1000,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {unit}
              </m.span>
            </LazyMotion>
          </span>
        );
      })}
    </span>
  );
}
