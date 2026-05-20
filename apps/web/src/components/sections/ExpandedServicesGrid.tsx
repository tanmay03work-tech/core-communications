'use client';

import {useState} from 'react';
import {m} from 'framer-motion';
import ScrollReveal from '@/components/motion/ScrollReveal';
import ServiceDetailCard from '@/components/services/ServiceDetailCard';
import {SERVICES} from '@/lib/constants';
import {fadeUp, staggerContainer} from '@/lib/framer/variants';

const serviceDetails = [
  {
    slug: 'pr-distribution-and-media-relations',
    longDesc:
      "Built on 15+ years of journalist relationships in tech, fintech, cyber, and health, Core delivers precision media placements. We don't do blanket distribution - every story lands with the right journalist, at the right outlet, and at the right time.",
    approach: [
      'Tiered media mapping by audience segment and publication authority',
      'Pre-pitch journalist briefings and exclusive early access for priority titles',
      'Real-time monitoring, placement tracking, and rapid follow-up',
      'Post-publication amplification across owned and earned channels',
    ],
    outcomes: [
      '20M+ reach for Verizon DBIR 2025',
      '50+ media stories in 14 days',
      'Tier-1 presence across six states',
    ],
    caseStudyLink: '/work/verizon-dbir-2025',
  },
  {
    slug: 'media-tracking-and-editorial-engagement',
    longDesc:
      'Complex B2B stories demand credibility. We build whitepapers, opinion pieces, and commentary programs that give founders and executives a durable expert point of view in market conversations.',
    approach: [
      'Audience persona mapping and message calibration',
      'Whitepaper and report development grounded in proof',
      'Opinion-piece placement tied to business priorities',
      'Content syndication across LinkedIn and industry channels',
    ],
    outcomes: [
      '5K+ whitepaper downloads',
      'Tier-1 commentary placements',
      'Sustained executive visibility in target media',
    ],
    caseStudyLink: '/work/gbg-digital-identity',
  },
  {
    slug: 'issues-and-crises-communications',
    longDesc:
      'Content designed for media, search, and AI summaries. Our digital PR approach helps narratives show up where researchers, buyers, and executive teams actually look for answers.',
    approach: [
      'Keyword and retrieval intent research',
      'Structured content for search and AI discovery',
      'Owned-asset optimisation across website and blog',
      'Press seeding for breadth and authority signals',
    ],
    outcomes: [
      '12.7M+ reach in fintech launch coverage',
      'Stronger search visibility',
      'Narratives shaped for GEO from day one',
    ],
    caseStudyLink: '/work/tiiik-money',
  },
  {
    slug: 'content-creators-influencer-outreach',
    longDesc:
      'From creators to specialist KOLs, we connect brands with voices whose audiences match the people that matter to your pipeline, reputation, and growth goals.',
    approach: [
      'Audience alignment across creator tiers',
      'Briefing, approvals, and co-creation support',
      'Performance tracking for engagement and traffic',
      'Longer-term relationship building and ambassador planning',
    ],
    outcomes: [
      'Higher-quality conversation rates',
      'Measured creator performance',
      'Integrated paid, earned, and social narratives',
    ],
    caseStudyLink: '/work',
  },
  {
    slug: 'trade-body-media-partnerships-and-branded-engagements',
    longDesc:
      'When timing is critical, we help teams move from reaction to control with message frameworks, stakeholder communication, and disciplined media handling.',
    approach: [
      'Scenario planning and key-message preparation',
      'Rapid response channels and escalation workflows',
      'Narrative containment and spokesperson support',
      'Recovery planning to rebuild confidence after the event',
    ],
    outcomes: [
      'Faster stakeholder alignment',
      'More balanced media narratives',
      'Clearer internal and external communications',
    ],
    caseStudyLink: '/contact',
  },
  {
    slug: 'content-development-and-opinion-research',
    longDesc:
      'We build programs for brands operating across the India-Australia corridor, aligning market context, local media relationships, and cross-border visibility into one strategy.',
    approach: [
      'Dual-market narrative planning',
      'Local journalist and creator engagement in both markets',
      'Regulatory and cultural adaptation of campaign messages',
      'Unified reporting with market-specific KPIs',
    ],
    outcomes: [
      'Cross-market story amplification',
      'Local relevance in each geography',
      'Stronger APAC visibility for scaling brands',
    ],
    caseStudyLink: '/work',
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
