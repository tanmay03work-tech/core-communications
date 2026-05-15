'use client';

import { ReactNode } from 'react';
import { ReactLenis } from 'lenis/react';

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08, // Slightly heavier, more premium feel
        duration: 1.2, // Slower, intentional scroll
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
