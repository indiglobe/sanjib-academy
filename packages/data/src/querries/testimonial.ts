import { TestimonialsTable, UserTable } from "@/schema";
import { db } from "..";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const getAllTestimonials = async () => {
  const {
    email,
    name,
    oauthProviderAvatarImageUrl,
    uploadedAvatarImageUrl,
    tableIdentifierToken: userTableIdentifierToken,
  } = getTableColumns(UserTable);
  const {
    testimonialText,
    authorSocialHandle,
    id,
    tableIdentifierToken: testimonialTableIdentifierToken,
  } = getTableColumns(TestimonialsTable);

  const data = await db
    .select({
      email,
      name,
      avatar: sql<string>`COALESCE(${uploadedAvatarImageUrl}, ${oauthProviderAvatarImageUrl})`,
      userTableIdentifierToken,
      testimonialText,
      testimonialTableIdentifierToken,
      id,
      authorSocialHandle,
    })
    .from(TestimonialsTable)
    .innerJoin(UserTable, eq(TestimonialsTable.authorEmail, UserTable.email));

  if (data.length === 0) return null;

  return data;
};
