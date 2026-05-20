import { z } from 'zod';

export const contactServiceOptions = [
  'Media Relations',
  'Thought Leadership',
  'Digital PR & GEO',
  'Influencer & KOL Outreach',
  'Crisis & Issues Management',
  'India-Australia Corridor',
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters.'),
  email: z.string().trim().email('A valid email is required.'),
  company: z.string().trim().optional().default(''),
  service: z.enum(contactServiceOptions, {
    errorMap: () => ({ message: 'Please select a service.' }),
  }),
  message: z.string().trim().min(20, 'Message must be at least 20 characters.'),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormData = z.output<typeof contactFormSchema>;
export type ContactService = (typeof contactServiceOptions)[number];

export const contactSubmissionSchema = contactFormSchema.extend({
  turnstileToken: z.string().trim().min(1, 'Turnstile verification is required.'),
});

export type ContactSubmissionInput = z.input<typeof contactSubmissionSchema>;
export type ContactSubmissionData = z.output<typeof contactSubmissionSchema>;

export type ContactApiSuccessResponse = {
  ok: true;
  message: string;
};

export type ContactApiErrorResponse = {
  ok: false;
  message: string;
  errors?: Partial<Record<keyof ContactSubmissionInput, string[]>>;
};

export type ContactApiResponse = ContactApiSuccessResponse | ContactApiErrorResponse;

export function validateContactFormInput(input: unknown) {
  return contactFormSchema.safeParse(input);
}

export function validateContactSubmission(input: unknown) {
  return contactSubmissionSchema.safeParse(input);
}
