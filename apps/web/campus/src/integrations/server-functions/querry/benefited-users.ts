import { createServerFn } from "@tanstack/react-start";
import { readAllBenefitedUsers } from "@repo/data/querries/benefited-users";

export const readAllBenefitedUsersServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const users = await readAllBenefitedUsers();

  return users;
});
