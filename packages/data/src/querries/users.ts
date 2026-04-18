import { db } from "@/index";
import { UserTable, TableIdentifierToken } from "@/schema";
import { eq } from "drizzle-orm";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "USER";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__User = Omit<
  typeof UserTable.$inferInsert,
  "tableIdentifierToken"
>;

/**
 * create a new user to the database
 */
export const create__User = async (userDetails: TCreate__User) => {
  await db.insert(UserTable).values(userDetails);

  return {
    ...userDetails,
    role: userDetails.role ?? "basic",
    tableIdentifierToken,
  } satisfies typeof UserTable.$inferSelect;
};

/**
 * ----------------------------------------
 * READ (BY EMAIL)
 * ----------------------------------------
 */

export type TRead__User = {
  identifier: Required<{
    email: (typeof UserTable.$inferInsert)["email"];
  }>;
};

/**
 * Read a user details with email
 */
export const read__OneUser = async ({ identifier }: TRead__User) => {
  const [user] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.email, identifier.email))
    .limit(1);

  return user ? user : null;
};

/**
 * ----------------------------------------
 * READ (ALL)
 * ----------------------------------------
 */

/**
 * Read all user details
 */

export const read__AllUsers = async () => {
  return await db.select().from(UserTable);
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

export type TUpdate__User = {
  identifier: Required<{
    email: (typeof UserTable.$inferInsert)["email"];
  }>;
  dataToUpdate: Partial<
    Omit<typeof UserTable.$inferInsert, "tableIdentifierToken">
  >;
};

/**
 * Update a single user
 */
export const update__User = async ({
  identifier,
  dataToUpdate,
}: TUpdate__User) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  ) as Required<typeof dataToUpdate>;

  await db
    .update(UserTable)
    .set({
      ...filteredData,
    })
    .where(eq(UserTable.email, identifier.email));

  return {
    ...filteredData,
    tableIdentifierToken,
  } satisfies Partial<typeof UserTable.$inferSelect>;
};

/**
 * ----------------------------------------
 * DELETE
 * ----------------------------------------
 */

export type TDelete__User = {
  identifier: Required<{
    email: NonNullable<(typeof UserTable.$inferInsert)["email"]>;
  }>;
};

export const delete__User = async ({ identifier }: TDelete__User) => {
  await db.delete(UserTable).where(eq(UserTable.email, identifier.email));
};
