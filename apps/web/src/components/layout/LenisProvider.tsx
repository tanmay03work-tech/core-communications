'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { ReactLenis } from 'lenis/react';

export default function LenisProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotionSafe();
  const [lowPowerMode, setLowPowerMode] = useState(false);

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const constrainedCpu =
      typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

    setLowPowerMode(Boolean(prefersReducedMotion || (coarsePointer && constrainedCpu)));
  }, [prefersReducedMotion]);

  if (lowPowerMode) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.14,
        duration: 0.7,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
