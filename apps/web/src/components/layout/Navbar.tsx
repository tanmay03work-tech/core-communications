'use client';

import {useEffect, useMemo, useState, type MouseEvent as ReactMouseEvent} from 'react';
import {m, useMotionValueEvent, useReducedMotion, useScroll, useSpring} from 'framer-motion';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {NAV_LINKS} from '@/lib/constants';
import {useActiveSection} from '@/hooks/useActiveSection';
import {useMagnetic} from '@/hooks/useMagnetic';
import {navbarItemVariants, navbarSpring} from '@/lib/motion-variants';
import {cn} from '@/lib/utils';
import {Container} from './Container';
import MobileMenu from './MobileMenu';
import AnimatedLogoMark from './AnimatedLogoMark';

type NavLinkItem = (typeof NAV_LINKS)[number] & {
  active: boolean;
};

type Ripple = {
  id: number;
  x: number;
  y: number;
};

function NavbarLogo({compact, scrolled}: {compact: boolean; scrolled: boolean}) {
  return (
    <Link href="/" aria-label="Core Communications Home" className="inline-flex items-center gap-3 no-underline">
      <m.span
        className="flex shrink-0 items-center justify-center"
        animate={{scale: compact ? 0.92 : 1}}
        transition={navbarSpring}
      >
        <AnimatedLogoMark size={compact ? 38 : 42} />
      </m.span>
      <div className="flex min-w-0 flex-col">
        <span className={cn('text-[0.94rem] font-bold uppercase leading-none tracking-[0.34em]', scrolled ? 'text-white' : 'text-[var(--navy)]')}>CORE</span>
        <span className={cn('mt-1 text-[0.62rem] font-bold uppercase leading-none tracking-[0.28em]', scrolled ? 'text-white/86' : 'text-[rgba(13,27,42,0.82)]')}>COMMUNICATIONS</span>
      </div>
    </Link>
  );
}

function isRouteActive(pathname: string, href: string) {
  if (href === '/work') {
    return pathname === '/work' || pathname.startsWith('/work/');
  }

  if (href === '/') {
    return pathname === '/';
  }

  return href === pathname;
}

