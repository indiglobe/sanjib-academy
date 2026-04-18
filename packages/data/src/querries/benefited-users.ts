import { db } from "@/index";
import { BenefitedUserTable, TableIdentifierToken, UserTable } from "@/schema";
import { eq, getTableColumns } from "drizzle-orm";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "BUSR";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__BenefitedUser = Omit<
  typeof BenefitedUserTable.$inferInsert,
  "tableIdentifierToken" | "userEmail"
> & {
  email: Pick<typeof BenefitedUserTable.$inferInsert, "userEmail">["userEmail"];
};

/**
 * create a new benefited user
 */
export const create__BenefitedUser = async (data: TCreate__BenefitedUser) => {
  await db.insert(BenefitedUserTable).values({ userEmail: data.email });

  const { email, ...rest } = data;

  return {
    ...rest,
    userEmail: data.email,
    tableIdentifierToken,
  } satisfies typeof BenefitedUserTable.$inferInsert;
};

/**
 * ----------------------------------------
 * READ (BY EMAIL)
 * ----------------------------------------
 */

export type TRead__BenefitedUser = {
  identifier: Required<{
    email: (typeof BenefitedUserTable.$inferSelect)["userEmail"];
  }>;
};

/**
 * read single benefited user
 */
export const read__OneBenefitedUser = async ({
  identifier,
}: TRead__BenefitedUser) => {
  const userCols = getTableColumns(UserTable);
  const benefitedCols = getTableColumns(BenefitedUserTable);

  const [user] = await db
    .select({
      name: userCols.name,
      email: benefitedCols.userEmail,
      imageUrl: userCols.uploadedAvatarImageUrl,
      benefitedSince: benefitedCols.benefitedSince,
      userTableIdentifierToken: userCols.tableIdentifierToken,
      benefitedUserTableIdentifierToken: benefitedCols.tableIdentifierToken,
    })
    .from(BenefitedUserTable)
    .innerJoin(UserTable, eq(BenefitedUserTable.userEmail, UserTable.email))
    .where(eq(BenefitedUserTable.userEmail, identifier.email))
    .limit(1);

  return user ? user : null;
};

/**
 * ----------------------------------------
 * READ (ALL)
 * ----------------------------------------
 */

export const read__AllBenefitedUsers = async () => {
  const userCols = getTableColumns(UserTable);
  const benefitedCols = getTableColumns(BenefitedUserTable);

  return await db
    .select({
      name: userCols.name,
      email: benefitedCols.userEmail,
      imageUrl: userCols.uploadedAvatarImageUrl,
      userTableIdentifierToken: userCols.tableIdentifierToken,
      benefitedUserTableIdentifierToken: benefitedCols.tableIdentifierToken,
    })
    .from(BenefitedUserTable)
    .innerJoin(UserTable, eq(BenefitedUserTable.userEmail, UserTable.email));
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

export type TUpdate__BenefitedUser = {
  identifier: Required<{
    email: (typeof BenefitedUserTable.$inferSelect)["userEmail"];
  }>;
  dataToUpdate: Partial<
    Omit<
      typeof BenefitedUserTable.$inferInsert,
      "tableIdentifierToken" | "userEmail"
    >
  >;
};

/**
 * update benefited user
 */
export const update__BenefitedUser = async ({
  identifier,
  dataToUpdate,
}: TUpdate__BenefitedUser) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  ) as Required<typeof dataToUpdate>;

  await db
    .update(BenefitedUserTable)
    .set(filteredData)
    .where(eq(BenefitedUserTable.userEmail, identifier.email));

  return {
    ...filteredData,
    tableIdentifierToken,
  } satisfies Partial<typeof BenefitedUserTable.$inferInsert>;
};

/**
 * ----------------------------------------
 * DELETE
 * ----------------------------------------
 */

export type TDelete__BenefitedUser = {
  identifier: Required<{
    email: (typeof BenefitedUserTable.$inferSelect)["userEmail"];
  }>;
};

/**
 * delete benefited user
 */
export const delete__BenefitedUser = async ({
  identifier,
}: TDelete__BenefitedUser) => {
  await db
    .delete(BenefitedUserTable)
    .where(eq(BenefitedUserTable.userEmail, identifier.email));
};
