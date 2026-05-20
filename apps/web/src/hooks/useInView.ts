'use client';

import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

