import { contactFormSchema } from "@/utils/zod-schema";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { middleware__isUserSigninedIn } from "@/middleware/check-user";
import { create__ContactMessageServerFn } from "../querry/contact-message";

export const create__NewContactMessageServerFn = createServerFn({
  method: "POST",
})
  .middleware([middleware__isUserSigninedIn])
  .inputValidator(zodValidator(contactFormSchema))
  .handler(async ({ data, context }) => {
    // rename vaiable
    const { userSignnedIn: isVerified } = context;

    return await create__ContactMessageServerFn({
      data: { isVerified, ...data },
    });
  });
