import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import {Poppins, Open_Sans, Merriweather} from 'next/font/google';
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

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-open-sans',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '700'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather',
  display: 'swap',
});

const siteUrl = getSiteUrl();
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.corecommunication.biz'
  ),
  title: {
    template: '%s | Core Communications',
    default:
      'Core Communications — B2B PR for Cybersecurity, Healthtech & Tech Companies',
  },
  description:
    'B2B PR and communications agency specialising in XaaS, SMBs, Cybersecurity, Identity, Healthtech and Tech-enabled companies. Strategic communications across APAC — Sydney and Mumbai.',
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
    icon: '/icon.png',
    apple: '/apple-touch-icon.png',
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
    <html lang="en" className={`${poppins.variable} ${openSans.variable} ${merriweather.variable}`}>
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
      </body>
    </html>
  );
}
