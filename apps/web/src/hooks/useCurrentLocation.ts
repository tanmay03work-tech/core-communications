'use client';

import { useEffect, useState } from 'react';

type CurrentLocation = {
  pathname: string;
  hash: string;
};

const INITIAL_LOCATION: CurrentLocation = {
  pathname: '',
  hash: '',
};

function readLocation(): CurrentLocation {
  return {
    pathname: window.location.pathname,
    hash: window.location.hash,
  };
}

export function useCurrentLocation() {
  const [locationState, setLocationState] = useState<CurrentLocation>(INITIAL_LOCATION);

  useEffect(() => {
    const updateLocation = () => {
      setLocationState(readLocation());
    };

    updateLocation();

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function pushState(...args) {
      originalPushState.apply(this, args);
      window.dispatchEvent(new Event('codex:locationchange'));
    };

    window.history.replaceState = function replaceState(...args) {
      originalReplaceState.apply(this, args);
      window.dispatchEvent(new Event('codex:locationchange'));
    };

    window.addEventListener('popstate', updateLocation);
    window.addEventListener('hashchange', updateLocation);
    window.addEventListener('codex:locationchange', updateLocation);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', updateLocation);
      window.removeEventListener('hashchange', updateLocation);
      window.removeEventListener('codex:locationchange', updateLocation);
    };
  }, []);

  return locationState;
}
