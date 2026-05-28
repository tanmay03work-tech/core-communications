'use client';

import {useEffect, type MouseEvent as ReactMouseEvent} from 'react';
import {AnimatePresence, LazyMotion, domAnimation, m} from 'framer-motion';
import Link from 'next/link';
import {mobileMenuItemVariants, mobileMenuVariants, navbarSpring} from '@/lib/motion-variants';
import {cn} from '@/lib/utils';

type NavItem = {
  href: string;
  label: string;
  active: boolean;
};

type MobileMenuProps = {
  open: boolean;
  links: NavItem[];
  onClose: () => void;
  onLinkClick: (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => void;
  reducedMotion: boolean;
  lowPowerMode: boolean;
};

export default function MobileMenu({
  open,
  links,
  onClose,
  onLinkClick,
  reducedMotion,
  lowPowerMode,
}: MobileMenuProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, open]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-navigation"
            className="fixed inset-0 z-[105] lg:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={reducedMotion ? {duration: 0.01} : undefined}
          >
            <m.div
              className={cn('absolute inset-0 bg-[rgba(7,18,34,0.72)]', lowPowerMode ? '' : 'backdrop-blur-xl')}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={reducedMotion ? {duration: 0.01} : {duration: 0.24, ease: 'easeOut'}}
              onClick={onClose}
              aria-hidden="true"
            />

            <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[linear-gradient(180deg,rgba(30,47,68,0.96),rgba(13,27,42,0.985))] px-6 pb-10 pt-28 text-white">
              {!lowPowerMode ? <div className="noise-overlay pointer-events-none absolute inset-0" aria-hidden="true" /> : null}
              <div className="pointer-events-none absolute inset-x-6 top-6 h-px rounded-full bg-[linear-gradient(90deg,rgba(0,184,150,0),rgba(0,184,150,0.75),rgba(201,149,42,0))] opacity-90" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(0,184,150,0.18),transparent_70%)]" />

              <m.nav
                aria-label="Mobile"
                className="relative flex flex-1 flex-col justify-center"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileMenuVariants}
              >
                <div className="flex flex-col gap-4">
                  {links.map((link, idx) => (
                    <m.div key={link.href} variants={mobileMenuItemVariants}>
                      <Link
                        href={link.href}
                        onClick={(event) => {
                          onLinkClick(event, link.href);
                          onClose();
                        }}
                        className={cn(
                          'group relative flex w-fit items-center gap-5 no-underline',
                          link.active ? 'text-white' : 'text-white/62',
                        )}
                      >
                        <span className="text-[0.62rem] font-bold uppercase tracking-[0.26em] text-accent/60 tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className={cn('text-[clamp(1.85rem,8vw,3.25rem)] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 group-hover:text-white')}>
                          {link.label}
                        </span>
                        <m.span
                          className="h-px origin-left rounded-full bg-[rgba(0,184,150,0.88)]"
                          style={{ width: '2rem' }}
                          animate={{ scaleX: link.active ? 1 : 0.35, opacity: link.active ? 1 : 0.4 }}
                          whileHover={reducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
                          transition={navbarSpring}
                        />
                      </Link>
                    </m.div>
                  ))}
                </div>
              </m.nav>

              <m.div
                variants={mobileMenuItemVariants}
                className="flex items-center justify-between border-t border-white/10 pt-6"
              >
                <p className="max-w-[13rem] text-[0.72rem] uppercase tracking-[0.22em] text-white/45">
                  Strategic communications for complex technology brands.
                </p>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,184,150,0.45)] bg-[rgba(0,184,150,0.12)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-white no-underline"
                >
                  Start
                  <m.span
                    animate={reducedMotion ? undefined : {x: [0, 2, 0]}}
                    transition={{duration: 1.1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.2}}
                  >
                    →
                  </m.span>
                </Link>
              </m.div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}
