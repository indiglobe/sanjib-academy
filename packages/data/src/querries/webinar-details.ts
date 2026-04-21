import { db } from "@/index";
import { WebinarDetailsTable, TableIdentifierToken } from "@/schema";
import { asc, eq, gt } from "drizzle-orm";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "WBNR";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__Webinar = Omit<
  typeof WebinarDetailsTable.$inferInsert,
  "tableIdentifierToken" | "id"
>;

export const create__Webinar = async (data: TCreate__Webinar) => {
  await db
    .insert(WebinarDetailsTable)
    .values({
      ...data,
    })
    .$returningId();

  return {
    ...data,
    tableIdentifierToken,
    approxDuration: data.approxDuration ?? null,
    discountedPrice: data.discountedPrice ?? null,
  } satisfies Omit<typeof WebinarDetailsTable.$inferSelect, "id">;
};

/**
 * ----------------------------------------
 * READ (MOST UPCOMING - YOUR LOGIC)
 * ----------------------------------------
 */

export const read__MostUpcomingWebinar = async () => {
  const now = new Date();

  const [upcomingWebinar] = await db
    .select()
    .from(WebinarDetailsTable)
    .where(gt(WebinarDetailsTable.scheduledDate, now))
    .orderBy(asc(WebinarDetailsTable.scheduledDate))
    .limit(1);

  return upcomingWebinar ? upcomingWebinar : null;
};

/**
 * ----------------------------------------
 * READ (ALL UPCOMING - YOUR LOGIC)
 * ----------------------------------------
 */

export const read__UpcomingWebinars = async () => {
  const now = new Date();

  const webinars = await db
    .select()
    .from(WebinarDetailsTable)
    .where(gt(WebinarDetailsTable.scheduledDate, now))
    .orderBy(asc(WebinarDetailsTable.scheduledDate));

  return webinars;
};

/**
 * ----------------------------------------
 * READ (ALL - GENERIC)
 * ----------------------------------------
 */

export const read__AllWebinars = async () => {
  return await db
    .select()
    .from(WebinarDetailsTable)
    .orderBy(asc(WebinarDetailsTable.scheduledDate));
};

/**
 * ----------------------------------------
 * READ (BY ID)
 * ----------------------------------------
 */

export type TRead__OneWebinar = {
  identifier: Required<{
    id: (typeof WebinarDetailsTable.$inferSelect)["id"];
  }>;
};

export const read__OneWebinar = async ({ identifier }: TRead__OneWebinar) => {
  const [webinar] = await db
    .select()
    .from(WebinarDetailsTable)
    .where(eq(WebinarDetailsTable.id, identifier.id))
    .limit(1);

  return webinar ? webinar : null;
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

export type TUpdate__Webinar = {
  identifier: Required<{
    id: (typeof WebinarDetailsTable.$inferSelect)["id"];
  }>;

  dataToUpdate: Partial<
    Omit<typeof WebinarDetailsTable.$inferInsert, "tableIdentifierToken" | "id">
  >;
};

export const update__Webinar = async ({
  identifier,
  dataToUpdate,
}: TUpdate__Webinar) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  ) as Partial<typeof dataToUpdate>;

  await db
    .update(WebinarDetailsTable)
    .set({
      ...filteredData,
    })
    .where(eq(WebinarDetailsTable.id, identifier.id));

  return {
    ...filteredData,
    tableIdentifierToken,
  } satisfies Partial<typeof WebinarDetailsTable.$inferInsert>;
};

/**
 * ----------------------------------------
 * DELETE
 * ----------------------------------------
 */

export type TDelete__Webinar = {
  identifier: Required<{
    id: (typeof WebinarDetailsTable.$inferSelect)["id"];
  }>;
};

export const delete__Webinar = async ({ identifier }: TDelete__Webinar) => {
  await db
    .delete(WebinarDetailsTable)
    .where(eq(WebinarDetailsTable.id, identifier.id));
};
