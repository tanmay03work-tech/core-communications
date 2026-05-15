'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { Container } from './Container';
import BrandLockup from './BrandLockup';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isHome = pathname === '/';

  const navLinkClass = (isActive: boolean) =>
    `group relative inline-flex items-center justify-center text-[0.84rem] tracking-[0.16em] uppercase font-extrabold no-underline transition-all duration-200 ${
      isActive ? 'text-white' : 'text-white/70 hover:text-white'
    }`;

  const isLinkActive = (href: string) => {
    if (href === '/work') {
      return pathname === '/work' || pathname.startsWith('/work/');
    }

    return isHome && href.startsWith('/#');
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] border-b border-white/6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        animate={{
          backgroundColor: scrolled ? 'rgba(39, 41, 76, 0.78)' : 'rgba(45, 47, 88, 0.98)',
          backdropFilter: scrolled ? 'blur(18px)' : 'blur(0px)',
          boxShadow: scrolled
            ? '0 14px 36px rgba(10, 14, 32, 0.28)'
            : '0 0 0 rgba(10, 14, 32, 0.00)',
        }}
      >
        <Container className="max-w-[1900px] px-0">
          <motion.div
            className="flex items-stretch justify-between gap-0"
            animate={{
              minHeight: scrolled ? 74 : 104,
            }}
          >
            <div className="flex min-w-0 flex-1 items-center bg-white/[0.02] pl-12 pr-10 lg:pl-20 lg:pr-14">
              <BrandLockup compact />
            </div>

            <div className="hidden lg:flex items-center border-l border-black/18 bg-white/[0.015] px-14 shadow-[-18px_0_30px_rgba(20,23,46,0.22)]">
              <ul className="flex items-center gap-14 list-none">
                {NAV_LINKS.map((link) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <li key={link.href}>
                      <motion.div
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.96, y: 0 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                      >
                        <Link
                          href={link.href}
                          className={navLinkClass(isActive)}
                        >
                          <span>{link.label}</span>
                          <span
                            className={`absolute -bottom-4 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-accent transition-all duration-300 ${
                              isActive ? 'w-9 opacity-100' : 'w-0 opacity-0 group-hover:w-9 group-hover:opacity-100'
                            }`}
                          />
                          {isActive && (
                            <motion.span
                              layoutId="nav-underline-glow"
                              className="absolute -bottom-4 left-1/2 h-[2px] w-9 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_18px_rgba(91,192,235,0.45)]"
                              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
                <li>
                  <motion.div
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                  >
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center border border-accent bg-transparent px-10 py-4 text-[0.82rem] tracking-[0.18em] uppercase font-extrabold text-accent no-underline transition-all duration-300 hover:bg-accent hover:text-navy hover:shadow-[0_12px_28px_rgba(91,192,235,0.18)] active:scale-[0.98]"
                    >
                      Get in Touch
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </div>

            <button
              className="lg:hidden relative z-[110] mr-5 flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white transition-all hover:border-accent/50 hover:text-accent active:scale-95"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </Container>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center bg-[rgba(34,36,68,0.94)] backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-sans text-3xl font-semibold text-white no-underline tracking-[0.08em] uppercase transition-colors hover:text-accent active:text-white/70"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: NAV_LINKS.length * 0.06, duration: 0.4 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 inline-flex items-center border border-accent bg-transparent px-6 py-3 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-accent no-underline transition-all hover:bg-accent hover:text-navy active:scale-[0.98]"
                >
                  <span>Get in Touch</span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
