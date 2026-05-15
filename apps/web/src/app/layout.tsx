import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import PageTransition from '@/components/layout/PageTransition';
import LenisProvider from '@/components/layout/LenisProvider';

const CustomCursor = dynamic(() => import('@/components/layout/CustomCursor'), {
  ssr: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://corecommunications.com.au'),
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
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Core Communications',
    title: 'Core Communications - Clarity. Credibility. Cut-through.',
    description:
      'B2B PR and communications for tech-led companies across APAC.',
  },
  twitter: {
    card: 'summary_large_image',
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
      <body className="cursor-none bg-navy text-white min-h-screen flex flex-col">
        <CustomCursor />
        <ScrollProgress />
        <LenisProvider>
          <Navbar />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
