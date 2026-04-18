import { db } from "@/index";
import { CourseAdvantagesTable, TableIdentifierToken } from "@/schema";
import { eq } from "drizzle-orm";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "CADV";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__CourseAdvantage = Omit<
  typeof CourseAdvantagesTable.$inferInsert,
  "tableIdentifierToken" | "id"
>;

/**
 * create a new course advantage
 */
export const create__CourseAdvantage = async (
  data: TCreate__CourseAdvantage,
) => {
  await db.insert(CourseAdvantagesTable).values(data);

  return {
    ...data,
    tableIdentifierToken,
  } satisfies typeof CourseAdvantagesTable.$inferInsert;
};

/**
 * ----------------------------------------
 * READ (BY ID)
 * ----------------------------------------
 */

export type TRead__CourseAdvantage = {
  identifier:
    | {
        id: (typeof CourseAdvantagesTable.$inferSelect)["id"];
      }
    | {
        relatedTo: (typeof CourseAdvantagesTable.$inferSelect)["relatedTo"];
      };
};

/**
 * read single course advantage
 */
export const read__CourseAdvantage = async ({
  identifier,
}: TRead__CourseAdvantage) => {
  const baseQuerrry = db.select().from(CourseAdvantagesTable).limit(1);

  const [advantage] =
    "id" in identifier
      ? await baseQuerrry.where(eq(CourseAdvantagesTable.id, identifier.id))
      : await baseQuerrry.where(
          eq(CourseAdvantagesTable.relatedTo, identifier.relatedTo),
        );

  return advantage ? advantage : null;
};

/**
 * ----------------------------------------
 * READ (ALL)
 * ----------------------------------------
 */

export type TRead__AllCourseAdvantages = Partial<{
  identifier: {
    relatedTo: (typeof CourseAdvantagesTable.$inferSelect)["relatedTo"];
  };
}>;

export const read__AllCourseAdvantages = async (
  param?: TRead__AllCourseAdvantages,
) => {
  if (param && param.identifier) {
    return await db
      .select()
      .from(CourseAdvantagesTable)
      .where(eq(CourseAdvantagesTable.relatedTo, param.identifier.relatedTo));
  }

  return await db.select().from(CourseAdvantagesTable);
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

export type TUpdate__CourseAdvantage = {
  identifier: {
    id: NonNullable<(typeof CourseAdvantagesTable.$inferInsert)["id"]>;
  };

  dataToUpdate: Partial<
    Omit<
      typeof CourseAdvantagesTable.$inferInsert,
      "tableIdentifierToken" | "id"
    >
  >;
};

/**
 * update course advantage
 */
export const update__CourseAdvantage = async ({
  identifier,
  dataToUpdate,
}: TUpdate__CourseAdvantage) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  ) as Required<typeof dataToUpdate>;

  await db
    .update(CourseAdvantagesTable)
    .set(filteredData)
    .where(eq(CourseAdvantagesTable.id, identifier.id));

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

export type TDelete__CourseAdvantage = {
  identifier: {
    id: NonNullable<(typeof CourseAdvantagesTable.$inferInsert)["id"]>;
  };
};

/**
 * delete course advantage
 */
export const delete__CourseAdvantage = async ({
  identifier,
}: TDelete__CourseAdvantage) => {
  await db
    .delete(CourseAdvantagesTable)
    .where(eq(CourseAdvantagesTable.id, identifier.id));
};
