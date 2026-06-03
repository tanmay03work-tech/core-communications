import { ABOUT, SECTORS, SERVICES, SITE, TEAM } from '@/lib/constants';

export type AboutMetric = {
  value: string;
  label: string;
  detail: string;
};

export type AboutStoryBeat = {
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
};

export type AboutPrinciple = {
  title: string;
  description: string;
};

export type AboutTimelineEntry = {
  year: string;
  title: string;
  detail: string;
};

export const aboutData = {
  tag: ABOUT.tag,
  intro: {
    lead: SITE.description,
    title: ABOUT.heading.replace(/<[^>]+>/g, ''),
    body: ABOUT.paragraphs,
  },
  whyCoreExists: {
    label: ABOUT.tag,
    title: ABOUT.paragraphs[0],
    body: ABOUT.paragraphs[2],
  },
  metrics: [
    {
      value: '15+',
      label: 'Years APAC media relationships',
      detail: ABOUT.paragraphs[1],
    },
    {
      value: '3',
      label: 'Sydney, Australia / Mumbai, India / New Delhi, India',
      detail: SITE.description,
    },
    {
      value: '4',
      label: 'Cybersecurity / Identity & IAM / Healthtech / XaaS Platforms',
      detail: ABOUT.paragraphs[0],
    },
    {
      value: '2025',
      label: 'Founded in 2025',
      detail: ABOUT.paragraphs[2],
    },
  ] satisfies AboutMetric[],
  expertiseStrip: SECTORS.items
    .filter((item) => item.active)
    .map((item) => item.label),
  storyBeats: [
    {
      eyebrow: '01',
      title: ABOUT.pillars[0].title,
      body: ABOUT.pillars[0].text,
      accent: ABOUT.pillars[0].title,
    },
    {
      eyebrow: '02',
      title: ABOUT.pillars[1].title,
      body: ABOUT.pillars[1].text,
      accent: ABOUT.pillars[1].title,
    },
    {
      eyebrow: '03',
      title: ABOUT.pillars[2].title,
      body: ABOUT.pillars[2].text,
      accent: ABOUT.pillars[2].title,
    },
  ] satisfies AboutStoryBeat[],
  principles: ABOUT.pillars.map((pillar) => ({
    title: pillar.title,
    description: pillar.text,
  })) satisfies AboutPrinciple[],
  founder: {
    label: TEAM.tag,
    quote: TEAM.members[0].bio,
    attribution: `${TEAM.members[0].name} / ${TEAM.members[0].role}`,
    body: TEAM.members[1].bio,
  },
  timelineLabel: SERVICES.tag,
  timelineTitle: SERVICES.heading.replace(/<[^>]+>/g, ''),
  timelineIntro: SERVICES.subtitle,
  timeline: SERVICES.items.slice(0, 3).map((item) => ({
    year: item.num,
    title: item.title,
    detail: item.desc,
  })) satisfies AboutTimelineEntry[],
  stripLabel: SECTORS.tag,
  principlesLabel: ABOUT.tag,
} as const;
