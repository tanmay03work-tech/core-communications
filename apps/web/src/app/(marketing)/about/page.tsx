import type { Metadata } from 'next';
import TeamSection from '@/components/sections/TeamSection';
import AboutPageClient from '@/components/pages/AboutPageClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Core Communications.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
