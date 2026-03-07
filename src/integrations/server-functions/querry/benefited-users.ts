import { db } from "@/db";
import { BenefitedUserTable, UserTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, getTableColumns } from "drizzle-orm";

export const getAllBenefitedUsersServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const { name, oauthProviderAvatarImageUrl, uploadedAvatarImageUrl } =
    getTableColumns(UserTable);
  const { userEmail } = getTableColumns(BenefitedUserTable);

  const users = await db
    .select({
      name,
      email: userEmail,
      imageUrl: uploadedAvatarImageUrl ?? oauthProviderAvatarImageUrl,
    })
    .from(BenefitedUserTable)
    .innerJoin(UserTable, eq(BenefitedUserTable.userEmail, UserTable.email));

  return users;
});
