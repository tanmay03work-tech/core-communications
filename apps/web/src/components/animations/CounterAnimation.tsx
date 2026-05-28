'use client';

import {LazyMotion, domAnimation, m, useInView, useReducedMotion} from 'framer-motion';
import {useEffect, useMemo, useRef, useState} from 'react';

type CounterAnimationProps = {
  target?: number;
  suffix?: string;
  duration?: number;
  value?: string | number;
};

const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

function parseValue(value: string | number | undefined) {
  if (typeof value === 'number') {
    return {target: value, suffix: ''};
  }

  if (typeof value !== 'string') {
    return {target: 0, suffix: ''};
  }

  const match = value.trim().match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return {target: Number.NaN, suffix: value};
  }

  return {
    target: Number.parseFloat(match[1]),
    suffix: match[2] ?? '',
  };
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) {
    return `${value}`;
  }

  return value.toFixed(1).replace(/\.0$/, '');
}

export default function CounterAnimation({
  target,
  suffix,
  duration = 1400,
  value,
}: CounterAnimationProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, {once: true, margin: '-80px'});
  const parsedValue = useMemo(() => parseValue(value), [value]);
  const resolvedTarget = target ?? parsedValue.target;
  const resolvedSuffix = suffix ?? parsedValue.suffix;
  const [displayValue, setDisplayValue] = useState(() =>
    Number.isFinite(resolvedTarget) ? 0 : value ?? '',
  );

  useEffect(() => {
    if (!isInView || !Number.isFinite(resolvedTarget)) {
      if (!Number.isFinite(resolvedTarget)) {
        setDisplayValue(value ?? `${resolvedSuffix}`);
      }
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);
      const nextValue = resolvedTarget * eased;
      const rounded =
        Number.isInteger(resolvedTarget) || resolvedTarget >= 10
          ? Math.round(nextValue)
          : Number.parseFloat(nextValue.toFixed(1));

      setDisplayValue(rounded);

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [duration, isInView, resolvedSuffix, resolvedTarget, value]);

  const renderedValue =
    typeof displayValue === 'number' ? formatNumber(displayValue) : displayValue;

  return (
    <LazyMotion features={domAnimation}>
      <m.span
        ref={ref}
        className="inline-flex items-baseline font-heading font-bold leading-none tracking-tight"
        animate={
          isInView && !prefersReducedMotion
            ? {scale: [1, 1.12, 1]}
            : {scale: 1}
        }
        transition={
          prefersReducedMotion
            ? {duration: 0}
            : {duration: 0.4, ease: [0.22, 1, 0.36, 1]}
        }
      >
        <span>{renderedValue}</span>
        {resolvedSuffix ? <span className="text-accent">{resolvedSuffix}</span> : null}
      </m.span>
    </LazyMotion>
  );
}
