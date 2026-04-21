import { db } from "@/index";
import { ContactMessageTable, TableIdentifierToken } from "@/schema";
import { asc, eq } from "drizzle-orm";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "CONT";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__ContactMessage = Omit<
  typeof ContactMessageTable.$inferInsert,
  "id" | "tableIdentifierToken"
>;

export const create__ContactMessage = async ({
  firstName,
  lastName,
  email,
  phoneNo,
  message,
}: TCreate__ContactMessage) => {
  const now = new Date();

  await db.insert(ContactMessageTable).values({
    firstName,
    lastName,
    email,
    phoneNo,
    message,
    updatedAt: now,
  });

  return {
    firstName,
    lastName,
    email,
    phoneNo,
    message,
    createdAt: now,
    updatedAt: now,
    isVerified: false,
    tableIdentifierToken,
  } satisfies Omit<typeof ContactMessageTable.$inferSelect, "id">;
};

/**
 * ----------------------------------------
 * READ (ALL)
 * ----------------------------------------
 */

export const read__AllContactMessages = async () => {
  return await db
    .select()
    .from(ContactMessageTable)
    .orderBy(asc(ContactMessageTable.createdAt));
};

/**
 * ----------------------------------------
 * READ (BY ID)
 * ----------------------------------------
 */

export type TRead__OneContactMessage = {
  identifier: Required<{
    id: (typeof ContactMessageTable.$inferSelect)["id"];
  }>;
};

export const read__OneContactMessage = async ({
  identifier: { id },
}: TRead__OneContactMessage) => {
  const [message] = await db
    .select()
    .from(ContactMessageTable)
    .where(eq(ContactMessageTable.id, id));

  return message ? message : null;
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

export type TUpdate__ContactMessage = {
  identifier: Required<{
    id: (typeof ContactMessageTable.$inferSelect)["id"];
  }>;

  dataToUpdate: Partial<
    Omit<typeof ContactMessageTable.$inferInsert, "id" | "tableIdentifierToken">
  >;
};

export const update__ContactMessage = async ({
  identifier,
  dataToUpdate,
}: TUpdate__ContactMessage) => {
  const now = new Date();

  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  ) as typeof dataToUpdate;

  await db
    .update(ContactMessageTable)
    .set({
      ...filteredData,
      updatedAt: now,
    })
    .where(eq(ContactMessageTable.id, identifier.id));

  return {
    ...filteredData,
    id: identifier.id,
    updatedAt: now,
    tableIdentifierToken,
  } satisfies Partial<typeof ContactMessageTable.$inferInsert>;
};

/**
 * ----------------------------------------
 * DELETE
 * ----------------------------------------
 */

export type TDelete__ContactMessage = {
  identifier: Required<{
    id: NonNullable<(typeof ContactMessageTable.$inferInsert)["id"]>;
  }>;
};

export const delete__ContactMessage = async ({
  identifier: { id },
}: TDelete__ContactMessage) => {
  await db.delete(ContactMessageTable).where(eq(ContactMessageTable.id, id));
};
