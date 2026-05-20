/*
   CORE COMMUNICATIONS - STATIC DATA
   Source: About_Core communication.pdf
*/

export const SITE = {
  name: 'Core Communications',
  tagline: 'Clarity. Credibility. Cut-through.',
  description:
    'B2B PR and communications for tech-led companies across APAC. Sydney - Mumbai.',
  email: 'bharatcorecommunication@gmail.com',
  phone: '+61 452 330 923',
  locations: ['Sydney, Australia', 'Mumbai, India'],
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Work', href: '/work' },
  { label: 'Team', href: '/#team' },
] as const;

export const HERO = {
  tag: 'B2B PR - Cybersecurity - Healthtech - XaaS',
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
    'CLARITY  -  CREDIBILITY  -  CUT-THROUGH  -  B2B PR  -  CYBERSECURITY  -  HEALTHTECH  -  XAAS  -  APAC  -  INDIA-AUSTRALIA  -  ',
} as const;

export const TICKER_CLIENTS = [
  'Verizon',
  'GBG',
  'Onestream',
  'AtomEthics',
  'Nutanix',
  'SunPower Renewables',
  'Zoom',
  'Veolia',
  'AirTrunk',
  'Healthdirect',
  'Banjo',
  'Vodafone',
  'Asset Vision',
  'Cisco',
  'Adyen',
  'Matific',
  'Parallel Wireless',
  'Huawei',
] as const;

export const ABOUT = {
  tag: 'About Core',
  heading: 'About Core',
  paragraphs: [
    'We help B2B companies and SMBs get visibility that leads to real outcomes, not just coverage.',
    'Core specialises in cybersecurity, identity, healthtech, and emerging technology, delivering clear storytelling, strong media engagement, and targeted digital amplification that reaches decision-makers.',
    'With over 15 years of media relationships across APAC, particularly Australia and India, Core supports brand positioning, corporate communications, influencer engagement, sustainability narratives, listening and issues or crisis management.',
    'Founded in 2025 by practitioners with deep experience across India, Australia, and the PR and digital ecosystem, Core Communications works with startups and scale-ups to build sustained credibility with investors, partners, and stakeholders.',
    'We also work closely across the India-Australia trade corridor, running focused media, digital PR, social, and influencer programs that connect the right audiences on both sides.',
  ],
  pillars: [
    {
      title: 'Translate the technical',
      text: 'AI, cybersecurity, identity, infrastructure, B2B platforms. Complex capability translated into market-facing language. Designed to work for humans and machines. Credible, precise messaging and thought leadership that builds trust and authority.',
    },
    {
      title: 'Beyond distribution',
      text: 'Messaging aligned to growth, funding, partnerships and sales. Media tracking and social listening. Industry relations, Influencer and expert outreach where it adds credibility - going beyond media outreach. Strategic media partnerships to support long-term relevance.',
    },
    {
      title: 'High impact. Focused',
      text: 'Research, reports, platforms, case studies repurposed strategically. One strong asset, multiple narratives. Content designed for media, search and AI summaries. Built for SMBs and B2B companies scaling responsibly.',
    },
    {
      title: 'Key Market Insights',
      text: 'Media, market and AI-search realities considered upfront. Why some stories surface, and others disappear? GEO-aware thinking: how narratives show up in AI answers. Insight shaped by journalist behaviour, platform signals and sector context.',
    },
  ],
} as const;

export const SERVICES = {
  tag: 'Services',
  heading: 'Services',
  subtitle:
    'Six focused services built for B2B brands that need clearer positioning, stronger visibility, and market-facing credibility.',
  items: [
    {
      num: '01',
      title: 'PR distribution and media relations',
      desc: 'Precision media outreach built on strong journalist relationships, timed for relevance and decision-maker visibility.',
      slug: 'pr-distribution-and-media-relations',
    },
    {
      num: '02',
      title: 'Media tracking and editorial engagement',
      desc: 'Editorial programs, thought leadership, and tracking that help executive voices stay visible in the right conversations.',
      slug: 'media-tracking-and-editorial-engagement',
    },
    {
      num: '03',
      title: 'Issues and crises communications',
      desc: 'Structured message handling and response planning for sensitive moments where clarity and control matter most.',
      slug: 'issues-and-crises-communications',
    },
    {
      num: '04',
      title: 'Content creators/Influencer outreach',
      desc: 'Creator, influencer, and expert outreach designed to add authority, relevance, and audience trust.',
      slug: 'content-creators-influencer-outreach',
    },
    {
      num: '05',
      title: 'Trade body, Media partnerships and branded engagements',
      desc: 'Strategic partnerships and branded engagement opportunities that extend visibility beyond one-off coverage.',
      slug: 'trade-body-media-partnerships-and-branded-engagements',
    },
    {
      num: '06',
      title: 'Content development and Opinion research',
      desc: 'Research-led content and opinion assets created for media impact, search visibility, and long-term narrative value.',
      slug: 'content-development-and-opinion-research',
    },
  ],
} as const;

