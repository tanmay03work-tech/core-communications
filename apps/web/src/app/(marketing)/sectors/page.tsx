import type { Metadata } from 'next';
import SectorsPageClient from '@/components/pages/SectorsPageClient';

export const metadata: Metadata = {
  title: 'Sectors',
  description: 'Sectoral expertise and mandates handled.',
};

export default function SectorsPage() {
  return <SectorsPageClient />;
}
