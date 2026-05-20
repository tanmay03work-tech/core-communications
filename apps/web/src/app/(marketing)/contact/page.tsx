import type { Metadata } from 'next';
import ContactPageClient from '@/components/pages/ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a conversation with Core Communications.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
