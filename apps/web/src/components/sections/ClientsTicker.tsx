import {TICKER_CLIENTS} from '@/lib/constants';
import {getSiteSettings} from '@/lib/sanity/content';
import {ClientWordmark} from '@/components/sections/ClientWordmarks';

type ClientsTickerProps = {
  clients?: string[] | null;
};

function renderTickerItems(clients: string[]) {
  const items = [...clients, ...clients];

  return items.map((client, index) => (
    <span key={`${client}-${index}`} className="inline-flex px-3 py-1.5 align-middle">
      <span className="inline-flex h-16 min-w-[10rem] items-center justify-center rounded-[1.25rem] border border-navy/10 bg-white px-6 shadow-[0_12px_28px_rgba(28,46,74,0.05)]">
        <ClientWordmark client={client} className="h-7 w-auto max-w-[8.75rem]" />
      </span>
    </span>
  ));
}

export default async function ClientsTicker({clients}: ClientsTickerProps) {
  const siteSettings = clients ? null : await getSiteSettings();
  const resolvedClients =
    clients?.length ? clients : siteSettings?.clients?.length ? siteSettings.clients : [...TICKER_CLIENTS];

  return (
    <section className="relative overflow-hidden border-y border-navy/8 bg-white py-4">
      <div className="group whitespace-nowrap">
        <div className="animate-[clients-ticker_26s_linear_infinite] group-hover:[animation-play-state:paused]">
          {renderTickerItems(resolvedClients)}
        </div>
      </div>
    </section>
  );
}
