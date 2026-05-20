import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
  return (
    <section className="bg-surface-light text-navy min-h-[70vh] flex items-center py-24">
      <Container className="text-center">
        <div className="section-tag section-tag-dark mb-8">Not Found</div>
        <h1 className="font-display text-hero text-balance max-w-3xl mx-auto">
          This page doesn&apos;t exist anymore.
        </h1>
        <p className="mt-6 text-lg leading-[1.8] text-navy/70 max-w-2xl mx-auto">
          The site is structured around core service pages and case studies. Let&apos;s get you
          back to work that matters.
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/work" className="btn-primary">
            <span>View Case Studies</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

