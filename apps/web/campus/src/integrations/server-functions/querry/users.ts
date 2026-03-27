import { createServerFn } from "@tanstack/react-start";
import { readUserDetails, createNewUser } from "@repo/data/querries/users";

export const readUserDetailsServerFn = createServerFn()
  .inputValidator((d: { email: string }) => d)
  .handler(async ({ data: { email } }) => {
    const user = readUserDetails({ email });

    return user;
  });

export const createNewUserServerFn = createServerFn()
  .inputValidator((d: { email: string }) => d)
  .handler(async ({ data: { email } }) => {
    const user = await createNewUser({
      email,
      name,
      oauthProviderAvatarImageUrl,
    });

    return user;
  });
