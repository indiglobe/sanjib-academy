import { db } from "@/index";
import { CourseVideoTable, TableIdentifierToken } from "@/schema";
import { eq } from "drizzle-orm";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "CVID";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__CourseVideo = Omit<
  typeof CourseVideoTable.$inferInsert,
  "tableIdentifierToken" | "id"
>;

export const create__CourseVideo = async (data: TCreate__CourseVideo) => {
  await db.insert(CourseVideoTable).values(data);

  return {
    ...data,
    videoDescription: data.videoDescription ?? null,
    tableIdentifierToken,
  } satisfies Omit<typeof CourseVideoTable.$inferSelect, "id">;
};

/**
 * ----------------------------------------
 * READ (BY MODULE ID)
 * ----------------------------------------
 */

export const read__AllCourseVideos = async () => {
  return await db.select().from(CourseVideoTable);
};

/**
 * ----------------------------------------
 * READ ONE
 * ----------------------------------------
 */

export type TRead__OneCourseVideo = {
  identifier: {
    id: (typeof CourseVideoTable.$inferSelect)["id"];
  };
};

export const read__OneCourseVideo = async ({
  identifier,
}: TRead__OneCourseVideo) => {
  const [video] = await db
    .select()
    .from(CourseVideoTable)
    .where(eq(CourseVideoTable.id, identifier.id))
    .limit(1);

  return video ? video : null;
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

export type TUpdate__CourseVideo = {
  identifier: {
    id: (typeof CourseVideoTable.$inferSelect)["id"];
  };
  dataToUpdate: Partial<
    Omit<typeof CourseVideoTable.$inferInsert, "tableIdentifierToken" | "id">
  >;
};

export const update__CourseVideo = async ({
  identifier,
  dataToUpdate,
}: TUpdate__CourseVideo) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  );

  await db
    .update(CourseVideoTable)
    .set(filteredData)
    .where(eq(CourseVideoTable.id, identifier.id));

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

export type TDelete__CourseVideo = {
  identifier: {
    id: (typeof CourseVideoTable.$inferSelect)["id"];
  };
};

export const delete__CourseVideo = async ({
  identifier,
}: TDelete__CourseVideo) => {
  await db
    .delete(CourseVideoTable)
    .where(eq(CourseVideoTable.id, identifier.id));
};
