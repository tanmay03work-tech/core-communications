'use client';

import {motion} from 'framer-motion';
import ScrollReveal from '@/components/motion/ScrollReveal';
import SectorCard from '@/components/sectors/SectorCard';
import {staggerContainer} from '@/lib/framer/variants';

const sectors = [
  {
    title: 'Critical Infrastructure',
    icon: '🏗️',
    description:
      'Identity, critical systems, SCADA networks, and regulatory compliance for utilities, transport, and energy. Complex stakeholder landscape.',
    expertise: ['Regulatory communications', 'System security PR', 'Stakeholder alignment'],
    relatedCaseStudy: {title: 'GBG - Digital Identity', href: '/work'},
  },
  {
    title: 'Telecom & Technology',
    icon: '📶',
    description:
      'From network rollouts to 5G, spectrum licensing to broadband access. Coverage across AFR, tech trade, and policy publications.',
    expertise: ['Spectrum policy', 'Network infrastructure', 'Operator communications'],
    relatedCaseStudy: {title: 'Verizon DBIR 2025', href: '/work/verizon-dbir-2025'},
  },
  {
    title: 'Edtech',
    icon: '📚',
    description:
      'Online learning platforms, assessment tools, and digital curriculum. Messaging for students, educators, investors, and regulators.',
    expertise: ['EdTech product launches', 'Educator engagement', 'Parent communications'],
    relatedCaseStudy: null,
  },
  {
    title: 'E-commerce & Retail',
    icon: '🛍️',
    description:
      'Online-only retailers, marketplace platforms, and supply chain innovation. Performance marketing plus brand credibility.',
    expertise: ['Product launch PR', 'Marketplace positioning', 'Consumer trend analysis'],
    relatedCaseStudy: null,
  },
  {
    title: 'Startups & SMBs',
    icon: '🚀',
    description:
      'Early-stage funding announcements, growth narratives, and founder positioning. AFR exclusive strategies and venture press seeding.',
    expertise: ['Seed round PR', 'Founder positioning', 'Growth PR'],
    relatedCaseStudy: {title: 'Tiiik Money - $5.2M Seed', href: '/work'},
  },
  {
    title: 'Sustainability & CSR',
    icon: '🌱',
    description:
      'ESG reporting, carbon commitments, and impact narratives. B2B sustainability storytelling that drives investor and customer confidence.',
    expertise: ['Impact narrative', 'ESG communications', 'Stakeholder trust-building'],
    relatedCaseStudy: null,
  },
  {
    title: 'Public Sector',
    icon: '🏛️',
    description:
      'Government agencies, policy bodies, and regulatory authorities. Complex stakeholder coordination, policy comms, and public consultation.',
    expertise: ['Policy communications', 'Stakeholder alignment', 'Public consultation PR'],
    relatedCaseStudy: null,
  },
  {
    title: 'SaaS & CRMs',
    icon: '⚙️',
    description:
      'Software-as-a-service platforms and customer relationship management tools. Product positioning, developer advocacy, and user growth.',
    expertise: ['Product launch', 'Developer advocacy', 'User growth campaigns'],
    relatedCaseStudy: null,
  },
  {
    title: 'DeFi & Web3',
    icon: '⛓️',
    description:
      'Decentralized finance, crypto protocols, NFT platforms, and blockchain infrastructure. Navigate regulatory uncertainty with clear messaging.',
    expertise: ['Crypto PR', 'Regulatory navigation', 'Community engagement'],
    relatedCaseStudy: {title: 'Tiiik Money', href: '/work'},
  },
  {
    title: 'Medtech',
    icon: '🩺',
    description:
      'Medical device companies, diagnostic platforms, and health tech startups. TGA compliance, clinician engagement, and patient education.',
    expertise: ['Regulatory approvals', 'Clinician relations', 'Patient communications'],
    relatedCaseStudy: null,
  },
  {
    title: 'AI & Emerging Tech',
    icon: '🤖',
    description:
      'AI platforms, machine learning applications, quantum computing, and advanced semiconductors. Position your tech as solution, not hype.',
    expertise: ['AI ethics and safety', 'Technology positioning', 'Analyst relations'],
    relatedCaseStudy: {title: 'AtomEthics', href: '/work'},
  },
  {
    title: 'Fintech & BFSI',
    icon: '💳',
    description:
      'Payments, banking innovation, compliance platforms, and digital wealth products. Credibility across customers, regulators, and investors.',
    expertise: ['Financial services PR', 'Regulatory comms', 'Funding narratives'],
    relatedCaseStudy: {title: 'Tiiik Money - Seed Raise', href: '/work'},
  },
];

export default function AllSectorsGrid() {
  return (
    <section id="all-sectors" className="bg-surface px-6 py-32 lg:px-16">
      <ScrollReveal direction="up">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Industry coverage
            </p>
            <h2 className="mt-5 font-sans text-[clamp(2.4rem,4vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-primary">
              Broad sector fluency beyond the headlines
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Featured categories lead the conversation, but our programs extend across
              adjacent markets, regulated categories, and emerging platforms.
            </p>
          </div>

          <motion.div
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer(0.12, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-100px'}}
          >
            {sectors.map((sector) => (
              <SectorCard key={sector.title} {...sector} />
            ))}
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