export const SECTORS = {
  tag: 'Sector Expertise',
  heading: 'Sectors and clients',
  items: [
    { label: 'Telecom and Technology', active: true },
    { label: 'XaaS, E-comm, retail, Edtech, Medtech and Fintech, CRMs', active: true },
    { label: 'Startup and SMBs', active: true },
    { label: 'Cybersecurity, Identity and Critical Infrastructure', active: true },
    { label: 'Sustainability and CSR communications', active: true },
  ],
} as const;

export const SECTORS_AND_CLIENTS = {
  title: 'Sectors and clients',
  sectoralExpertise: [
    'Telecom and Technology',
    'XaaS, E-comm, retail, Edtech, Medtech and Fintech, CRMs',
    'Startup and SMBs',
    'Cybersecurity, Identity and Critical Infrastructure',
    'Sustainability and CSR communications',
  ],
  mandatesHandled: [
    'Corporate, Brand and B2B',
    'Leadership profiling',
    'Product and Report launch',
    'Experiential PR',
    'Digital PR and Influencer campaigns',
    'Content and Branded Campaigns',
    'Key Opinion Leader (KOL) outreach',
    'Generative Engine Optimisation (GEO)',
  ],
  serviceLines: [
    'PR distribution and media relations',
    'Media tracking and editorial engagement',
    'Issues and crises communications',
    'Content creators/Influencer outreach',
    'Trade body, Media partnerships and branded engagements',
    'Content development and Opinion research',
  ],
} as const;

export const CASE_STUDIES = {
  tag: 'Case Studies',
  heading: 'Results that speak <em>for themselves.</em>',
  items: [
    {
      slug: 'verizon-dbir-2025',
      client: 'Verizon - Cybersecurity',
      title: 'DBIR 2025 became a national cybersecurity moment',
      desc: "Positioned Year 19 of Verizon's Data Breach Investigations Report as a timely, expert-backed resource - cutting through media fatigue with exclusive placements and national reach across all 6 states.",
      stats: [
        { value: '20M+', label: 'Audience Reach' },
        { value: '50+', label: 'Media Stories' },
        { value: '6', label: 'States Covered' },
      ],
    },
    {
      slug: 'gbg-digital-identity',
      client: 'GBG - Digital Identity',
      title: 'Driving enterprise trust in digital identity & fraud prevention',
      desc: "Unified GBG's messaging post-acquisition and built share of voice through layered thought leadership, whitepapers, and strategic tier-1 and trade media engagement across Australia.",
      stats: [
        { value: 'Tier 1', label: 'Media Presence' },
        { value: 'National', label: 'ID Scheme Whitepaper' },
      ],
    },
    {
      slug: 'tiiik-money',
      client: 'Tiiik Money - Fintech / DeFi',
      title: '$5.2M seed round launch with AFR exclusive & 12.7M reach',
      desc: 'A 2-pronged media strategy - big bang AFR launch + sustained b2b trade engagement - drove 25 high-impact coverage pieces, 230+ engagements, and a spike in investor inquiries and registrations.',
      stats: [
        { value: '12.7M+', label: 'Total Reach' },
        { value: '167K', label: 'Coverage Views' },
        { value: '230+', label: 'Engagements' },
      ],
    },
    {
      slug: 'banjo-loans',
      client: 'Banjo Loans - SME Finance',
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
      role: 'Co-Founder - Sydney, Australia',
      bio: "10 years' experience across technology, fintech, energy, digital identity, infrastructure and public sector. Led programs for Verizon, GBG, Healthdirect, AirTrunk and AtomEthics at executive and regulatory level.",
    },
    {
      initials: 'HJ',
      name: 'Harshit Jain',
      role: 'Co-Founder - Mumbai, India',
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
    { label: 'Media Relations', href: '/services#pr-distribution-and-media-relations' },
    { label: 'Editorial Engagement', href: '/services#media-tracking-and-editorial-engagement' },
    { label: 'Issues & Crises', href: '/services#issues-and-crises-communications' },
    { label: 'Influencer Outreach', href: '/services#content-creators-influencer-outreach' },
    { label: 'Opinion Research', href: '/services#content-development-and-opinion-research' },
  ],
  sectors: [
    { label: 'Telecom & Technology', href: '/sectors' },
    { label: 'Cybersecurity', href: '/sectors' },
    { label: 'XaaS & CRMs', href: '/sectors' },
    { label: 'Startups & SMBs', href: '/sectors' },
    { label: 'Sustainability & CSR', href: '/sectors' },
  ],
} as const;
