import { db } from "@/index";
import { TestimonialsTable, UserTable, TableIdentifierToken } from "@/schema";
import { eq, getTableColumns } from "drizzle-orm";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "TMNL";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__Testimonial = Omit<
  typeof TestimonialsTable.$inferInsert,
  "id" | "tableIdentifierToken"
>;

export const create__Testimonial = async ({
  testimonialText,
  authorEmail,
  authorSocialHandle,
}: TCreate__Testimonial) => {
  await db.insert(TestimonialsTable).values({
    testimonialText,
    authorEmail,
    authorSocialHandle,
  });

  return {
    testimonialText,
    authorEmail,
    authorSocialHandle,
    tableIdentifierToken,
  } satisfies Omit<typeof TestimonialsTable.$inferInsert, "id">;
};

/**
 * ----------------------------------------
 * READ (ALL - YOUR LOCKED SHAPE)
 * ----------------------------------------
 */

export const read__AllTestimonials = async () => {
  const {
    email,
    name,
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
      userTableIdentifierToken,
      testimonialText,
      testimonialTableIdentifierToken,
      id,
      authorSocialHandle,
      uploadedAvatarImageUrl,
    })
    .from(TestimonialsTable)
    .innerJoin(UserTable, eq(TestimonialsTable.authorEmail, UserTable.email));

  return data;
};

/**
 * ----------------------------------------
 * READ (BY ID - SAME SHAPE)
 * ----------------------------------------
 */

export type TRead__OneTestimonial = {
  identifier: Required<{
    id: (typeof TestimonialsTable.$inferSelect)["id"];
  }>;
};

export const read__OneTestimonial = async ({
  identifier,
}: TRead__OneTestimonial) => {
  const {
    email,
    name,
    uploadedAvatarImageUrl,
    tableIdentifierToken: userTableIdentifierToken,
  } = getTableColumns(UserTable);

  const {
    testimonialText,
    authorSocialHandle,
    id,
    tableIdentifierToken: testimonialTableIdentifierToken,
  } = getTableColumns(TestimonialsTable);

  const [row] = await db
    .select({
      email,
      name,
      userTableIdentifierToken,
      testimonialText,
      testimonialTableIdentifierToken,
      id,
      authorSocialHandle,
      uploadedAvatarImageUrl,
    })
    .from(TestimonialsTable)
    .innerJoin(UserTable, eq(TestimonialsTable.authorEmail, UserTable.email))
    .where(eq(TestimonialsTable.id, identifier.id))
    .limit(1);

  return row ? row : null;
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

export type TUpdate__Testimonial = {
  identifier: Required<{
    id: (typeof TestimonialsTable.$inferSelect)["id"];
  }>;

  dataToUpdate: Partial<
    Omit<
      typeof TestimonialsTable.$inferInsert,
      "tableIdentifierToken" | "id" | "authorEmail"
    >
  >;
};

export const update__Testimonial = async ({
  identifier,
  dataToUpdate,
}: TUpdate__Testimonial) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  ) as Partial<typeof dataToUpdate>;

  await db
    .update(TestimonialsTable)
    .set({
      ...filteredData,
    })
    .where(eq(TestimonialsTable.id, identifier.id));

  return {
    ...filteredData,
    tableIdentifierToken,
  };
};

/**
 * ----------------------------------------
 * DELETE
 * ----------------------------------------
 */

export type TDelete__Testimonial = {
  identifier: Required<{
    id: (typeof TestimonialsTable.$inferSelect)["id"];
  }>;
};

export const delete__Testimonial = async ({
  identifier,
}: TDelete__Testimonial) => {
  await db
    .delete(TestimonialsTable)
    .where(eq(TestimonialsTable.id, identifier.id));
};
