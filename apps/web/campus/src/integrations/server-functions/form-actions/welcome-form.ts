import { welcomeFormSchema } from "@repo/utils/zod-schema/welcome-form";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { createNewUserServerFn } from "../querry/users";
import { createNewProfileServerFn } from "../querry/profile";
import { redirect } from "@tanstack/react-router";
import { generateUserNameFromEmail } from "@repo/utils/utility";

export const submitWelcomeFormServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(welcomeFormSchema))
  .handler(async ({ data }) => {
    const { phone, email, ...rest } = data;

    await createNewUserServerFn({ data });

    await createNewProfileServerFn({
      data: { phoneNo: phone.toString(), email, ...rest },
    });

    throw redirect({
      to: "/$username/dashboard",
      params: { username: generateUserNameFromEmail(email) },
    });
  });
