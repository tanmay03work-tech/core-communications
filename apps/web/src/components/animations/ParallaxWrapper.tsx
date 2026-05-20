'use client';

import {motion, useScroll, useTransform} from 'framer-motion';
import type {PropsWithChildren} from 'react';
import {useRef} from 'react';

type ParallaxWrapperProps = PropsWithChildren<{
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
}>;

export default function ParallaxWrapper({
  children,
  speed = 0.1,
  direction = 'up',
  className,
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const distance = 200 * speed;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [distance, -distance] : [-distance, distance],
  );

  return (
    <motion.div ref={ref} className={className} style={{y}}>
      {children}
    </motion.div>
  );
}
