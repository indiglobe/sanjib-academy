import { createServerFn } from "@tanstack/react-start";
import { getUserDetails } from "@repo/data/querries/users";

export const getUserDetailsServerFn = createServerFn()
  .inputValidator((d: { email: string }) => d)
  .handler(async ({ data: { email } }) => {
    const user = getUserDetails({ email });

    return user;
  });
