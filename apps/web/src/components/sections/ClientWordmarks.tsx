import Image from 'next/image';
import {cn} from '@/lib/utils';

type ClientWordmarkProps = {
  client: string;
  className?: string;
};

type ClientLogoSpec = {
  src: string;
  width: number;
  height: number;
};

const CLIENT_LOGOS: Record<string, ClientLogoSpec> = {
  Verizon: {src: '/images/client-logos/verizon.png', width: 1272, height: 248},
  GBG: {src: '/images/client-logos/gbg.jpg', width: 400, height: 400},
  Onestream: {src: '/images/client-logos/onestream.png', width: 588, height: 86},
  AtomEthics: {src: '/images/client-logos/atomethics.png', width: 248, height: 111},
  Nutanix: {src: '/images/client-logos/nutanix.png', width: 600, height: 120},
  'SunPower Renewables': {src: '/images/client-logos/sunpower-renewables.jpg', width: 299, height: 81},
  Zoom: {src: '/images/client-logos/zoom.jpeg', width: 369, height: 136},
  Veolia: {src: '/images/client-logos/veolia.png', width: 1272, height: 248},
  AirTrunk: {src: '/images/client-logos/airtrunk.png', width: 503, height: 100},
  Healthdirect: {src: '/images/client-logos/healthdirect.png', width: 310, height: 160},
  Banjo: {src: '/images/client-logos/banjo.png', width: 317, height: 157},
  Vodafone: {src: '/images/client-logos/vodafone.png', width: 320, height: 160},
  'Asset Vision': {src: '/images/client-logos/asset-vision.png', width: 320, height: 160},
  Cisco: {src: '/images/client-logos/cisco.png', width: 309, height: 163},
  Adyen: {src: '/images/client-logos/adyen.png', width: 2048, height: 660},
  Matific: {src: '/images/client-logos/matific.png', width: 280, height: 196},
  'Parallel Wireless': {src: '/images/client-logos/parallel-wireless.png', width: 406, height: 92},
  Huawei: {src: '/images/client-logos/huawei.png', width: 1565, height: 1599},
};

const FALLBACK_WORDMARK_WIDTHS: Record<string, number> = {
  Verizon: 98,
  GBG: 52,
  Healthdirect: 116,
  AirTrunk: 94,
  AtomEthics: 110,
  Banjo: 74,
  Nutanix: 92,
  Cisco: 64,
  Zoom: 62,
  Vodafone: 96,
  Huawei: 80,
  Adyen: 72,
  Veolia: 74,
};

function getFallbackWordmarkWidth(client: string) {
  return FALLBACK_WORDMARK_WIDTHS[client] ?? Math.max(64, Math.min(132, Math.round(client.length * 11)));
}

export function ClientWordmark({client, className}: ClientWordmarkProps) {
  const logo = CLIENT_LOGOS[client];

  if (logo) {
    return (
      <Image
        src={logo.src}
        alt={`${client} logo`}
        width={logo.width}
        height={logo.height}
        sizes="(max-width: 768px) 140px, 180px"
        className={cn('w-auto object-contain', className)}
      />
    );
  }

  const width = getFallbackWordmarkWidth(client);

  return (
    <svg
      viewBox={`0 0 ${width} 24`}
      role="img"
      aria-label={client}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{client}</title>
      <text
        x="0"
        y="17"
        fill="currentColor"
        fontFamily="var(--font-Sans-serif), Helvetica, Arial, sans-serif"
        fontSize="14"
        fontWeight="700"
        letterSpacing="0.08em"
        textLength={Math.max(width - 2, 1)}
        lengthAdjust="spacingAndGlyphs"
      >
        {client.toUpperCase()}
      </text>
    </svg>
  );
}
