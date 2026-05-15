/* ═══════════════════════════════════
   CORE COMMUNICATIONS — STATIC DATA
   Source: About_Core communication.pdf
   ═══════════════════════════════════ */

export const SITE = {
  name: 'Core Communications',
  tagline: 'Clarity. Credibility. Cut-through.',
  description:
    'B2B PR and communications for tech-led companies across APAC. Sydney · Mumbai.',
  email: 'bharatcorecommunication@gmail.com',
  phone: '+61 452 330 923',
  locations: ['Sydney, Australia', 'Mumbai, India'],
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Sectors', href: '/#sectors' },
  { label: 'Work', href: '/work' },
  { label: 'Team', href: '/#team' },
] as const;

export const HERO = {
  tag: 'B2B PR · Cybersecurity · Healthtech · XaaS',
  headline: {
    line1: 'PR that builds',
    line2: 'credibility,',
    line3: 'not just noise.',
  },
  subtitle:
    'Core Communications delivers B2B PR for tech-led companies navigating complex markets. Clarity. Credibility. Cut-through.',
  cta: {
    primary: { label: 'See Our Work', href: '/work' },
    secondary: { label: 'Start a Conversation', href: '/contact' },
  },
  stats: [
    { value: '20', suffix: 'M+', label: 'Audience reach, Verizon DBIR 2025' },
    { value: '50', suffix: '+', label: 'Unique media stories in 2 weeks' },
    { value: '15', suffix: '+', label: 'Years APAC media relationships' },
    { value: '95', suffix: '%', label: 'Media relevance (Banjo Loans)' },
  ],
  marquee:
    'CLARITY  ·  CREDIBILITY  ·  CUT-THROUGH  ·  B2B PR  ·  CYBERSECURITY  ·  HEALTHTECH  ·  XAAS  ·  APAC  ·  INDIA–AUSTRALIA  ·  ',
} as const;

export const TICKER_CLIENTS = [
  'Verizon', 'GBG', 'Healthdirect', 'AirTrunk', 'AtomEthics',
  'Banjo', 'Nutanix', 'Cisco', 'Zoom', 'Vodafone',
  'Huawei', 'Adyen', 'Veolia',
] as const;

export const ABOUT = {
  tag: 'About Core',
  heading: 'We make <em>complex</em> tech stories land.',
  paragraphs: [
    'Core Communications helps B2B companies and SMBs get visibility that leads to real outcomes — not just coverage. We specialise in cybersecurity, identity, healthtech, and emerging technology.',
    'With over 15 years of media relationships across APAC, particularly Australia and India, we support brand positioning, corporate communications, influencer engagement, and crisis management.',
    'Founded in 2025 by practitioners with deep experience across India and Australia, Core works with startups and scale-ups to build sustained credibility with investors, partners, and stakeholders.',
  ],
  pillars: [
    {
      title: 'Translate the Technical',
      text: 'Complex capability translated into market-facing language. Designed for humans and machines.',
    },
    {
      title: 'Beyond Distribution',
      text: 'Messaging aligned to growth, funding, partnerships and sales — not just media placements.',
    },
    {
      title: 'High Impact, Focused',
      text: 'One strong asset, multiple narratives. Built for SMBs scaling responsibly.',
    },
    {
      title: 'GEO-Aware Thinking',
      text: 'How narratives show up in AI answers and search — considered from day one.',
    },
  ],
} as const;

export const SERVICES = {
  tag: 'What We Do',
  heading: 'Services built for <em>B2B</em> growth.',
  subtitle:
    'From media relations and thought leadership to digital PR and influencer campaigns — every service is engineered for measurable impact.',
  items: [
    {
      num: '01',
      title: 'PR Distribution & Media Relations',
      desc: 'Strategic media outreach to tier-1, trade, and vertical publications across APAC. Built on 15+ years of journalist relationships.',
      slug: 'media-relations',
    },
    {
      num: '02',
      title: 'Thought Leadership & Content',
      desc: 'Opinion pieces, whitepapers, reports, and commentary that position your leaders as go-to experts in crowded markets.',
      slug: 'thought-leadership',
    },
    {
      num: '03',
      title: 'Digital PR & GEO',
      desc: 'Content designed for media, search, and AI summaries. Generative Engine Optimisation (GEO) built into every strategy.',
      slug: 'digital-pr',
    },
    {
      num: '04',
      title: 'Influencer & KOL Outreach',
      desc: 'End-to-end influencer and Key Opinion Leader campaigns — from creator selection to performance tracking and ROI reporting.',
      slug: 'influencer-outreach',
    },
    {
      num: '05',
      title: 'Crisis & Issues Management',
      desc: 'Rapid response frameworks. Issues monitoring, stakeholder communications, and narrative management when it matters most.',
      slug: 'crisis-management',
    },
    {
      num: '06',
      title: 'India–Australia Corridor',
      desc: 'Focused media, digital PR, social, and influencer programs that connect brands across the India–Australia trade corridor.',
      slug: 'india-australia',
    },
  ],
} as const;

