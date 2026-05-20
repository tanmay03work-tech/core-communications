import {defineArrayMember, defineField, defineType} from 'sanity';

export interface PortableTextLinkMark {
  _key?: string;
  _type: 'link';
  href: string;
}

export interface PortableTextSpan {
  _key?: string;
  _type: 'span';
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _key?: string;
  _type: 'block';
  style?: string;
  children: PortableTextSpan[];
  markDefs?: PortableTextLinkMark[];
}

export interface PortableTextImage {
  _key?: string;
  _type: 'image';
  asset?: {
    _type: 'reference';
    _ref: string;
  };
  alt?: string;
  caption?: string;
}

export interface PortableTextCallout {
  _key?: string;
  _type: 'callout';
  title?: string;
  body: string;
  tone?: 'info' | 'success' | 'warning';
}

export type BlockContentValue = Array<
  PortableTextBlock | PortableTextImage | PortableTextCallout
>;

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (rule) =>
                  rule.required().uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          validation: (rule) => rule.max(180),
        }),
      ],
      preview: {
        select: {
          title: 'caption',
          media: 'asset',
        },
        prepare({title, media}) {
          return {
            title: title || 'Image',
            media,
          };
        },
      },
    }),
    defineArrayMember({
      name: 'callout',
      title: 'Callout',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.max(100),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required().max(400),
        }),
        defineField({
          name: 'tone',
          title: 'Tone',
          type: 'string',
          initialValue: 'info',
          options: {
            list: [
              {title: 'Info', value: 'info'},
              {title: 'Success', value: 'success'},
              {title: 'Warning', value: 'warning'},
            ],
            layout: 'radio',
          },
        }),
      ],
      preview: {
        select: {
          title: 'title',
          subtitle: 'body',
        },
        prepare({title, subtitle}) {
          return {
            title: title || 'Callout',
            subtitle,
          };
        },
      },
    }),
  ],
});

export default blockContent;
