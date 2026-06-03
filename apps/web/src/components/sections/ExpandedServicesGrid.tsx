'use client';

import {useState} from 'react';
import {m} from 'framer-motion';
import ScrollReveal from '@/components/motion/ScrollReveal';
import ServiceDetailCard from '@/components/services/ServiceDetailCard';
import {SERVICES} from '@/lib/constants';
import {fadeUp, staggerContainer} from '@/lib/framer/variants';

const serviceDetails = [
  {
    slug: 'strategy-and-reputation',
    longDesc:
      'Core builds communication strategy, campaign planning, stakeholder profiling, branded content, media tracking, partnerships, sponsorships, and media training into a focused reputation program.',
    approach: [
      'Communication strategy tied to commercial priorities',
      'Project and retainer campaign planning',
      'Stakeholder profiling and targeted B2B media outreach',
      'Media tracking, analysis, partnerships, and training',
    ],
    outcomes: [
      'Clearer market positioning',
      'Stronger stakeholder credibility',
      'Sustained reputation visibility',
    ],
    caseStudyLink: '/work/verizon-dbir-2025',
  },
  {
    slug: 'media-and-influence',
    longDesc:
      'Media and influence programs help executives, founders, and subject-matter experts earn visibility in the conversations that shape category trust.',
    approach: [
      'Journalist engagement and relationship planning',
      'Executive profiling and thought leadership',
      'Industry influence mapping',
      'Earned media programs built around proof points',
    ],
    outcomes: [
      'More credible executive visibility',
      'Stronger media relationships',
      'Earned authority in priority sectors',
    ],
    caseStudyLink: '/work/gbg-digital-identity',
  },
  {
    slug: 'content-and-creative',
    longDesc:
      'Content and creative services turn business, product, and leadership narratives into assets that work across media, owned channels, and digital discovery.',
    approach: [
      'Press releases, leadership articles, and blogs',
      'Newsletters, whitepapers, research papers, and case studies',
      'Website, social, and video content',
      'Editorial planning across owned and earned channels',
    ],
    outcomes: [
      'More usable narrative assets',
      'Greater content consistency',
      'Stronger visibility across channels',
    ],
    caseStudyLink: '/work/tiiik-money',
  },
  {
    slug: 'digital-visibility',
    longDesc:
      'Digital visibility combines paid and earned social strategy, talent and speaker curation, social presence, and search visibility for B2B brands.',
    approach: [
      'Paid and earned social strategy',
      'Talent and speaker curation',
      'Search and social visibility planning',
      'Performance review and optimisation',
    ],
    outcomes: [
      'Improved visibility in priority channels',
      'More relevant social reach',
      'Clearer discovery paths for target audiences',
    ],
    caseStudyLink: '/work',
  },
  {
    slug: 'web-and-digital-experiences',
    longDesc:
      'Web and digital experience work helps prospects move from interest to action through stronger sites, landing pages, journeys, and UX.',
    approach: [
      'Website development and landing pages',
      'Digital experience planning',
      'Conversion journey mapping',
      'UX optimisation and content alignment',
    ],
    outcomes: [
      'Clearer buyer journeys',
      'Better conversion paths',
      'More polished digital credibility',
    ],
    caseStudyLink: '/contact',
  },
] as const;

export default function ExpandedServicesGrid() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <section className="bg-surface px-6 py-24 lg:px-16 lg:py-28">
      <ScrollReveal direction="up">
        <div className="mx-auto max-w-7xl">
          <m.div
            variants={staggerContainer(0.12, 0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-100px'}}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            {SERVICES.items.map((service, index) => {
              const details = serviceDetails.find((item) => item.slug === service.slug);

              if (!details) {
                return null;
              }

              const serviceId = index + 1;

              return (
                <m.div key={service.slug} id={service.slug} variants={fadeUp}>
                  <ServiceDetailCard
                    number={service.num}
                    icon={service.num}
                    title={service.title}
                    shortDesc={service.desc}
                    longDesc={details.longDesc}
                    approach={details.approach}
                    outcomes={details.outcomes}
                    caseStudyLink={details.caseStudyLink}
                    isExpanded={expandedId === serviceId}
                    onToggle={() =>
                      setExpandedId((current) => (current === serviceId ? null : serviceId))
                    }
                  />
                </m.div>
              );
            })}
          </m.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
