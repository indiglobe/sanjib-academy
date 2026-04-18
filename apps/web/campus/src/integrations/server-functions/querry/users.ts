import { createServerFn } from "@tanstack/react-start";
import { createNewUser, readUserDetails } from "@repo/data/querries/users";
import { WelcomeFormSchema } from "@repo/utils/zod-schema/welcome-form";
import z from "zod";
import { zodValidator } from "@tanstack/zod-adapter";

export const readUserDetailsServerFn = createServerFn()
  .inputValidator((d: { email: string }) => d)
  .handler(async ({ data: { email } }) => {
    const user = readUserDetails({ email });

    return user;
  });

export const createNewUserServerFn = createServerFn()
  .inputValidator(zodValidator(z.custom<WelcomeFormSchema>()))
  .handler(async ({ data: { email, avatarImageUrl, name } }) => {
    const user = await createNewUser({
      email,
      name,
      oauthProviderAvatarImageUrl: avatarImageUrl,
      uploadedAvatarImageUrl: avatarImageUrl,
    });
    return user;
  });
