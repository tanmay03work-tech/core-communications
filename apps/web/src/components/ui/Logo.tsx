import React from 'react';
import { cn } from '@/lib/utils';

export function Logo({ className, theme = 'dark' }: { className?: string; theme?: 'light' | 'dark' }) {
  const isLight = theme === 'light';

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Icon System */}
      <svg
        width="150"
        height="150"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Deep blue outer ring/core shape */}
        <circle cx="16" cy="16" r="14" stroke="var(--deep)" strokeWidth="4" />
        {/* Accent sweeping arc */}
        <path
          d="M16 2A14 14 0 0 1 30 16"
          stroke={isLight ? "var(--navy)" : "var(--accent)"}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Glow core */}
        <circle cx="16" cy="16" r="4" fill={isLight ? "var(--deep)" : "var(--accent-glow)"} />
      </svg>

      {/* Typography Lockup */}
      <div className="flex flex-col justify-center translate-y-[1px]">
        <span className={cn(
          "font-title text-[1.1rem] font-bold tracking-[0.1em] leading-none mb-[2px]",
          isLight ? "text-navy" : "text-white"
        )}>
          CORE
        </span>
        <span className={cn(
          "font-sans text-[0.55rem] font-medium tracking-[0.3em] uppercase leading-none",
          isLight ? "text-navy/70" : "text-white/50"
        )}>
          Communications
        </span>
      </div>
    </div>
  );
}
