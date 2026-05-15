'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 28 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <motion.div
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[220] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: isPressed ? 10 : isHovering ? 22 : 12,
          height: isPressed ? 10 : isHovering ? 22 : 12,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isPressed ? '#1C2E4A' : '#31728e',
          boxShadow: isPressed
            ? '0 0 0 10px rgba(91, 192, 235, 0.16)'
            : '0 0 0 0 rgba(91, 192, 235, 0)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
      {/* Ring */}
      <motion.div
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[219] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] opacity-50"
        style={{
          x: ringX,
          y: ringY,
          borderColor: '#5BC0EB',
        }}
        animate={{
          width: isPressed ? 30 : isHovering ? 54 : 38,
          height: isPressed ? 30 : isHovering ? 54 : 38,
          opacity: isVisible ? (isPressed ? 0.9 : 0.55) : 0,
          scale: isPressed ? 0.9 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  );
}
