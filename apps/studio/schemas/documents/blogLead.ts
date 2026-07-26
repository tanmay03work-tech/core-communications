import {defineField, defineType} from 'sanity';

export const blogLead = defineType({
  name: 'blogLead',
  title: 'Blog Lead Submissions',
  type: 'document',
  orderings: [
    {
      title: 'Submission Date, Newest',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blogTitle',
      title: 'Blog Article Title',
      type: 'string',
    }),
    defineField({
      name: 'blogSlug',
      title: 'Blog Article Slug',
      type: 'string',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      blog: 'blogTitle',
    },
    prepare({title, subtitle, blog}) {
      return {
        title: `${title} (${subtitle})`,
        subtitle: blog ? `Article: ${blog}` : 'General Blog Access',
      };
    },
  },
});

export default blogLead;
