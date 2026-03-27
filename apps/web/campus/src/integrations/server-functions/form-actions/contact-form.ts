import { contactFormSchema } from "@/utils/zod-schema";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { createNewContactMessage } from "@repo/data/querries/contact-message";
import { isUserSigninedInMiddleware } from "@/middleware/check-user";

export const createNewContactMessageServerFn = createServerFn({
  method: "POST",
})
  .middleware([isUserSigninedInMiddleware])
  .inputValidator(zodValidator(contactFormSchema))
  .handler(async ({ data, context }) => {
    const { email, firstName, lastName, message, phoneNo } = data;

    const { userSignnedIn } = context;

    return await createNewContactMessage({
      email,
      firstName,
      lastName,
      message,
      phoneNo,
      isVerified: userSignnedIn,
    });
  });