export default function Navbar() {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname() ?? '/';
  const {activeHref} = useActiveSection(NAV_LINKS);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const magnetic = useMagnetic<HTMLDivElement>(10);
  const {scrollY, scrollYProgress} = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setCompact(latest > 28);
    setScrolled(latest > 60);
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const connection = (navigator as Navigator & {connection?: {saveData?: boolean}}).connection;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const constrainedCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

    setLowPowerMode(Boolean(reducedMotion || connection?.saveData || (coarsePointer && constrainedCpu)));
  }, [reducedMotion]);

  const navLinks = useMemo<NavLinkItem[]>(
    () =>
      NAV_LINKS.map((link) => {
        const isHashLink = link.href.includes('#');
        return {
          ...link,
          active: isHashLink ? activeHref === link.href : isRouteActive(pathname, link.href),
        };
      }),
    [activeHref, pathname],
  );

  const handleCtaClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion || lowPowerMode) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const ripple = {
      id: Date.now(),
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };

    setRipples((current) => [...current, ripple]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((item) => item.id !== ripple.id));
    }, 650);
  };

  const handleNavClick = (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('/#')) {
      return;
    }

    const id = href.slice(2);

    if (pathname === '/') {
      event.preventDefault();
      const element = document.getElementById(id);

      if (element) {
        window.history.pushState(null, '', href);
        element.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }
  };

  return (
    <>
      <m.div
        className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-[linear-gradient(90deg,rgba(13,27,42,0.92),rgba(201,149,42,0.78),rgba(0,184,150,0.96))]"
        style={{scaleX: progressScale}}
      />

      <m.header
        className="fixed inset-x-0 top-0 z-[110]"
        animate={reducedMotion ? undefined : {y: compact ? -2 : 0}}
        transition={navbarSpring}
      >
        <Container className="max-w-[1440px] !px-4 pt-4 sm:!px-6 md:pt-5 lg:!px-8">
          <m.nav
            aria-label="Primary"
            className={cn('site-nav glass-nav relative overflow-hidden rounded-full', scrolled && 'scrolled')}
            animate={reducedMotion ? undefined : {scale: compact ? 0.985 : 1}}
            transition={navbarSpring}
          >
            <m.div
              className="pointer-events-none absolute inset-0 rounded-full"
              animate={{opacity: compact ? 1 : 0.66}}
              transition={{duration: 0.28, ease: 'easeOut'}}
            >
              <div className="absolute inset-[1px] rounded-full backdrop-blur-[10px]" />
              <m.div
                className={cn(
                  'absolute inset-[1px] rounded-full bg-white/[0.34]',
                  lowPowerMode ? '' : 'backdrop-blur-[24px]',
                )}
                animate={{opacity: compact ? 1 : 0.5}}
                transition={{duration: 0.28, ease: 'easeOut'}}
              />
            </m.div>

            <div className="glass-nav__border pointer-events-none absolute inset-0 rounded-full" />
            <div className="glass-nav__glow pointer-events-none absolute inset-x-10 -top-px h-px" />
            <div className="nav-noise pointer-events-none absolute inset-0 rounded-full opacity-[0.18]" />
            <div className="pointer-events-none absolute inset-x-12 top-0 h-10 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_72%)] opacity-45" />

            <div
              className={cn(
                'relative flex items-center justify-between gap-3 px-3 sm:gap-4 sm:px-4 md:px-5 lg:px-6',
                compact ? 'py-2.5' : 'py-3',
              )}
            >
              <NavbarLogo compact={compact} scrolled={scrolled} />

                <div className="hidden items-center gap-1.5 lg:flex">
                  {navLinks.map((link) => (
                    <m.div
                      key={link.href}
                      className="relative"
                      initial="rest"
                      animate="rest"
                      whileHover={reducedMotion ? undefined : 'hover'}
                      variants={navbarItemVariants}
                    >
                      <Link
                        href={link.href}
                        onClick={(event) => handleNavClick(event, link.href)}
                        aria-current={link.active ? 'page' : undefined}
                        className={cn(
                          'group relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2.5 text-[0.78rem] font-bold uppercase tracking-[0.2em] no-underline transition-colors duration-200',
                          link.active
                            ? scrolled
                              ? 'text-white'
                              : 'text-[var(--navy)]'
                            : scrolled
                              ? 'text-white/84 hover:text-white'
                              : 'text-[rgba(13,27,42,0.84)] hover:text-[var(--navy)]',
                        )}
                      >
                        <span className="relative z-[1]">{link.label}</span>
                        <m.span
                          className="absolute inset-x-4 bottom-[7px] h-px origin-left rounded-full bg-[linear-gradient(90deg,rgba(201,149,42,0.78),rgba(0,184,150,0.92))]"
                          variants={{
                            rest: {
                              scaleX: 0,
                              opacity: 0.72,
                            },
                            hover: {
                              scaleX: 1,
                              opacity: 1,
                            },
                          }}
                          transition={{duration: 0.24, ease: [0.16, 1, 0.3, 1]}}
                        />
                      </Link>
                    </m.div>
                  ))}

                  <m.div
                    ref={magnetic.ref}
                    className="ml-2"
                    style={lowPowerMode ? undefined : magnetic.style}
                    onMouseMove={lowPowerMode ? undefined : magnetic.onMouseMove}
                    onMouseLeave={lowPowerMode ? undefined : magnetic.onMouseLeave}
                  >
                    <Link
                      href="/contact"
                      onClick={handleCtaClick}
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[rgba(0,184,150,0.22)] bg-[linear-gradient(180deg,rgba(13,27,42,0.96),rgba(30,47,68,0.96))] px-5 py-2.5 text-[0.74rem] font-bold uppercase tracking-[0.2em] text-white no-underline shadow-[0_10px_30px_rgba(12,26,48,0.18)]"
                    >
                      <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(0,184,150,0.22),transparent_60%)] opacity-80" />
                      <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-[linear-gradient(90deg,rgba(0,184,150,0),rgba(0,184,150,0.95),rgba(0,184,150,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      {ripples.map((ripple) => (
                        <m.span
                          key={ripple.id}
                          className="pointer-events-none absolute rounded-full bg-white/25"
                          initial={{opacity: 0.5, scale: 0, x: ripple.x - 6, y: ripple.y - 6, width: 12, height: 12}}
                          animate={{opacity: 0, scale: 12}}
                          transition={{duration: 0.6, ease: 'easeOut'}}
                        />
                      ))}
                      <span className="relative z-[1]">Start a Conversation</span>
                      <m.span
                        className="relative z-[1] inline-flex"
                        animate={reducedMotion ? undefined : {x: compact ? 2 : 0}}
                        whileHover={reducedMotion ? undefined : {x: 4}}
                        transition={navbarSpring}
                      >
                        →
                      </m.span>
                    </Link>
                  </m.div>
                </div>

              <button
                type="button"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMobileOpen((open) => !open)}
                className={cn(
                  'relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full transition-colors duration-200 lg:hidden',
                  scrolled
                    ? 'border border-[rgba(0,184,150,0.24)] bg-white/8 text-white shadow-[0_8px_24px_rgba(4,10,20,0.22)] hover:border-[rgba(0,184,150,0.45)]'
                    : 'border border-[rgba(13,27,42,0.08)] bg-white/55 text-[var(--navy)] shadow-[0_8px_24px_rgba(13,27,42,0.08)] hover:border-[rgba(0,184,150,0.32)]',
                )}
              >
                <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
                <m.span
                  className="absolute h-[1.5px] w-[18px] rounded-full bg-current"
                  animate={{rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 0 : -5}}
                  transition={navbarSpring}
                />
                <m.span
                  className="absolute h-[1.5px] w-[18px] rounded-full bg-current"
                  animate={{opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0.4 : 1}}
                  transition={{duration: 0.18, ease: 'easeOut'}}
                />
                <m.span
                  className="absolute h-[1.5px] w-[18px] rounded-full bg-current"
                  animate={{rotate: mobileOpen ? -45 : 0, y: mobileOpen ? 0 : 5}}
                  transition={navbarSpring}
                />
              </button>
            </div>
          </m.nav>
        </Container>
      </m.header>

      <MobileMenu
        open={mobileOpen}
        links={navLinks}
        onClose={() => setMobileOpen(false)}
        onLinkClick={handleNavClick}
        reducedMotion={Boolean(reducedMotion)}
        lowPowerMode={lowPowerMode}
      />
    </>
  );
}
