'use client';

import {useMemo} from 'react';

type DotConfig = {
  top: string;
  left: string;
  delay: string;
  duration: string;
};

function createDot(): DotConfig {
  return {
    top: `${18 + Math.random() * 64}%`,
    left: `${12 + Math.random() * 70}%`,
    delay: `${Math.random() * 2.2}s`,
    duration: `${1.8 + Math.random() * 1.8}s`,
  };
}

export default function RadarAnimation() {
  const dots = useMemo(() => [createDot(), createDot(), createDot()], []);

  return (
    <div
      className="pointer-events-none absolute right-[-6vw] top-1/2 hidden h-[42vw] w-[42vw] max-h-[44rem] max-w-[44rem] -translate-y-1/2 opacity-[0.15] lg:block"
      aria-hidden="true"
    >
      <div className="radar-shell">
        <div className="radar-sweep" />
        {Array.from({length: 5}, (_, index) => (
          <div key={index} className="radar-ring" style={{inset: `${index * 10}%`}} />
        ))}
        {dots.map((dot, index) => (
          <span
            key={index}
            className="radar-dot"
            style={
              {
                '--dot-top': dot.top,
                '--dot-left': dot.left,
                '--dot-delay': dot.delay,
                '--dot-duration': dot.duration,
              } as React.CSSProperties
            }
          />
        ))}
        <div className="radar-center" />
      </div>
      <style jsx>{`
        .radar-shell {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          background:
            radial-gradient(circle at center, rgba(91, 192, 235, 0.1) 0%, transparent 46%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent);
        }

        .radar-sweep {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: conic-gradient(
            from 0deg,
            rgba(91, 192, 235, 0) 0deg,
            rgba(91, 192, 235, 0.02) 250deg,
            rgba(91, 192, 235, 0.58) 315deg,
            rgba(61, 175, 217, 0.2) 338deg,
            rgba(91, 192, 235, 0) 360deg
          );
          animation: radarRotate 8s linear infinite;
        }

        .radar-ring {
          position: absolute;
          border-radius: inherit;
          border: 1px solid rgba(176, 224, 255, 0.28);
          box-shadow: inset 0 0 30px rgba(91, 192, 235, 0.03);
        }

        .radar-dot {
          position: absolute;
          top: var(--dot-top);
          left: var(--dot-left);
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: rgba(61, 175, 217, 0.9);
          box-shadow: 0 0 0 0 rgba(61, 175, 217, 0.45);
          animation: radarBlink var(--dot-duration) ease-in-out infinite;
          animation-delay: var(--dot-delay);
        }

        .radar-center {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: rgba(91, 192, 235, 0.9);
          transform: translate(-50%, -50%);
          box-shadow:
            0 0 18px rgba(91, 192, 235, 0.8),
            0 0 36px rgba(61, 175, 217, 0.35);
          animation: centerPulse 2.8s ease-in-out infinite;
        }

        @keyframes radarRotate {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes radarBlink {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(0.8);
            box-shadow: 0 0 0 0 rgba(61, 175, 217, 0);
          }

          45% {
            opacity: 1;
            transform: scale(1.2);
            box-shadow: 0 0 0 14px rgba(61, 175, 217, 0);
          }
        }

        @keyframes centerPulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.9;
          }

          50% {
            transform: translate(-50%, -50%) scale(1.16);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
