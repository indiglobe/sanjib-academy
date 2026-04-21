import { contactFormSchema } from "@/utils/zod-schema";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { create__NewContactMessage } from "@repo/data/querries/contact-message";
import { isUserSigninedInMiddleware } from "@/middleware/check-user";

export const create__NewContactMessageServerFn = createServerFn({
  method: "POST",
})
  .middleware([isUserSigninedInMiddleware])
  .inputValidator(zodValidator(contactFormSchema))
  .handler(async ({ data, context }) => {
    const { email, firstName, lastName, message, phoneNo } = data;

    const { userSignnedIn } = context;

    return await create__NewContactMessage({
      email,
      firstName,
      lastName,
      message,
      phoneNo,
      isVerified: userSignnedIn,
    });
  });
