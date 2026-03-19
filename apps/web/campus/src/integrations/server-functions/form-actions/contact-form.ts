import { contactFormSchema } from "@/utils/zod-schema";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { insertNewContactMessage } from "@repo/data/querries/contact-message";
import { isVerifiedUserMiddleware } from "@/middleware/auth";

export const insertNewContactMessageServerFn = createServerFn({
  method: "POST",
})
  .middleware([isVerifiedUserMiddleware])
  .inputValidator(zodValidator(contactFormSchema))
  .handler(async ({ data, context }) => {
    const { email, firstName, lastName, message, phoneNo } = data;

    const { isVerified } = context;

    return await insertNewContactMessage({
      email,
      firstName,
      lastName,
      message,
      phoneNo,
      isVerified,
    });
  });
