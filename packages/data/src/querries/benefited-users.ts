import { db } from "@/index";
import { BenefitedUserTable, UserTable } from "@/schema";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const readAllBenefitedUsers = async () => {
  const {
    name,
    oauthProviderAvatarImageUrl,
    uploadedAvatarImageUrl,
    tableIdentifierToken: userTableIdentifierToken,
  } = getTableColumns(UserTable);

  const { userEmail, tableIdentifierToken: benefitedUserTableIdentifierToken } =
    getTableColumns(BenefitedUserTable);

  const users = await db
    .select({
      name,
      email: userEmail,
      imageUrl: sql<string>`coalesce(${uploadedAvatarImageUrl}, ${oauthProviderAvatarImageUrl})`,
      userTableIdentifierToken,
      benefitedUserTableIdentifierToken,
    })
    .from(BenefitedUserTable)
    .innerJoin(UserTable, eq(BenefitedUserTable.userEmail, UserTable.email));

  return users;
};
