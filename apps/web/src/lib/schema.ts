import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters.'),
  email: z.string().trim().email('A valid email is required.'),
  message: z.string().trim().optional().default(''),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormData = z.output<typeof contactFormSchema>;

export const contactSubmissionSchema = contactFormSchema.extend({
  turnstileToken: z.string().trim().optional().default(''),
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
