import { db } from "@/index";
import {
  CourseModulesTable,
  TableIdentifierToken,
  CourseDocumentTable,
  CourseVideoTable,
} from "@/schema";
import { asc, eq, inArray } from "drizzle-orm";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "CMOD";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__CourseModule = Omit<
  typeof CourseModulesTable.$inferInsert,
  "tableIdentifierToken" | "id"
>;

export const create__CourseModule = async (data: TCreate__CourseModule) => {
  await db.insert(CourseModulesTable).values({
    ...data,
  });

  return {
    ...data,
    tableIdentifierToken,
  } satisfies Omit<typeof CourseModulesTable.$inferSelect, "id">;
};

/**
 * ----------------------------------------
 * READ (ALL BY COURSE ID)
 * ----------------------------------------
 */
export type TRead__AllCourseModules = {
  identifier: {
    courseId: (typeof CourseModulesTable.$inferSelect)["courseId"];
  };
};

export const read__AllCourseModules = async (
  options?: TRead__AllCourseModules,
) => {
  const modules = await db
    .select()
    .from(CourseModulesTable)
    .where(
      options
        ? eq(CourseModulesTable.courseId, options.identifier.courseId)
        : undefined,
    )
    .orderBy(asc(CourseModulesTable.appearingOrder));

  if (!modules.length) return [];

  const moduleIds = modules.map((m) => m.id);

  const [videos, documents] = await Promise.all([
    db
      .select()
      .from(CourseVideoTable)
      .where(inArray(CourseVideoTable.moduleId, moduleIds)),
    db
      .select()
      .from(CourseDocumentTable)
      .where(inArray(CourseDocumentTable.moduleId, moduleIds)),
  ]);

  return modules.map((module) => ({
    ...module,
    videos: videos.filter((v) => v.moduleId === module.id),
    documents: documents.filter((d) => d.moduleId === module.id),
  }));
};

/**
 * ----------------------------------------
 * READ (ONE)
 * ----------------------------------------
 */
export type TRead__OneCourseModule = {
  identifier: {
    id: (typeof CourseModulesTable.$inferSelect)["id"];
  };
};

export const read__OneCourseModule = async ({
  identifier,
}: TRead__OneCourseModule) => {
  const [videos, documents] = await Promise.all([
    db
      .select()
      .from(CourseVideoTable)
      .where(eq(CourseVideoTable.moduleId, identifier.id)),
    db
      .select()
      .from(CourseDocumentTable)
      .where(eq(CourseDocumentTable.moduleId, identifier.id)),
  ]);

  const module = await db
    .select()
    .from(CourseModulesTable)
    .where(eq(CourseModulesTable.id, identifier.id))
    .then((rows) => rows[0] ?? null);

  if (!module) return null;

  return { ...module, videos, documents };
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

export type TUpdate__CourseModule = {
  identifier: {
    id: (typeof CourseModulesTable.$inferSelect)["id"];
  };
  dataToUpdate: Partial<
    Omit<typeof CourseModulesTable.$inferInsert, "tableIdentifierToken" | "id">
  >;
};

export const update__CourseModule = async ({
  identifier,
  dataToUpdate,
}: TUpdate__CourseModule) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  );

  await db
    .update(CourseModulesTable)
    .set(filteredData)
    .where(eq(CourseModulesTable.id, identifier.id));

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

export type TDelete__CourseModule = {
  identifier: {
    id: (typeof CourseModulesTable.$inferSelect)["id"];
  };
};

export const delete__CourseModule = async ({
  identifier,
}: TDelete__CourseModule) => {
  await db
    .delete(CourseModulesTable)
    .where(eq(CourseModulesTable.id, identifier.id));
};
