'use client';

import {motion, useMotionValue, useSpring} from 'framer-motion';
import type {MouseEvent, PropsWithChildren} from 'react';
import {useRef} from 'react';

type MagneticButtonProps = PropsWithChildren<{
  className?: string;
}>;

export default function MagneticButton({children, className}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, {stiffness: 240, damping: 20, mass: 0.6});
  const springY = useSpring(y, {stiffness: 240, damping: 20, mass: 0.6});

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;

    const bounds = node.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const offsetX = (event.clientX - centerX) * 0.35;
    const offsetY = (event.clientY - centerY) * 0.35;

    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className ?? 'inline-block'}
      style={{x: springX, y: springY}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
