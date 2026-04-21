import { db } from "@/index";
import {
  OfferedCoursesTable,
  CourseAdvantagesTable,
  TableIdentifierToken,
} from "@/schema";
import { asc, eq, getTableColumns, sql } from "drizzle-orm";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "OFFC";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__OfferedCourse = Omit<
  typeof OfferedCoursesTable.$inferInsert,
  "tableIdentifierToken"
>;

/**
 * create a new offered course
 */
export const create__OfferedCourse = async (data: TCreate__OfferedCourse) => {
  await db.insert(OfferedCoursesTable).values(data);

  return {
    ...data,
    tableIdentifierToken,
  } satisfies typeof OfferedCoursesTable.$inferInsert;
};

/**
 * ----------------------------------------
 * READ (ALL - WITH ADVANTAGES)
 * ----------------------------------------
 */

export const read__AllOfferedCourses = async () => {
  const courseColumns = getTableColumns(OfferedCoursesTable);
  const advantageColumns = getTableColumns(CourseAdvantagesTable);

  const rows = await db
    .select({
      ...courseColumns,

      advantages: sql<
        {
          id: number;
          details: string;
          isVisible: boolean;
          tableIdentifierToken: string;
        }[]
      >`
        COALESCE(
          JSON_ARRAYAGG(
            CASE 
              WHEN ${advantageColumns.id} IS NULL THEN NULL
              ELSE JSON_OBJECT(
                'id', ${advantageColumns.id},
                'details', ${advantageColumns.details},
                'isVisible', ${advantageColumns.isVisible},
                'tableIdentifierToken', ${advantageColumns.tableIdentifierToken}
              )
            END
          ),
          JSON_ARRAY()
        )
      `,
    })
    .from(OfferedCoursesTable)
    .leftJoin(
      CourseAdvantagesTable,
      eq(OfferedCoursesTable.id, CourseAdvantagesTable.relatedTo),
    )
    .groupBy(OfferedCoursesTable.id)
    .orderBy(asc(OfferedCoursesTable.id));

  return rows.map((r) => ({
    ...r,
    advantages: r.advantages.filter((a) => a !== null),
  }));
};

/**
 * ----------------------------------------
 * READ (BY ID)
 * ----------------------------------------
 */

export type TRead__OneOfferedCourse = {
  identifier: Required<{
    id: (typeof OfferedCoursesTable.$inferInsert)["id"];
  }>;
};

/**
 * read single offered course with advantages
 */
export const read__OneOfferedCourse = async ({
  identifier,
}: TRead__OneOfferedCourse) => {
  const courseColumns = getTableColumns(OfferedCoursesTable);
  const advantageColumns = getTableColumns(CourseAdvantagesTable);

  let [row] = await db
    .select({
      ...courseColumns,
      advantages: sql<
        {
          id: number;
          details: string;
          isVisible: boolean;
          tableIdentifierToken: string;
        }[]
      >`
        COALESCE(
          JSON_ARRAYAGG(
            CASE 
              WHEN ${advantageColumns.id} IS NULL THEN NULL
              ELSE JSON_OBJECT(
                'id', ${advantageColumns.id},
                'details', ${advantageColumns.details},
                'isVisible', ${advantageColumns.isVisible},
                'tableIdentifierToken', ${advantageColumns.tableIdentifierToken}
              )
            END
          ),
          JSON_ARRAY()
        )
      `,
    })
    .from(OfferedCoursesTable)
    .leftJoin(
      CourseAdvantagesTable,
      eq(OfferedCoursesTable.id, CourseAdvantagesTable.relatedTo),
    )
    .where(eq(OfferedCoursesTable.id, identifier.id))
    .groupBy(OfferedCoursesTable.id)
    .limit(1);

  return row
    ? { ...row, advantages: row.advantages.filter((a) => a !== null) }
    : null;
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

export type TUpdate__OfferedCourse = {
  identifier: {
    id: (typeof OfferedCoursesTable.$inferSelect)["id"];
  };

  dataToUpdate: Partial<
    Omit<typeof OfferedCoursesTable.$inferInsert, "tableIdentifierToken" | "id">
  >;
};

/**
 * update a single offered course
 */
export const update__OfferedCourse = async ({
  identifier,
  dataToUpdate,
}: TUpdate__OfferedCourse) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  ) as Partial<typeof OfferedCoursesTable.$inferInsert>;

  await db
    .update(OfferedCoursesTable)
    .set(filteredData)
    .where(eq(OfferedCoursesTable.id, identifier.id));

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

export type TDelete__OfferedCourse = {
  identifier: Required<{
    id: (typeof OfferedCoursesTable.$inferInsert)["id"];
  }>;
};

/**
 * delete a single offered course
 */
export const delete__OfferedCourse = async ({
  identifier,
}: TDelete__OfferedCourse) => {
  await db
    .delete(OfferedCoursesTable)
    .where(eq(OfferedCoursesTable.id, identifier.id));
};
