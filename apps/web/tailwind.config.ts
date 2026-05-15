import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1C2E4A',
          900: '#1C2E4A',
          800: '#1C2E4A',
          700: '#1C2E4A',
        },
        accent: {
          DEFAULT: '#5BC0EB',
          light: '#5BC0EB',
          glow: '#5BC0EB',
        },
        ink: '#1C2E4A',
        deep: '#1C2E4A',
        steel: '#1C2E4A',
        surface: {
          light: '#F5F7FA',
        },
        mist: 'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        display: ['var(--font-sans)', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['var(--font-sans)', 'Helvetica', 'Arial', 'sans-serif'],
        title: ['var(--font-sans)', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['var(--font-sans)', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(3.75rem, 6.5vw, 6.5rem)', { lineHeight: '1.02', fontWeight: '400', letterSpacing: '-0.025em' }],
        section: ['clamp(2.25rem, 3.5vw, 3.75rem)', { lineHeight: '1.08', fontWeight: '400', letterSpacing: '-0.015em' }],
        'card-title': ['clamp(1.2rem, 1.8vw, 1.5rem)', { lineHeight: '1.2', fontWeight: '400', letterSpacing: '-0.01em' }],
        'body-lg': ['clamp(1rem, 1.2vw, 1.125rem)', { lineHeight: '1.75', fontWeight: '300' }],
        'case-study-metric': ['clamp(3rem, 5vw, 5rem)', { lineHeight: '0.95', fontWeight: '400', letterSpacing: '-0.03em' }],
        tag: ['0.72rem', { letterSpacing: '0.22em', fontWeight: '700' }],
      },
      spacing: {
        section: 'clamp(4rem, 6vw, 6rem)',
        'section-lg': 'clamp(5rem, 8vw, 8rem)',
        'container-padding': 'clamp(1.25rem, 4vw, 3.5rem)',
      },
      letterSpacing: {
        tag: '0.25em',
        wide: '0.12em',
        wider: '0.2em',
      },
      animation: {
        'grid-shift': 'gridShift 20s linear infinite',
        'orb-pulse': 'orbPulse 6s ease-in-out infinite',
        marquee: 'marqueeScroll 30s linear infinite',
        'marquee-slow': 'marqueeScroll 50s linear infinite',
        'marquee-reverse': 'marqueeScrollReverse 35s linear infinite',
      },
      keyframes: {
        gridShift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(60px)' },
        },
        orbPulse: {
          '0%, 100%': { transform: 'translateY(-50%) scale(1)', opacity: '0.7' },
          '50%': { transform: 'translateY(-50%) scale(1.1)', opacity: '1' },
        },
        marqueeScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeScrollReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(91,192,235,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(91,192,235,0.02) 1px, transparent 1px)`,
        'grid-pattern-light': `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        'grid-pattern-v': `linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        grid: '60px 60px',
        'grid-sm': '50px 50px',
        'grid-v': '20vw 100%',
      },
    },
  },
  plugins: [],
};

export default config;
