import Link from 'next/link';
import {Container} from '@/components/layout/Container';
import {ContactForm} from '@/components/sections/ContactForm';
import SectionLabel from '@/components/ui/SectionLabel';
import {SITE} from '@/lib/constants';
import {getMarketingPageSeo, resolvePageMetadata} from '@/lib/metadata';
import {getSiteSettings} from '@/lib/sanity/content';

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();

  return resolvePageMetadata({
    pathname: '/contact',
    fallbackTitle: 'Contact',
    fallbackDescription: 'Start a conversation with Core Communications.',
    pageSeo: getMarketingPageSeo(siteSettings, 'contact'),
  });
}

export default function ContactPage() {
  return (
    <main className="bg-surface text-navy">
      <section className="section-wrap">
        <Container>
          <div className="grid-split items-start">
            <div className="pt-4">
              <SectionLabel className="text-primary">Contact</SectionLabel>
              <h1 className="section-heading max-w-xl text-navy">
                Let&apos;s build the right kind of attention.
              </h1>
              <p className="mb-8 mt-6 max-w-xl text-base leading-8 text-navy/68">
                Tell us what you&apos;re launching, shifting, or trying to unlock. We&apos;ll come back with the sharpest next step.
              </p>
              <div className="divide-y divide-neutral-100 border-y border-neutral-100">
                <div className="py-4">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-navy/52">Email</div>
                  <a href={`mailto:${SITE.email}`} className="mt-2 block text-[1.02rem] text-navy no-underline">
                    {SITE.email}
                  </a>
                </div>
                <div className="py-4">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-navy/52">Phone</div>
                  <a href={`tel:${SITE.phone}`} className="mt-2 block text-[1.02rem] text-navy no-underline">
                    {SITE.phone}
                  </a>
                </div>
                <div className="py-4">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-navy/52">Locations</div>
                  <div className="mt-2 space-y-1 text-[0.98rem] leading-7 text-navy/72">
                    {SITE.locations.map((location) => (
                      <div key={location}>{location}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-neutral-100 bg-white p-8">
              <SectionLabel className="text-primary">Project Enquiry</SectionLabel>
              <ContactForm />
              <div className="mt-6 border-t border-neutral-100 pt-6">
                <Link href="/work" className="btn-ghost inline-flex">
                  <span>See Our Work</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
