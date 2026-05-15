'use client';

import { TICKER_CLIENTS } from '@/lib/constants';

export default function ClientsTicker() {
  const items = TICKER_CLIENTS.join(' ✦ ') + ' ✦ ';
  const doubled = items + items;

  return (
    <div className="bg-deep py-3.5 overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-marquee font-mono text-base tracking-[0.2em] text-white/60">
        {doubled}
      </div>
    </div>
  );
}