export const SECTORS = {
  tag: 'Sector Expertise',
  heading: 'We speak <em>your</em> industry\'s language.',
  items: [
    { label: 'Cybersecurity', active: true },
    { label: 'Identity & IAM', active: true },
    { label: 'Healthtech', active: true },
    { label: 'XaaS Platforms', active: true },
    { label: 'Fintech & BFSI', active: false },
    { label: 'Critical Infrastructure', active: false },
    { label: 'Telecom & Technology', active: false },
    { label: 'Edtech', active: false },
    { label: 'E-commerce & Retail', active: false },
    { label: 'Startup & SMBs', active: false },
    { label: 'Sustainability & CSR', active: false },
    { label: 'Public Sector & Government', active: false },
    { label: 'SaaS & CRMs', active: false },
    { label: 'DeFi & Crypto', active: false },
  ],
} as const;

export const CASE_STUDIES = {
  tag: 'Case Studies',
  heading: 'Results that speak <em>for themselves.</em>',
  items: [
    {
      slug: 'verizon-dbir-2025',
      client: 'Verizon · Cybersecurity',
      title: 'DBIR 2025 became a national cybersecurity moment',
      desc: "Positioned Year 19 of Verizon's Data Breach Investigations Report as a timely, expert-backed resource — cutting through media fatigue with exclusive placements and national reach across all 6 states.",
      stats: [
        { value: '20M+', label: 'Audience Reach' },
        { value: '50+', label: 'Media Stories' },
        { value: '6', label: 'States Covered' },
      ],
    },
    {
      slug: 'gbg-digital-identity',
      client: 'GBG · Digital Identity',
      title: 'Driving enterprise trust in digital identity & fraud prevention',
      desc: "Unified GBG's messaging post-acquisition and built share of voice through layered thought leadership, whitepapers, and strategic tier-1 and trade media engagement across Australia.",
      stats: [
        { value: 'Tier 1', label: 'Media Presence' },
        { value: 'National', label: 'ID Scheme Whitepaper' },
      ],
    },
    {
      slug: 'tiiik-money',
      client: 'Tiiik Money · Fintech / DeFi',
      title: '$5.2M seed round launch with AFR exclusive & 12.7M reach',
      desc: 'A 2-pronged media strategy — big bang AFR launch + sustained b2b trade engagement — drove 25 high-impact coverage pieces, 230+ engagements, and a spike in investor inquiries and registrations.',
      stats: [
        { value: '12.7M+', label: 'Total Reach' },
        { value: '167K', label: 'Coverage Views' },
        { value: '230+', label: 'Engagements' },
      ],
    },
    {
      slug: 'banjo-loans',
      client: 'Banjo Loans · SME Finance',
      title: '$100M capital raise + SME Compass report, 1.2M+ reach',
      desc: 'A targeted dual-track media strategy placed the capital raise exclusively in AFR and drove 19 high-impact stories for the SME Compass report across tier-1 and trade outlets with 95% media relevance.',
      stats: [
        { value: '1.2M+', label: 'Coverage Reach' },
        { value: '95%', label: 'Media Relevance' },
        { value: '19', label: 'High Impact Stories' },
      ],
    },
  ],
} as const;

export const TEAM = {
  tag: 'The Team',
  heading: 'Practitioners, not <em>process-followers.</em>',
  members: [
    {
      initials: 'BJ',
      name: 'Bharat Joshi',
      role: 'Co-Founder · Sydney, Australia',
      bio: "10 years' experience across technology, fintech, energy, digital identity, infrastructure and public sector. Led programs for Verizon, GBG, Healthdirect, AirTrunk and AtomEthics at executive and regulatory level.",
    },
    {
      initials: 'HJ',
      name: 'Harshit Jain',
      role: 'Co-Founder · Mumbai, India',
      bio: '8+ years in digital PR & marketing. Has worked with Tata Group, Vodafone, Godrej, and Aditya Birla Group. Specialist in digital branding, performance marketing, and influencer strategy.',
    },
  ],
} as const;

export const CTA = {
  heading: 'Ready to cut <em>through</em>?',
  subtitle:
    "Tell us about your brand. We'll tell you how to make the right audiences pay attention.",
  primary: { label: 'Start a Conversation', href: '/contact' },
  secondary: { label: 'View Our Work', href: '/work' },
} as const;

export const FOOTER = {
  services: [
    { label: 'Media Relations', href: '/services#media-relations' },
    { label: 'Thought Leadership', href: '/services#thought-leadership' },
    { label: 'Digital PR & GEO', href: '/services#digital-pr' },
    { label: 'Influencer Outreach', href: '/services#influencer-outreach' },
    { label: 'Crisis Management', href: '/services#crisis-management' },
  ],
  sectors: [
    { label: 'Cybersecurity', href: '/#sectors' },
    { label: 'Healthtech', href: '/#sectors' },
    { label: 'XaaS & SaaS', href: '/#sectors' },
    { label: 'Fintech', href: '/#sectors' },
    { label: 'Startups & SMBs', href: '/#sectors' },
  ],
} as const;
