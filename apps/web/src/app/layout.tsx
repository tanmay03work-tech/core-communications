import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import PageTransition from '@/components/layout/PageTransition';
import LenisProvider from '@/components/layout/LenisProvider';
import {getAbsoluteUrl, getSiteUrl} from '@/lib/metadata';

const siteUrl = getSiteUrl();
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Core Communications',
  url: siteUrl,
  logo: getAbsoluteUrl('/logo_final.svg'),
  sameAs: [],
};

const CustomCursor = dynamic(() => import('@/components/layout/CustomCursor'), {
  ssr: false,
});

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.corecommunication.biz'
  ),
  title: {
    template: '%s | Core Communications',
    default:
      'Core Communications — B2B PR for Cybersecurity, Healthtech & Tech Companies',
  },
  description:
    'B2B PR and communications agency specialising in XaaS, SMBs, Cybersecurity, Identity, Healthtech and Tech-enabled companies. Strategic communications across APAC - Sydney, Mumbai and New Delhi.',
  keywords: [
    'B2B PR agency Australia',
    'cybersecurity PR',
    'healthtech PR',
    'tech PR agency Sydney',
    'XaaS communications',
    'SMB PR',
    'digital PR agency',
    'GEO services',
    'media relations Australia',
    'APAC communications',
    'India Australia PR',
    'thought leadership B2B',
    'content marketing tech',
    'influencer marketing B2B',
    'B2B communications Sydney Mumbai',
    'GEO AI search optimisation',
  ],
  openGraph: {
    type: 'website',
    locale: 'en',
    siteName: 'Core Communications',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      {url: '/logo_final.svg', type: 'image/svg+xml'},
    ],
    shortcut: '/logo_final.svg',
    apple: '/logo_final.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen cursor-none bg-navy text-white flex flex-col">
        <Script
          id="core-communications-organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{__html: JSON.stringify(organizationSchema)}}
        />
        <LazyMotion features={domAnimation} strict>
          <CustomCursor />
          <ScrollProgress />
          <LenisProvider>
            <Navbar />
            <PageTransition>
              <main className="flex-1">{children}</main>
            </PageTransition>
            <Footer />
          </LenisProvider>
        </LazyMotion>
        <Analytics />
        <SpeedInsights />
        {gaMeasurementId ? <GoogleAnalytics gaId={gaMeasurementId} /> : null}
      </body>
    </html>
  );
}
