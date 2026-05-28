'use client';

import { m, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      className="fixed top-0 left-0 right-0 z-[101] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #0D1B2A, #C9952A, #00B896)',
      }}
    />
  );
}
