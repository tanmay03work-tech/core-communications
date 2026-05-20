'use client';

import { useEffect, useState } from 'react';

export function usePageTransition() {
  const [pathname, setPathname] = useState('initial');

  useEffect(() => {
    const syncPathname = () => {
      setPathname(window.location.pathname + window.location.search + window.location.hash);
    };

    syncPathname();

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      syncPathname();
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      syncPathname();
    };

    window.addEventListener('popstate', syncPathname);

    return () => {
      window.removeEventListener('popstate', syncPathname);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  return {
    pathname,
  };
}
