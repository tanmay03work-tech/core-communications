'use client';

import {m, useMotionValue, useSpring, type MotionProps} from 'framer-motion';
import type {MouseEvent, PropsWithChildren} from 'react';
import {useRef} from 'react';

type TiltCardProps = PropsWithChildren<{
  className?: string;
  innerClassName?: string;
  disabled?: boolean;
  motionProps?: MotionProps;
}>;

export default function TiltCard({
  children,
  className,
  innerClassName,
  disabled = false,
  motionProps,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, {stiffness: 180, damping: 18, mass: 0.8});
  const springRotateY = useSpring(rotateY, {stiffness: 180, damping: 18, mass: 0.8});

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;

    const bounds = node.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;
    const maxRotation = 8;

    rotateY.set((relativeX - 0.5) * maxRotation * 2);
    rotateX.set((0.5 - relativeY) * maxRotation * 2);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <m.div
      {...motionProps}
      ref={ref}
      className={className}
      style={{
        perspective: 1000,
        rotateX: disabled ? 0 : springRotateX,
        rotateY: disabled ? 0 : springRotateY,
        transformStyle: 'preserve-3d',
        ...motionProps?.style,
      }}
      onMouseMove={disabled ? undefined : handleMouseMove}
      onMouseLeave={disabled ? undefined : handleMouseLeave}
    >
      <m.div className={innerClassName} style={{transform: 'translateZ(20px)', transformStyle: 'preserve-3d'}}>
        {children}
      </m.div>
    </m.div>
  );
}
