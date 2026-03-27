import { welcomeFormSchema } from "@repo/utils/zod-schema/welcome-form";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { createNewUserServerFn } from "../querry/users";

export const submitWelcomeFormServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(welcomeFormSchema))
  .handler(async ({ data, context }) => {
    const newUser = await createNewUserServerFn({ data });
  });
