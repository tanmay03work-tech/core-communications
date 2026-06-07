/*
   CORE COMMUNICATIONS - STATIC DATA
   Source: About_Core communication.pdf
*/

export const SITE = {
  name: 'CORE COMMUNICATIONS',
  tagline: 'Clarity. Credibility. Cut-through.',
  description:
    'B2B PR and communications for tech-led companies across APAC. Sydney, Mumbai and New Delhi.',
  email: 'bharat.joshi@corecommunication.biz',
  phone: 'Sydney: +61 452330923 | Mumbai: +91 9035190371 | New Delhi: +91 9811859775',
  phones: [
    { city: 'Sydney', number: '+61 452330923', href: 'tel:+61452330923' },
    { city: 'Mumbai', number: '+91 9035190371', href: 'tel:+919035190371' },
    { city: 'New Delhi', number: '+91 9811859775', href: 'tel:+919811859775' },
  ],
  locations: ['Sydney, Australia', 'Mumbai, India', 'New Delhi, India'],
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Sectors', href: '/#sectors' },
  { label: 'Work', href: '/work' },
  { label: 'Team', href: '/#team' },
] as const;

export const HERO = {
  tag: 'B2B Communications',
  headline: {
    line1: 'Communication strategy',
    line2: 'that builds',
    line3: 'not noise.',
  },
  subtitle:
    'Strategic communications for XaaS, cybersecurity, digital identity, healthtech and technology-enabled businesses - translating complexity into commercial clarity.',
  cta: {
    primary: { label: 'See Our Work', href: '/work' },
    secondary: { label: 'Start a Conversation', href: '/contact' },
  },
  stats: [
    { value: 'Sectors', suffix: '', label: 'Telecom, XaaS, SMBs. Cybersecurity, Identity & Tech businesses' },
    { value: 'Services', suffix: '', label: 'Strategy & Reputation. Media, Content, Digital & GEO' },
    { value: 'Markets', suffix: '', label: 'Australia · India · APAC' },
    { value: '20+ years', suffix: '', label: 'Combined experience' },
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
  'Vodafone',
  'TDK Ventures',
  'Matific Education',
  'GHE',
  'Deepworkz',
  'Ojas Media',
  'Asset Vision',
  'Cisco',
  'Adyen',
  'Parallel Wireless',
  'Tiiik',
  'Huawei',
] as const;

export const ABOUT = {
  tag: 'About Core',
  heading: 'About Core Communications',
  paragraphs: [
    'Most technology companies are invisible to the audiences that matter most.',
    'Core Communications is a communications consultancy built for B2B, enterprise and growth-stage businesses operating in cybersecurity, digital identity, healthtech and emerging technology. We help organisations turn complex products, services and expertise into clear stories that customers, investors, partners, regulators and media can understand.',
    'In many organisations, communications is fragmented across agencies, internal teams and suppliers. The result is activity without momentum. We act as an extension of your marketing and communications team, bringing together media relations, content, executive profiling, digital amplification, stakeholder engagement and issues management under one strategy.',
    "Founded by communications practitioners and Journalists with more than 20 years of experience across Australia, India and the wider APAC region, including leadership roles with some of the industry's leading agencies, Core understands both the technology and the audiences shaping business outcomes.",
    'Our focus is simple: Communicate with Clarity, to support Credibility and get the Cut-through that catalyses growth, strengthens reputation and helps organisations be recognised for the work they are already doing.',
    'Strong Core means strong communications infrastructure - not just coverage.',
    'The India-Australia Advantage',
    "The only corridor most comms agencies don't speak fluently.",
    'Two of the fastest-growing technology and infrastructure markets in the Asia-Pacific share regulatory complexity, ambitious policy agendas, and a growing bilateral trade relationship. Core Communications is built to operate in both, with practitioner relationships, media networks, and market intelligence on each side.',
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
  heading: 'Core Services',
  subtitle: '',
  items: [
    {
      num: '01',
      title: 'Strategy & Reputation',
      desc: 'Communication strategy, stakeholder mapping, campaigns, media training, and reputation programs built for commercial relevance.',
      slug: 'strategy-and-reputation',
    },
    {
      num: '02',
      title: 'Media & Influence',
      desc: 'Media relations, journalist engagement, executive profiling, thought leadership, and earned media programs that build authority.',
      slug: 'media-and-influence',
    },
    {
      num: '03',
      title: 'Content & Creative',
      desc: 'Press releases, leadership articles, blogs, newsletters, whitepapers, case studies, social content, and video content.',
      slug: 'content-and-creative',
    },
    {
      num: '04',
      title: 'Digital Visibility',
      desc: 'Paid and earned social strategy, talent and speaker curation, social visibility, and search visibility for B2B audiences.',
      slug: 'digital-visibility',
    },
    {
      num: '05',
      title: 'Web & Digital Experiences',
      desc: 'Website development, landing pages, digital experiences, conversion journeys, and UX optimisation for clearer buyer paths.',
      slug: 'web-and-digital-experiences',
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

export const HOMEPAGE_SECTORS = {
  eyebrow: 'SECTORS',
  heading: 'Sectors We Focus On',
  subheading: '',
  items: [
    {
      title: 'Identity Verification',
      descriptor: 'KYC, AML/CTF, digital identity',
      badge: 'Trust',
    },
    {
      title: 'Data Centres Infrastructure',
      descriptor: 'Hyperscale, colocation, sovereign cloud',
      badge: 'Infra',
    },
    {
      title: 'Cybersecurity & Critical Infrastructure',
      descriptor: 'Threat intelligence, enterprise security',
      badge: 'Core',
    },
    {
      title: 'Solar & Renewable',
      descriptor: 'Utility-scale and clean energy',
      badge: 'Energy',
    },
    {
      title: 'XaaS',
      descriptor: 'B2B platforms and SaaS products',
      badge: 'Platform',
    },
    {
      title: 'Health & Med-Tech',
      descriptor: 'Digital health and clinical innovation',
      badge: 'Health',
    },
    {
      title: 'Fintech & Payments',
      descriptor: 'Payments, embedded finance, BNPL',
      badge: 'Finance',
    },
    {
      title: 'Telecom',
      descriptor: 'Connectivity and communications infrastructure',
      badge: 'Network',
    },
    {
      title: 'Water Management',
      descriptor: 'Utilities and sustainability',
      badge: 'Utility',
    },
    {
      title: 'Start-ups & SMBs',
      descriptor: 'Growth-stage and scaling businesses',
      badge: 'Growth',
    },
    {
      title: 'Trade Corridor Marketing',
      descriptor: 'Cross-border business visibility',
      badge: 'APAC',
    },
    {
      title: 'Industry & Trade Association Outreach',
      descriptor: 'Industry engagement and stakeholder communications',
      badge: 'Outreach',
    },
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
      slug: 'leading-international-cybersecurity-company',
      caseNumber: '01',
      client: 'Leading International Cybersecurity Company',
      title: 'Leading International Cybersecurity Company',
      tag: 'Cybersecurity',
      sector: 'Cybersecurity / Enterprise Technology',
      kicker: 'Annual Threat Intelligence Report Launch - National Media Campaign',
      intro: 'How a Threat Intelligence report became a national Cybersecurity moment',
      desc: 'Policy-level visibility achieved across mainstream and technical media. Coverage drove awareness among business leaders, IT professionals, and government stakeholders.',
      stats: [
        { value: '55+', label: 'Unique media stories (2 weeks post-launch)' },
        { value: '20M+', label: 'Estimated audience reach' },
        { value: '20+', label: 'Syndicated articles with tier-1 regional and business papers' },
        { value: '6', label: 'States with national and regional presence' },
      ],
      detailBlocks: [
        {
          title: 'The Challenge',
          bullets: [
            'Year 19 of a recurring annual report',
            'Elevated risk of media fatigue in a crowded threat intelligence landscape.',
            'Limited Australia-specific data reduced local relevance and required creative localisation of global findings.',
            'Media leaning towards paid or Govt affiliated research',
          ],
        },
        {
          title: 'The Approach',
          bullets: [
            'Secured a national newspaper exclusive to anchor the launch.',
            'Wired commentary through AAP for broad syndication.',
            'Repurposed core insights for niche verticals - SMBs, retail, government, corporate, and technical security audiences.',
            'Engaged independent academic voice for third-party validation, strengthening media trust and editorial appeal.',
            'Syndicated articles in regional and business press',
          ],
        },
        {
          title: 'The Delivery',
          bullets: [],
        },
      ],
      mediaPlacements: ['The Australian', 'AFR', 'AAP', 'Daily Telegraph', 'Herald Sun', 'Courier Mail', 'RiskyBiz', 'Security Brief', 'Information Age', 'Insurance Biz'],
    },
    {
      slug: 'identity-technology-expert',
      caseNumber: '02',
      client: 'Identity Technology Expert',
      title: 'Identity Technology Expert',
      tag: 'Digital Identity',
      sector: 'Digital Identity / Fraud Prevention',
      kicker: 'Brand Visibility - Thought Leadership',
      intro: 'Driving enterprise interest, industry trust, and national thought leadership visibility',
      desc: "Established the company as a credible, authoritative voice in digital identity and financial crime prevention. Whitepaper positioned the brand as a key stakeholder in Australia's National Identity Scheme, generating both enterprise and government leads.",
      stats: [
        { value: 'Tier 1', label: 'National and specialist coverage' },
        { value: 'B2B', label: 'Enterprise and government visibility' },
      ],
      detailBlocks: [
        {
          title: 'The Goals',
          bullets: [
            'Unify brand messaging across multiple acquisitions and establish a consistent market identity.',
            'Increase share of voice in digital identity, fraud prevention, and financial crime prevention sectors.',
            'Establish practice leads as subject matter experts across areas of SMB, AML, financial crime prevention and Digital Identity.',
          ],
        },
        {
          title: 'The Mandate',
          bullets: [
            'Secured high-impact coverage across Tier 1 and specialist technology publications to elevate brand voice.',
            'Layered media outreach with bylines, industry whitepapers and research reports to build sustained authority.',
            'Positioned the company as a central player in the National ID Scheme through targeted whitepaper content.',
          ],
        },
        {
          title: 'The Delivery',
          bullets: [
            'Regular feature and commentary placements across key trade and technology publications.',
            'Media workshops on key trends and regulatory updates.',
            'Demonstrated Australian activities and capabilities to business and government audiences.',
            'Whitepaper used as media briefing, lead generation and education tool for enterprise and government stakeholders.',
          ],
        },
      ],
      outcome: {
        title: 'Key Outcomes',
        body: "Established the company as a credible, authoritative voice in digital identity and financial crime prevention. Whitepaper positioned the brand as a key stakeholder in Australia's National Identity Scheme, generating both enterprise and government leads. Sustained media presence-built trust across B2B and government audiences.",
      },
      mediaPlacements: ['Cyber Daily', 'TechDay', 'Security Brief', 'Information Age', 'SmartCompany'],
    },
    {
      slug: 'australian-hyperscale-data-centre-company',
      caseNumber: '03',
      client: 'Australian Hyperscale Data Centre company',
      title: 'Australian Hyperscale Data Centre company',
      tag: 'Data Infrastructure',
      sector: 'Data Infrastructure / Sustainability / APAC',
      kicker: 'Infrastructure Launch - APAC Market Expansion - Sustainability Leadership - Industry Benchmarking',
      intro: 'From ground-up awareness to regional dominance: A multi-market hub strategy positioning a hyperscale pioneer at the intersection of tech and sustainability.',
      desc: 'Engaged from the company earliest growth phase, this long-term mandate spanned APAC market expansion, infrastructure launches, C-suite profiling, and sustainability milestones.',
      stats: [
        { value: 'APAC', label: 'Multi-market communications hub' },
        { value: '4+', label: 'Campus launches and market expansion moments' },
      ],
      detailBlocks: [
        {
          title: 'The Engagement',
          body: "Engaged from the company's earliest growth phase, this long-term mandate spanned APAC market expansion, infrastructure launches, C-suite profiling, and sustainability milestones.\n\nAt the outset, green financing, hyperscale infrastructure and power usage effectiveness (PUE) were largely absent from mainstream Australian business media.\n\nThe communications task required building awareness from the ground up in Australia: translating complex infrastructure into accessible narratives and identifying journalists with the credibility to cover the sector.\n\nAPAC responsibilities included managing communications across multiple market launches, collaborating with country-level business leaders, coordinating agency partners across five APAC markets, supporting executive interviews, commentaries, and profiling across regional and international media, and targeting relevant events and platforms for speaking opportunities for company leadership.",
        },
      ],
      milestoneBlocks: [
        {
          title: 'APAC Campus launches and Market expansion',
          bullets: [
            'Communications across campus openings, ground-breakings, and acquisitions - from the first Sydney facility through Tokyo, Hong Kong, Singapore, Johor Bahru, and beyond.',
            'Each launch required distinct messaging for local business, government, and technology audiences.',
          ],
        },
        {
          title: 'Sustainability Leadership and Investor Relations',
          bullets: [
            'Led communications for the Green Financing Framework and a landmark sustainability-linked loan, firmly establishing the company as the sector benchmark for responsible hyperscale growth.',
            'Strategy and messaging was crafted for institutional investors, ESG stakeholders, and infrastructure media - demonstrating that scale and sustainability reinforce, not contradict, each other.',
          ],
        },
        {
          title: 'Setting Industry Benchmarks and Media De-mystification',
          bullets: [
            'Positioned PUE metrics and operational standards as proof points of excellence.',
            'Delivered proactive media education - briefings and explainers - that brought data centre terminology into mainstream business press, building durable journalist understanding and long-term media equity for the sector.',
          ],
        },
        {
          title: 'Hub Agency: Japan, HK, Malaysia, Indonesia, Singapore',
          bullets: [
            'Acted as lead agency across five APAC markets - coordinating local agency partners, managing country business leaders, harmonising messaging frameworks, and handling regional media queries.',
            'Ensured brand consistency and communications quality across a complex, multi-jurisdiction footprint.',
          ],
        },
      ],
      mediaPlacements: ['AFR', 'The Australian', 'DC Dynamics', 'SMH', 'NHK Japan', 'Nikkei Asia', 'SCMP', 'Straits Times', 'Information Age', 'SmartCompany', 'InnovationAus', 'AAP'],
    },
    {
      slug: 'ai-ethics-enterprise-platform',
      caseNumber: '04',
      client: 'AI Ethics Enterprise platform',
      title: 'AI Ethics Enterprise platform',
      tag: 'Artificial Intelligence',
      sector: 'Artificial Intelligence / GovTech',
      kicker: 'National Market Launch - Government Growth - Go-to-Market Strategy and Media Campaign',
      intro: 'Putting ethics in the heart of AI',
      desc: 'AI ethics positioning anchored in policy-relevant moments created sustained media relevance beyond the launch window.',
      stats: [
        { value: 'Tier 1', label: 'AFR placement during national AI commentary' },
        { value: 'GovTech', label: 'Government and enterprise awareness' },
      ],
      detailBlocks: [
        {
          title: 'The Goals',
          bullets: [
            'Position the platform as the trusted partner for ethical AI and data-led transformation - credible, transparent, proven.',
            'Execute national launch; Build media visibility, thought leadership and support business team through content creation and case study for government client acquisition and private sector expansion.',
          ],
        },
        {
          title: 'The Mandate',
          bullets: [
            'Full go-to-market strategy: brand positioning, messaging framework, stakeholder mapping, competitor analysis, logo design, and messaging matrix.',
            'Localised brand positioning and go-to-market support including strategic media engagement.',
          ],
        },
        {
          title: 'The Delivery',
          bullets: [
            'Targeted media campaign with tailored pitching across Tier 1 outlets - AFR, ABC, SmartCompany, InnovationAus.',
            'Leveraged AI policy moments - government announcements, industry reports, federal budgets, and parliamentary audits - to inject client voice into live news cycles.',
          ],
        },
      ],
      outcome: {
        title: 'Key Outcomes',
        bullets: [
          'Secured placement in the Australian Financial Review as part of national AI commentary during the DeepSeek moment.',
          'Establishing the founding team as a trusted voice on AI governance. Feature coverage in InnovationAus, TechDay, and SmartCompany drove early awareness among target government and enterprise audiences.',
          'AI ethics positioning anchored in policy-relevant moments created sustained media relevance beyond the launch window.',
        ],
      },
      mediaPlacements: ['AFR', 'SmartCompany', 'Information Age', 'InnovationAus', 'TechDay', 'The Australian', 'ABC', 'Security Brief', 'Cyber Daily', 'AAP'],
    },
    {
      slug: 'leading-crypto-platform',
      caseNumber: '05',
      client: 'Leading Crypto Platform',
      title: 'Leading Crypto Platform',
      tag: 'Fintech',
      sector: 'Fintech / DeFi / Cryptocurrency',
      kicker: 'Seed Round Announcement - Capital Raise - Investor and Consumer Awareness Campaign - Crisis Campaign',
      intro: 'Securing market leadership and maintaining investor trust for a pioneering DeFi platform',
      desc: 'Spike in HNI registrations and heightened VC interest confirmed by client following first story break. 100% media relevancy score.',
      stats: [
        { value: '25', label: 'High-impact coverage hits (incl. syndications)' },
        { value: '12.7M+', label: 'Total audience reach' },
        { value: '167K+', label: 'Coverage views tracked' },
        { value: '230+', label: 'Cross-platform engagements' },
      ],
      detailBlocks: [
        {
          title: 'The Objectives',
          bullets: [
            'Generate credibility and awareness for a seed round led by global institutional investors.',
            'Position the platform as the pioneer of decentralised finance (DeFi) in the APAC region.',
            'Drive direct outcomes: HNI registrations, VC interest, and measurable website traffic growth.',
          ],
        },
        {
          title: 'The Approach',
          bullets: [
            'Big bang launch with a national broadsheet exclusive - introducing founders, investors, and growth narrative.',
            'Sustained B2B and trade media engagement across DeFi, crypto, BFSI, and fintech verticals with tailored messaging per audience.',
          ],
        },
        {
          title: 'The Delivery',
          body: '3-week campaign: bespoke messaging development, regular media desk briefings, collateral creation, executive media training, and focused outreach across all target verticals.',
        },
      ],
      outcome: {
        title: 'Crisis Management',
        body: 'Successfully managed the crypto crisis, where we steered their communications strategy, balancing timely customer updates with a proactive media program. Deepened relationship with senior economics, technology and business writers at AFR, The Australian and Sydney Morning Herald. Pro-active media engagement helped safeguard investor and customer trust and investments.',
      },
      resultNote: 'Spike in HNI registrations and heightened VC interest confirmed by client following first story break. 100% media relevancy score.',
      mediaPlacements: ['AFR', 'Startup Daily', 'Fintech News', 'Business Insider', 'Crypto News'],
    },
    {
      slug: 'australian-fintech-lender',
      caseNumber: '06',
      client: 'Australian Fintech Lender',
      title: 'Australian Fintech Lender',
      tag: 'Fintech',
      sector: 'Fintech / SME Lending',
      kicker: 'Capital Raise - SME Market Report Launch - Ongoing Retainer',
      intro: '',
      desc: 'Coverage drove direct engagement with finance brokers and SME owners, extending commercial impact beyond earned media.',
      stats: [
        { value: '35+', label: 'High-impact stories' },
        { value: '5.1M+', label: 'Total coverage reach' },
        { value: '95%', label: 'Media relevance score' },
        { value: '120+', label: 'Engagements across news and social' },
        { value: '43K', label: 'Estimated coverage views' },
      ],
      detailBlocks: [
        {
          title: 'The Context',
          bullets: [
            'The client secured a critical funding round, restoring market confidence with brokers, partners, and employees.',
            'Simultaneous annual SME market report provided a sustained platform for thought leadership and media engagement.',
          ],
        },
        {
          title: 'The Approach',
          bullets: [
            'Targeted media strategy tailored to distinct audiences: AFR for the capital raise; Tier 1 and Trade press for the SME report (observed platform-specific editorial policies).',
            'Engaged finance brokers, accountants, and industry associations alongside policymakers.',
            'Held media briefing sessions around Budget, FY ending and Trends',
          ],
        },
        {
          title: 'The Delivery',
          bullets: [
            'AFR exclusive coverage for the capital raise announcement.',
            'SME market report widely cited across top-tier trade and sector platforms.',
            'Enhanced relationships with senior fintech journalists - The Australian, SmartCompany, Startup Daily.',
          ],
        },
      ],
      resultNote: 'Coverage drove direct engagement with finance brokers and SME owners, extending commercial impact beyond earned media.',
      mediaPlacements: ['AFR', 'The Australian', 'SmartCompany', 'Startup Daily', 'The Adviser'],
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
      photo: '/images/team/bharat-joshi.png',
      bio: "10 years' experience across technology, fintech, energy, digital identity, infrastructure and public sector. Led programs for Verizon, GBG, Healthdirect, AirTrunk and AtomEthics at executive and regulatory level.",
    },
    {
      initials: 'HJ',
      name: 'Harshit Jain',
      role: 'Co-Founder - Mumbai, India',
      photo: '/images/team/harshit-jain.png',
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
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Sectors', href: '/#sectors' },
    { label: 'Work', href: '/work' },
    { label: 'Team', href: '/#team' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;
