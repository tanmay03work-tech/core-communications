import type { Metadata } from 'next';
import ServicesPageClient from '@/components/pages/ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Services and Core difference.',
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
