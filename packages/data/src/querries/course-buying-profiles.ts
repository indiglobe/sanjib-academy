import { db } from "@/index";
import { CourseBuyingProfilesTable, TableIdentifierToken } from "@/schema";
import { and, eq } from "drizzle-orm";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "CBPR";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__CourseBuyingProfile = Omit<
  typeof CourseBuyingProfilesTable.$inferInsert,
  "tableIdentifierToken" | "id"
>;

export const create__CourseBuyingProfile = async ({
  userEmail,
  courseId,
  amountPaid,
  orderId,
  isCompleted,
}: TCreate__CourseBuyingProfile) => {
  const now = new Date();

  const finalIsCompleted = isCompleted ?? false;

  await db.insert(CourseBuyingProfilesTable).values({
    userEmail,
    courseId,
    amountPaid,
    orderId,
    purchasedAt: now,
    isCompleted: finalIsCompleted,
  });

  return {
    userEmail,
    courseId,
    amountPaid,
    orderId,
    purchasedAt: now,
    isCompleted: finalIsCompleted,
    tableIdentifierToken,
  } satisfies Omit<typeof CourseBuyingProfilesTable.$inferSelect, "id">;
};

/**
 * ----------------------------------------
 * READ (ALL)
 * ----------------------------------------
 */

export const read__AllCourseBuyingProfiles = async () => {
  return await db.select().from(CourseBuyingProfilesTable);
};

/**
 * ----------------------------------------
 * READ (BY ID OR EMAIL + COURSE ID)
 * ----------------------------------------
 */

export type TRead__CourseBuyingProfileById = {
  identifier:
    | {
        id: (typeof CourseBuyingProfilesTable.$inferSelect)["id"];
      }
    | {
        email: (typeof CourseBuyingProfilesTable.$inferSelect)["userEmail"];
        courseId: (typeof CourseBuyingProfilesTable.$inferSelect)["courseId"];
      };
};

export const read__CourseBuyingProfileById = async ({
  identifier,
}: TRead__CourseBuyingProfileById) => {
  const baseQuery = db.select().from(CourseBuyingProfilesTable);

  const finalQuery =
    "id" in identifier
      ? baseQuery.where(eq(CourseBuyingProfilesTable.id, identifier.id))
      : baseQuery.where(
          and(
            eq(CourseBuyingProfilesTable.userEmail, identifier.email),
            eq(CourseBuyingProfilesTable.courseId, identifier.courseId),
          ),
        );

  const [row] = await finalQuery;

  return row ? row : null;
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

export type TUpdate__CourseBuyingProfile = {
  identifier:
    | {
        id: (typeof CourseBuyingProfilesTable.$inferSelect)["id"];
      }
    | {
        email: (typeof CourseBuyingProfilesTable.$inferSelect)["userEmail"];
        courseId: (typeof CourseBuyingProfilesTable.$inferSelect)["courseId"];
      };

  dataToUpdate: Partial<
    Omit<
      typeof CourseBuyingProfilesTable.$inferInsert,
      "tableIdentifierToken" | "userEmail" | "id" | "courseId"
    >
  >;
};

export const update__CourseBuyingProfile = async ({
  identifier,
  dataToUpdate,
}: TUpdate__CourseBuyingProfile) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  ) as typeof dataToUpdate;

  // Guard: prevent empty updates
  if (Object.keys(filteredData).length === 0) {
    throw new Error("No valid fields provided for update");
  }

  const baseQuery = db.update(CourseBuyingProfilesTable).set({
    ...filteredData,
  });

  const finalQuery =
    "id" in identifier
      ? baseQuery.where(eq(CourseBuyingProfilesTable.id, identifier.id))
      : baseQuery.where(
          and(
            eq(CourseBuyingProfilesTable.userEmail, identifier.email),
            eq(CourseBuyingProfilesTable.courseId, identifier.courseId),
          ),
        );

  await finalQuery;

  return {
    ...filteredData,
    ...("id" in identifier
      ? { id: identifier.id }
      : {
          userEmail: identifier.email,
          courseId: identifier.courseId,
        }),
    tableIdentifierToken,
  } satisfies Partial<typeof CourseBuyingProfilesTable.$inferInsert>;
};

/**
 * ----------------------------------------
 * DELETE
 * ----------------------------------------
 */

export type TDelete__CourseBuyingProfile = {
  identifier:
    | {
        id: (typeof CourseBuyingProfilesTable.$inferSelect)["id"];
      }
    | {
        email: (typeof CourseBuyingProfilesTable.$inferSelect)["userEmail"];
        courseId: (typeof CourseBuyingProfilesTable.$inferSelect)["courseId"];
      };
};

export const delete__CourseBuyingProfile = async ({
  identifier,
}: TDelete__CourseBuyingProfile) => {
  const baseQuery = db.delete(CourseBuyingProfilesTable);

  const finalQuery =
    "id" in identifier
      ? baseQuery.where(eq(CourseBuyingProfilesTable.id, identifier.id))
      : baseQuery.where(
          and(
            eq(CourseBuyingProfilesTable.userEmail, identifier.email),
            eq(CourseBuyingProfilesTable.courseId, identifier.courseId),
          ),
        );

  await finalQuery;
};
