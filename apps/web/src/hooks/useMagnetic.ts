'use client';

import { useRef, type MouseEvent as ReactMouseEvent, type RefObject } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

type MagneticHandlers<T extends HTMLElement> = {
  ref: RefObject<T>;
  style: {
    x: ReturnType<typeof useSpring>;
    y: ReturnType<typeof useSpring>;
  };
  onMouseMove: (event: ReactMouseEvent<T>) => void;
  onMouseLeave: () => void;
};

export function useMagnetic<T extends HTMLElement>(strength = 18): MagneticHandlers<T> {
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 280,
    damping: 22,
    mass: 0.45,
  });
  const springY = useSpring(y, {
    stiffness: 280,
    damping: 22,
    mass: 0.45,
  });

  const onMouseMove = (event: ReactMouseEvent<T>) => {
    const node = ref.current;
    if (!node) return;

    const bounds = node.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

    x.set(offsetX * strength * 2);
    y.set(offsetY * strength * 2);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    style: { x: springX, y: springY },
    onMouseMove,
    onMouseLeave,
  };
}
