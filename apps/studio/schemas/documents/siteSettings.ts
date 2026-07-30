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
  label?: string;
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
  websiteUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
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
      name: 'websiteUrl',
      title: 'Main Website URL',
      type: 'string',
      description: 'Official website address (e.g. https://www.corecommunication.biz)',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn Company Page URL',
      type: 'string',
      description: 'Official LinkedIn company or profile URL',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter / X Profile URL',
      type: 'string',
      description: 'Official Twitter / X profile URL',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Profile URL',
      type: 'string',
      description: 'Official Instagram profile URL',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Additional Social & Web Links',
      type: 'array',
      description: 'Add any extra social channels or external website links here.',
      of: [
        defineArrayMember({
          name: 'socialLink',
          title: 'Social & Web Link',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform / Channel Name',
              type: 'string',
              description: 'Select or enter platform name (e.g. LinkedIn, Twitter / X, Instagram, Medium)',
              options: {
                list: [
                  {title: 'LinkedIn', value: 'LinkedIn'},
                  {title: 'Twitter / X', value: 'Twitter'},
                  {title: 'Instagram', value: 'Instagram'},
                  {title: 'Facebook', value: 'Facebook'},
                  {title: 'YouTube', value: 'YouTube'},
                  {title: 'Medium', value: 'Medium'},
                  {title: 'Substack', value: 'Substack'},
                  {title: 'GitHub', value: 'GitHub'},
                  {title: 'Company Website', value: 'Website'},
                  {title: 'Other Link', value: 'Other'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link URL',
              type: 'string',
              description: 'Target website or profile URL (e.g. https://linkedin.com/company/...)',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Display Label (Optional)',
              type: 'string',
              description: 'Custom button or text label (e.g. Follow us on LinkedIn)',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              platform: 'platform',
              subtitle: 'url',
            },
            prepare({title, platform, subtitle}) {
              return {
                title: title || platform || 'Social Link',
                subtitle: subtitle || '',
              };
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
