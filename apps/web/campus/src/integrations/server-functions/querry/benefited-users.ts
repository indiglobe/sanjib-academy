import { createServerFn } from "@tanstack/react-start";
import { getAllBenefitedUsers } from "@repo/data/querries/benefited-users";

export const getAllBenefitedUsersServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const users = await getAllBenefitedUsers();

  return users;
});
