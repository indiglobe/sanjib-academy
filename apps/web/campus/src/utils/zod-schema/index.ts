import { z } from "zod";
import { FileRouteTypes } from "@/routeTree.gen";

export const contactFormSchema = z.object({
  firstName: z.string().min(3, "First name is too small."),
  lastName: z.string().min(3, "Last name is too small."),
  email: z.email("Please provide valid email."),
  phoneNo: z.string().length(10, "Phone no has to be 10 character long"),
  message: z.string().min(20, "Message is too small"),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

export const welcomeFormSchema = z.object({
  email: z.email("Please provide valid email."),
  name: z.string().min(3, "Name is too small."),
  avatarImageUrl: z.url("Provide a valid url"),
  age: z.number().min(18, "Minimum age has to be 18."),
});

export type WelcomeFormSchema = z.infer<typeof welcomeFormSchema>;

export type TRedirectUrl = FileRouteTypes["to"];

export const signinSearchParams = z.object({
  callbackUrl: z
    .custom<TRedirectUrl>()
    .catch("/redirect-signin")
    .default("/redirect-signin")
    .optional(),

  initiator: z
    .enum([
      "landing-page",
      "webinar-register",
      "course-register",
      "authenticated-routes",
    ])
    .catch("landing-page")
    .optional(),

  redirectUrl: z.custom<TRedirectUrl>().or(z.custom<string & {}>()),

  requestInitiatedFrom: z.string().optional(),
});

export type SigninSearchParams = z.infer<typeof signinSearchParams>;

export type RedirectSigninSearchParams = Partial<
  Omit<SigninSearchParams, "callbackUrl">
>;

export const redirectSigninSearchParams =
  z.custom<RedirectSigninSearchParams>();

export const registerForWebinarInputValidator = z.object({
  amount: z.object({
    rupee: z.number(),
    paise: z.number(),
  }),
  webinarDetails: z.object({ id: z.number() }),
});

export const courseEnrolmentInputValidator = z.object({
  amount: z.object({
    rupee: z.number(),
    paise: z.number(),
  }),

  courseDetails: z.enum([
    "fno-hedging",
    "fundamental-analysis",
    "institutional-trading",
  ]),

  requestInitiatedFrom: z.string(),
});

export type TCourseEnrolmentInputValidator = z.infer<
  typeof courseEnrolmentInputValidator
>;
