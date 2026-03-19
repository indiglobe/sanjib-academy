import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(3, "First name is too small."),
  lastName: z.string().min(3, "Last name is too small."),
  email: z.email("Please provide valid email."),
  phoneNo: z.string().length(10, "Phone no has to be 10 character long"),
  message: z.string().min(20, "Message is too small"),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

export const signinSearchParams = z.object({
  callbackUrl: z.string().catch("").optional(),
  initiator: z.enum(["landing-page"]).catch("landing-page").optional(),
});

export type SigninSearchParams = z.infer<typeof signinSearchParams>;
