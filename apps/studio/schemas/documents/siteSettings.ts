import {defineArrayMember, defineField, defineType} from 'sanity';

export interface HeroMetric {
  _key?: string;
  _type: 'heroMetric';
  value: string;
  label: string;
}

export interface SocialLink {
  _key?: string;
  _type: 'socialLink';
  platform: string;
  url: string;
}

export interface SiteSettings {
  _id?: string;
  _type: 'siteSettings';
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  tagline?: string;
  heroMorphWords?: string[];
  heroMetrics?: HeroMetric[];
  clients?: string[];
  contactEmail?: string;
  phone?: string;
  sydneyAddress?: string;
  mumbaiAddress?: string;
  newDelhiAddress?: string;
  socialLinks?: SocialLink[];
  seo?: {
    _type?: 'seo';
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: {
      _type?: 'image';
      asset?: {
        _type?: 'reference';
        _ref?: string;
      };
    };
  };
  pageSeo?: {
    about?: SiteSettings['seo'];
    services?: SiteSettings['seo'];
    work?: SiteSettings['seo'];
    contact?: SiteSettings['seo'];
  };
}

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (rule) => rule.required().min(8).max(160),
    }),
    defineField({
      name: 'heroMorphWords',
      title: 'Hero morph words',
      type: 'array',
      initialValue: ['clarity', 'credibility', 'cut-through'],
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(2).max(8),
    }),
    defineField({
      name: 'heroMetrics',
      title: 'Hero metrics',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'heroMetric',
          title: 'Hero metric',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (rule) => rule.required().max(30),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required().max(80),
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'clients',
      title: 'Clients',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.max(20),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'sydneyAddress',
      title: 'Sydney address',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'mumbaiAddress',
      title: 'Mumbai address',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'newDelhiAddress',
      title: 'New Delhi address',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'socialLink',
          title: 'Social link',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'seo',
      description: 'Default metadata used across the website, including the root layout.',
    }),
    defineField({
      name: 'pageSeo',
      title: 'Page SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'about',
          title: 'About page SEO',
          type: 'seo',
        }),
        defineField({
          name: 'services',
          title: 'Services page SEO',
          type: 'seo',
        }),
        defineField({
          name: 'work',
          title: 'Work page SEO',
          type: 'seo',
        }),
        defineField({
          name: 'contact',
          title: 'Contact page SEO',
          type: 'seo',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});

export default siteSettings;
