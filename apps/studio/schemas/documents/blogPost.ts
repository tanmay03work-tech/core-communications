import {defineArrayMember, defineField, defineType} from 'sanity';
import type {ModularSection} from '../sections';
import type {SanityImageValue, SanitySlugValue} from '../sections/shared';
import type {Seo} from '../objects/seo';
import {SmartImageInput} from '../../components/SmartImageInput';

export interface BlogPost {
  _id?: string;
  _type: 'blogPost';
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  title: string;
  slug?: SanitySlugValue;
  category: string;
  excerpt: string;
  author?: string;
  authorRole?: string;
  readTime?: string;
  storyLead?: string;
  keyTakeaways?: string[];
  bodyContent?: import('../objects/blockContent').BlockContentValue;
  sections?: ModularSection[];
  coverImage?: SanityImageValue;
  publishedAt?: string;
  featured?: boolean;
  seo?: Seo;
}

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  orderings: [
    {
      title: 'Published date, newest',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(4).max(130),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, ''),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Strategy', value: 'Strategy'},
          {title: 'Media Relations', value: 'Media Relations'},
          {title: 'B2B PR', value: 'B2B PR'},
          {title: 'Digital Visibility', value: 'Digital Visibility'},
          {title: 'AI & Search', value: 'AI & Search'},
          {title: 'Market Insight', value: 'Market Insight'},
        ],
      },
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary used on listing cards and metadata.',
      validation: (rule) => rule.required().min(30).max(260),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: 'authorRole',
      title: 'Author role',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'authorUrl',
      title: 'Author Social / Website Link',
      type: 'string',
      description: 'Author LinkedIn profile, X profile, or website URL',
    }),
    defineField({
      name: 'readTime',
      title: 'Read time',
      type: 'string',
      description: 'Example: 6 min read',
      validation: (rule) => rule.max(24),
    }),
    defineField({
      name: 'storyLead',
      title: 'Story lead',
      type: 'text',
      rows: 4,
      description: 'Narrative opening shown near the top of the article page.',
      validation: (rule) => rule.max(520),
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key takeaways',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 2})],
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: 'bodyContent',
      title: 'Body content',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections (Advanced)',
      type: 'array',
      of: [
        defineArrayMember({type: 'heroSection'}),
        defineArrayMember({type: 'textSection'}),
        defineArrayMember({type: 'statsSection'}),
        defineArrayMember({type: 'gallerySection'}),
        defineArrayMember({type: 'mediaCoverageSection'}),
        defineArrayMember({type: 'quoteSection'}),
        defineArrayMember({type: 'ctaSection'}),
        defineArrayMember({type: 'splitContentSection'}),
        defineArrayMember({type: 'logoCloudSection'}),
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image & Infographic',
      type: 'image',
      options: {hotspot: true},
      components: {
        input: SmartImageInput,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.max(160),
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'downloadableResources',
      title: 'Downloadable Resources & Guides',
      type: 'array',
      description: 'PDFs, guides, whitepapers, or resources available for readers.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'resource',
          title: 'Resource',
          fields: [
            defineField({
              name: 'title',
              title: 'Resource Title',
              type: 'string',
              description: 'Title of the guide or document (e.g. Crisis Communications Playbook)',
              validation: (rule) => rule.required().min(2).max(120),
            }),
            defineField({
              name: 'fileAsset',
              title: 'Upload File Directly (PDF, DOCX, ZIP, etc.)',
              type: 'file',
              description: '📁 Drag & drop or click to upload your PDF, Whitepaper, or Guide directly from your device.',
              options: {
                storeOriginalFilename: true,
              },
            }),
            defineField({
              name: 'fileUrl',
              title: 'Or External Link / Google Drive URL',
              type: 'string',
              description: 'Direct link, PDF URL, or Google Drive / Dropbox link (used if no file uploaded above).',
            }),
            defineField({
              name: 'description',
              title: 'Short Description',
              type: 'text',
              rows: 2,
              description: 'Brief overview of what readers will learn in this resource.',
            }),
            defineField({
              name: 'fileSize',
              title: 'File Size / Format Label',
              type: 'string',
              description: 'Example: PDF • 2.4 MB (Auto-generated if left blank).',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              fileUrl: 'fileUrl',
              fileName: 'fileAsset.asset.originalFilename',
              fileSize: 'fileSize',
            },
            prepare({title, fileUrl, fileName, fileSize}) {
              return {
                title: title || fileName || 'Untitled Resource',
                subtitle: fileSize || fileName || fileUrl || 'File Resource',
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'relatedLinks',
      title: 'Related Links & Further Reading',
      type: 'array',
      description: 'Curated external or internal links for this article.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'linkItem',
          title: 'Link Item',
          fields: [
            defineField({name: 'label', title: 'Link Label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.required()}),
            defineField({name: 'description', title: 'Description', type: 'string'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
      featured: 'featured',
    },
    prepare({title, subtitle, media, featured}) {
      return {
        title,
        subtitle: featured ? `${subtitle} - Featured` : subtitle,
        media,
      };
    },
  },
});

export default blogPost;
