import type { Metadata } from 'next';
import TeamPageClient from '@/components/pages/TeamPageClient';

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the Core Communications team across Sydney and Mumbai.',
};

export default function TeamPage() {
  return <TeamPageClient />;
}
