import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(254, "Email is too long"),
  company: z
    .string()
    .trim()
    .max(120, "Company must be 120 characters or fewer")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(2000, "Message must be 2000 characters or fewer")
    .optional()
    .or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

export function sanitizeContactPayload(data) {
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    company: data.company?.trim() || null,
    message: data.message?.trim() || null,
  };
}
