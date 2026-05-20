'use client';

import {m} from 'framer-motion';
import ScrollReveal from '@/components/motion/ScrollReveal';
import FeaturedSectorCard from '@/components/sectors/FeaturedSectorCard';
import {fadeUp, staggerContainer} from '@/lib/framer/variants';

const featuredSectors = [
  {
    icon: '🔐',
    title: 'Cybersecurity',
    description:
      'Security stories demand accuracy, urgency, and credibility across enterprise buyers, analysts, and journalists.',
    expertise: ['Breach comms', 'Threat intel', 'Enterprise trust'],
    relatedCaseStudies: [
      {title: 'Verizon DBIR 2025', href: '/work/verizon-dbir-2025'},
      {title: 'AtomEthics', href: '/work'},
    ],
  },
  {
    icon: '🪪',
    title: 'Identity & IAM',
    description:
      'Identity, access, and trust infrastructure messaging for regulated industries and digital-first platforms.',
    expertise: ['Identity proofing', 'Zero trust', 'Compliance'],
    relatedCaseStudies: [
      {title: 'GBG - Digital Identity', href: '/work'},
      {title: 'Critical infrastructure programs', href: '/work'},
    ],
  },
  {
    icon: '🧬',
    title: 'Healthtech',
    description:
      'From clinical credibility to patient confidence, we translate complex health innovation into clear market narratives.',
    expertise: ['Clinician relations', 'Health policy', 'Patient education'],
    relatedCaseStudies: [
      {title: 'Healthtech launch programs', href: '/work'},
      {title: 'Regulated category storytelling', href: '/work'},
    ],
  },
  {
    icon: '☁️',
    title: 'XaaS Platforms',
    description:
      'SaaS, infrastructure, and platform businesses need category storytelling that supports product adoption and pipeline.',
    expertise: ['Category creation', 'Developer voice', 'Product launches'],
    relatedCaseStudies: [
      {title: 'Platform positioning campaigns', href: '/work'},
      {title: 'B2B growth narratives', href: '/work'},
    ],
  },
];

export default function FeaturedSectorsStrip() {
  return (
    <section className="bg-ink px-6 py-28 lg:px-16">
      <ScrollReveal direction="up">
        <div className="mx-auto max-w-7xl">
          <m.div
            variants={staggerContainer(0.12, 0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-100px'}}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {featuredSectors.map((sector) => (
              <m.div key={sector.title} variants={fadeUp}>
                <FeaturedSectorCard {...sector} />
              </m.div>
            ))}
          </m.div>
        </div>
      </ScrollReveal>
    </section>
  );
}

