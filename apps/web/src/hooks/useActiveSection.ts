'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCurrentLocation } from './useCurrentLocation';

type NavLink = {
  href: string;
};

function getSectionId(href: string) {
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) return null;

  return href.slice(hashIndex + 1) || null;
}

export function useActiveSection(links: readonly NavLink[]) {
  const { pathname, hash } = useCurrentLocation();
  const sectionIds = useMemo(
    () => links.map((link) => getSectionId(link.href)).filter((value): value is string => Boolean(value)),
    [links],
  );
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(null);
      return;
    }

    const updateFromHash = () => {
      const currentHash = hash.replace('#', '');
      if (currentHash && sectionIds.includes(currentHash)) {
        setActiveSection(currentHash);
      }
    };

    updateFromHash();

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) return;

    const visibleSections = new Map<string, { ratio: number; top: number }>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            visibleSections.set(id, {
              ratio: entry.intersectionRatio,
              top: entry.boundingClientRect.top,
            });
          } else {
            visibleSections.delete(id);
          }
        });

        const nextActive = [...visibleSections.entries()]
          .sort((a, b) => {
            if (Math.abs(a[1].top - b[1].top) < 48) {
              return b[1].ratio - a[1].ratio;
            }

            return a[1].top - b[1].top;
          })
          .at(0)?.[0];

        if (nextActive) {
          setActiveSection(nextActive);
        }
      },
      {
        rootMargin: '-18% 0px -56% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener('hashchange', updateFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', updateFromHash);
    };
  }, [hash, pathname, sectionIds]);

  const activeHref = activeSection ? `/#${activeSection}` : null;

  return {
    activeSection,
    activeHref,
  };
}
