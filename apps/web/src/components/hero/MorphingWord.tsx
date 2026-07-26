'use client';

import {AnimatePresence, LazyMotion, domAnimation, m} from 'framer-motion';
import {useReducedMotionSafe} from '@/hooks/useReducedMotionSafe';
import {useEffect, useMemo, useState} from 'react';

type MorphingWordProps = {
  words: string[];
  fallback?: string;
};

export default function MorphingWord({words, fallback}: MorphingWordProps) {
  const prefersReducedMotion = useReducedMotionSafe();
  const safeWords = useMemo(() => {
    if (words.length > 0) {
      return words;
    }

    return fallback ? [fallback] : ['credibility'];
  }, [fallback, words]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeWords.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % safeWords.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [safeWords]);

  return (
    <span className="relative inline-flex min-h-[1.1em] min-w-[10ch] overflow-hidden align-baseline text-accent">
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          <m.span
            key={safeWords[index]}
            initial={prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: 20, filter: 'blur(4px)'}}
            animate={prefersReducedMotion ? {opacity: 1} : {opacity: 1, y: 0, filter: 'blur(0px)'}}
            exit={prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: -16, filter: 'blur(4px)'}}
            transition={
              prefersReducedMotion
                ? {duration: 0}
                : {duration: 0.4, ease: [0.22, 1, 0.36, 1]}
            }
            className="block whitespace-nowrap font-serif italic"
            style={prefersReducedMotion ? undefined : {willChange: 'transform, opacity, filter'}}
          >
            {safeWords[index]}
          </m.span>
        </AnimatePresence>
      </LazyMotion>
    </span>
  );
}
