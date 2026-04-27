import { db } from "@/index";
import { CourseDocumentTable, TableIdentifierToken } from "@/schema";
import { eq } from "drizzle-orm";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "CDOC";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__CourseDocument = Omit<
  typeof CourseDocumentTable.$inferInsert,
  "tableIdentifierToken" | "id"
>;

export const create__CourseDocument = async (data: TCreate__CourseDocument) => {
  await db.insert(CourseDocumentTable).values(data);

  return {
    ...data,
    documentDescription: data.documentDescription ?? null,
    tableIdentifierToken,
  } satisfies Omit<typeof CourseDocumentTable.$inferSelect, "id">;
};

/**
 * ----------------------------------------
 * READ (BY MODULE ID)
 * ----------------------------------------
 */

export const read__AllDocuments = async () => {
  return await db.select().from(CourseDocumentTable);
};

/**
 * ----------------------------------------
 * READ ONE
 * ----------------------------------------
 */

export type TRead__OneCourseDocument = {
  identifier: {
    id: (typeof CourseDocumentTable.$inferSelect)["id"];
  };
};

export const read__OneCourseDocument = async ({
  identifier,
}: TRead__OneCourseDocument) => {
  const [doc] = await db
    .select()
    .from(CourseDocumentTable)
    .where(eq(CourseDocumentTable.id, identifier.id))
    .limit(1);

  return doc ? doc : null;
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

export type TUpdate__CourseDocument = {
  identifier: {
    id: (typeof CourseDocumentTable.$inferSelect)["id"];
  };
  dataToUpdate: Partial<
    Omit<typeof CourseDocumentTable.$inferInsert, "tableIdentifierToken" | "id">
  >;
};

export const update__CourseDocument = async ({
  identifier,
  dataToUpdate,
}: TUpdate__CourseDocument) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  );

  await db
    .update(CourseDocumentTable)
    .set(filteredData)
    .where(eq(CourseDocumentTable.id, identifier.id));

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

export type TDelete__CourseDocument = {
  identifier: {
    id: (typeof CourseDocumentTable.$inferSelect)["id"];
  };
};

export const delete__CourseDocument = async ({
  identifier,
}: TDelete__CourseDocument) => {
  await db
    .delete(CourseDocumentTable)
    .where(eq(CourseDocumentTable.id, identifier.id));
};
