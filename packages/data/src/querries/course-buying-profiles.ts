import { CourseBuyingProfilesTable } from "@/schema";
import { db } from "..";
import { and, eq } from "drizzle-orm";

export const readCoursesBoughtByEmail = async ({
  courseName,
  email,
}: {
  courseName: "fno-hedging" | "fundamental-analysis" | "institutional-trading";
  email: string;
}) => {
  const details = await db
    .select()
    .from(CourseBuyingProfilesTable)
    .where(
      and(
        eq(CourseBuyingProfilesTable.userEmail, email),
        eq(CourseBuyingProfilesTable.courseId, courseName),
      ),
    );

  if (details.length > 0) return details[0];

  return null;
};
