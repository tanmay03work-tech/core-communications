'use client';

import { useEffect, useState } from 'react';

export function useScrollTrigger(threshold = 32) {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const updateTrigger = () => {
      setTriggered(window.scrollY > threshold);
    };

    updateTrigger();
    window.addEventListener('scroll', updateTrigger, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateTrigger);
    };
  }, [threshold]);

  return triggered;
}
