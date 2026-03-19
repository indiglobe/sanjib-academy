import { db } from "@/index";
import { BenefitedUserTable, UserTable } from "@/schema";
import { eq, getTableColumns } from "drizzle-orm";

export const getAllBenefitedUsers = async () => {
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
};
