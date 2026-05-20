import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import {Inter} from 'next/font/google';
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

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

const siteUrl = getSiteUrl();
const canonicalUrl = getAbsoluteUrl('/');
const defaultOgImage = getAbsoluteUrl('/logo.png');
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Core Communications',
  url: siteUrl,
  logo: getAbsoluteUrl('/logo.png'),
  sameAs: [],
};

const CustomCursor = dynamic(() => import('@/components/layout/CustomCursor'), {
  ssr: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Core Communications - Clarity. Credibility. Cut-through.',
    template: '%s | Core Communications',
  },
  description:
    'B2B PR and communications for tech-led companies specialising in cybersecurity, identity, healthtech, and XaaS across APAC. Sydney and Mumbai.',
  keywords: [
    'B2B PR', 'public relations', 'cybersecurity PR', 'healthtech PR',
    'digital PR', 'GEO', 'APAC communications', 'India Australia',
    'tech PR agency', 'Core Communications',
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: canonicalUrl,
    siteName: 'Core Communications',
    title: 'Core Communications - Clarity. Credibility. Cut-through.',
    description:
      'B2B PR and communications for tech-led companies across APAC.',
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Core Communications',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Core Communications - Clarity. Credibility. Cut-through.',
    description:
      'B2B PR and communications for tech-led companies across APAC.',
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen cursor-none bg-navy text-white flex flex-col`}>
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
      </body>
    </html>
  );
}
