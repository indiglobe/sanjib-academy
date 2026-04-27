import { z } from "zod";
import { FileRouteTypes } from "@/routeTree.gen";

/**
 * This schema is To validate the contact form content
 */
export const contactFormSchema = z.object({
  firstName: z.string().min(3, "First name is too small."),
  lastName: z.string().min(3, "Last name is too small."),
  email: z.email("Please provide valid email."),
  phoneNo: z.string().length(10, "Phone no has to be 10 character long"),
  message: z.string().min(20, "Message is too small"),
});

/**
 * Inferred type for contact form schema
 */
export type ContactFormSchema = z.infer<typeof contactFormSchema>;

/**
 * This schema is To validate the welcome form content
 */
export const welcomeFormSchema = z.object({
  email: z.email("Please provide valid email."),
  name: z.string().min(3, "Name is too small."),
  avatarImageUrl: z.url("Provide a valid url"),
  age: z.number().min(18, "Minimum age has to be 18."),
});

/**
 * Inferred type for welcome form schema
 */
export type WelcomeFormSchema = z.infer<typeof welcomeFormSchema>;

/**
 * Allowed URLs by the framework
 */
export type TRedirectUrl = FileRouteTypes["to"];

/**
 * Search params allowed for the signin page
 */
export const signinSearchParams = z.object({
  /**
   * The URL where the user should go after a successful signin
   * @default `/redirect-signin`
   */
  callbackUrl: z
    .custom<TRedirectUrl>()
    .catch("/redirect-signin")
    .default("/redirect-signin")
    .optional(),
  /**
   * Some predefined initiator, Based on this the content of the sign in page can change
   */
  initiator: z
    .enum([
      "landing-page",
      "webinar-register",
      "course-register",
      "authenticated-routes",
    ])
    .catch("landing-page")
    .optional(),
  /**
   * After a successful signin, some tasks are performed, After those tasks performed,
   * where the user should be redirected to
   */
  redirectUrl: z.union([z.custom<TRedirectUrl>(), z.url()]),
  /**
   * The URL from where request is initiated
   */
  requestInitiatedFrom: z.string().optional(),
});

/**
 * Inferred type for signin search schema
 */
export type SigninSearchParams = z.infer<typeof signinSearchParams>;

/**
 * Search params for the page, where a successful signin redirects to
 */
export const redirectSigninSearchParams = signinSearchParams
  .omit({ callbackUrl: true })
  .partial()
  .strict();

/**
 * Inferred type for search params of redirected page after successful signin
 */
export type RedirectSigninSearchParams = Partial<
  Omit<SigninSearchParams, "callbackUrl">
>;

/**
 * Amount format
 */
const amount = z.object({
  rupee: z.number(),
  paise: z.number(),
});

export const registerForWebinarInputValidator = z.object({
  amount: amount,
  /**
   * Details of the webinar
   */
  webinarDetails: z.object({ id: z.number() }),
  /**
   * The URL from where request is initiated
   */
  requestInitiatedFrom: z.url(),
});

/**
 * inferred type for register webinar input validator
 */
export type TRegisterForWebinarInputValidator = z.infer<
  typeof registerForWebinarInputValidator
>;

export const courseEnrolmentInputValidator = z.object({
  amount: amount,
  /**
   * Details of the course
   */
  courseDetails: z.object({ id: z.string() }),
  /**
   * The URL from where request is initiated
   */
  requestInitiatedFrom: z.string(),
});

/**
 * inferred type for course enrolment input validator
 */
export type TCourseEnrolmentInputValidator = z.infer<
  typeof courseEnrolmentInputValidator
>;

/**
 * Search params allowed for the `course-video` page
 */
export const courseVideoRouteSearchParams = z.object({
  source: z.url(),
});

/**
 * Inferred type for `course-video` search schema
 */
export type CourseVideoRouteSearchParams = z.infer<
  typeof courseVideoRouteSearchParams
>;
