import { db } from "@/index";
import { WebinarBuyingProfileTable, TableIdentifierToken } from "@/schema";
import { eq, and } from "drizzle-orm";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "WBPR";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__WebinarBuyingProfile = Omit<
  typeof WebinarBuyingProfileTable.$inferInsert,
  "id" | "tableIdentifierToken" | "purchasedAt"
>;

export const create__WebinarBuyingProfile = async (
  data: TCreate__WebinarBuyingProfile,
) => {
  const now = new Date();

  await db.insert(WebinarBuyingProfileTable).values({
    ...data,
    purchasedAt: now,
  });

  return {
    ...data,
    purchasedAt: now,
    isCompleted: data.isCompleted ?? false,
    tableIdentifierToken,
  } satisfies Omit<typeof WebinarBuyingProfileTable.$inferSelect, "id">;
};

/**
 * ----------------------------------------
 * READ (ONE)
 * ----------------------------------------
 */

export type TRead__OneWebinarBuyingProfile = {
  identifier: Required<{
    userEmail: (typeof WebinarBuyingProfileTable.$inferSelect)["userEmail"];
    webinarId: (typeof WebinarBuyingProfileTable.$inferSelect)["webinarId"];
  }>;
};

export const read__OneWebinarBuyingProfile = async ({
  identifier,
}: TRead__OneWebinarBuyingProfile) => {
  const [record] = await db
    .select()
    .from(WebinarBuyingProfileTable)
    .where(
      and(
        eq(WebinarBuyingProfileTable.userEmail, identifier.userEmail),
        eq(WebinarBuyingProfileTable.webinarId, identifier.webinarId),
      ),
    )
    .limit(1);

  return record ? record : null;
};

/**
 * ----------------------------------------
 * READ (ALL)
 * ----------------------------------------
 */

export const read__AllWebinarBuyingProfiles = async () => {
  return await db.select().from(WebinarBuyingProfileTable);
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

export type TUpdate__WebinarBuyingProfile = {
  identifier: Required<{
    userEmail: (typeof WebinarBuyingProfileTable.$inferSelect)["userEmail"];
    webinarId: (typeof WebinarBuyingProfileTable.$inferSelect)["webinarId"];
  }>;
  dataToUpdate: Partial<
    Omit<
      typeof WebinarBuyingProfileTable.$inferInsert,
      "id" | "tableIdentifierToken" | "userEmail" | "webinarId"
    >
  >;
};

export const update__WebinarBuyingProfile = async ({
  identifier,
  dataToUpdate,
}: TUpdate__WebinarBuyingProfile) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  ) as typeof dataToUpdate;

  await db
    .update(WebinarBuyingProfileTable)
    .set(filteredData)
    .where(
      and(
        eq(WebinarBuyingProfileTable.userEmail, identifier.userEmail),
        eq(WebinarBuyingProfileTable.webinarId, identifier.webinarId),
      ),
    );

  return {
    ...filteredData,
    tableIdentifierToken,
  } satisfies Partial<typeof WebinarBuyingProfileTable.$inferInsert>;
};

/**
 * ----------------------------------------
 * DELETE
 * ----------------------------------------
 */

export type TDelete__WebinarBuyingProfile = {
  identifier: Required<{
    userEmail: (typeof WebinarBuyingProfileTable.$inferSelect)["userEmail"];
    webinarId: (typeof WebinarBuyingProfileTable.$inferSelect)["webinarId"];
  }>;
};

export const delete__WebinarBuyingProfile = async ({
  identifier,
}: TDelete__WebinarBuyingProfile) => {
  await db
    .delete(WebinarBuyingProfileTable)
    .where(
      and(
        eq(WebinarBuyingProfileTable.userEmail, identifier.userEmail),
        eq(WebinarBuyingProfileTable.webinarId, identifier.webinarId),
      ),
    );
};
