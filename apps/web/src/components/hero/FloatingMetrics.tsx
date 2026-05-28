'use client';

import {m} from 'framer-motion';

type Metric = {
  _key?: string;
  value: string;
  label: string;
};

type FloatingMetricsProps = {
  metrics: Metric[];
};

export default function FloatingMetrics({metrics}: FloatingMetricsProps) {
  if (metrics.length === 0) {
    return null;
  }

  return (
    <div className="relative z-20 hidden w-full max-w-[22rem] flex-col gap-4 lg:flex">
      {metrics.map((metric, index) => (
        <m.div
          key={metric._key ?? `${metric.label}-${metric.value}`}
          initial={{opacity: 0, x: 20, y: 18}}
          animate={{opacity: 1, x: 0, y: 0}}
          transition={{duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1]}}
          whileHover={{x: -6, borderColor: 'rgba(91, 192, 235, 0.4)'}}
          className="metric-pill flex min-h-[5.2rem] w-full items-center gap-4 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-xl"
        >
          <span className="metric-dot" />
          <span className="font-heading text-lg font-bold tracking-tight text-white">{metric.value}</span>
          <span className="text-sm uppercase leading-snug tracking-[0.18em] text-white/55">{metric.label}</span>
        </m.div>
      ))}
      <style jsx>{`
        .metric-pill {
          box-shadow: 0 18px 48px rgba(12, 20, 40, 0.18);
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .metric-pill:hover {
          box-shadow:
            0 18px 48px rgba(12, 20, 40, 0.18),
            0 0 24px rgba(91, 192, 235, 0.14);
        }

        .metric-dot {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(91, 192, 235, 1), rgba(61, 175, 217, 1));
          animation: metricPulse 1.9s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes metricPulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(91, 192, 235, 0.32);
          }

          50% {
            transform: scale(1.18);
            box-shadow: 0 0 0 10px rgba(91, 192, 235, 0);
          }
        }
      `}</style>
    </div>
  );
}
