import { db } from "@/index";
import { CourseAdvantagesTable, OfferedCoursesTable } from "@/schema";
import { asc, eq, getTableColumns, sql } from "drizzle-orm";

export const readOfferedCourses = async () => {
  const { ...columns } = getTableColumns(OfferedCoursesTable);
  const { id, details, isVisible, tableIdentifierToken } = getTableColumns(
    CourseAdvantagesTable,
  );

  const offeredCoursesResponse = await db
    .select({
      ...columns,
      advantages: sql<
        {
          id: number;
          details: string;
          isVisible: boolean;
          tableIdentifierToken: string;
        }[]
      >`
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', ${id},
            'isVisible', ${isVisible},
            'tableIdentifierToken', ${tableIdentifierToken},
            'details', ${details}
          )
        )
      `,
    })
    .from(OfferedCoursesTable)
    .innerJoin(
      CourseAdvantagesTable,
      eq(OfferedCoursesTable.id, CourseAdvantagesTable.relatedTo),
    )
    .groupBy(OfferedCoursesTable.id)
    .orderBy(asc(OfferedCoursesTable.id));

  return offeredCoursesResponse;
};
