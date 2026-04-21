import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { OfferedCoursesTable, CourseAdvantagesTable } from "@/schema";
import {
  create__OfferedCourse,
  read__AllOfferedCourses,
  read__OneOfferedCourse,
  update__OfferedCourse,
  delete__OfferedCourse,
} from "@/querries/offered-courses";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(CourseAdvantagesTable);
  await db.delete(OfferedCoursesTable);

  const courses: (typeof OfferedCoursesTable.$inferInsert)[] = [
    {
      tableIdentifierToken: "OFFC",
      brochureLink: "",
      courseHeading: "",
      courseTopic: "",
      id: "course-1",
      imageLink: "",
      originalEnrlomentFee: 4999,
    },
    {
      tableIdentifierToken: "OFFC",
      brochureLink: "",
      courseHeading: "",
      courseTopic: "",
      id: "course-2",
      imageLink: "",
      originalEnrlomentFee: 4999,
    },
  ];

  await db.insert(OfferedCoursesTable).values(courses);

  const advantages: (typeof CourseAdvantagesTable.$inferInsert)[] = [
    {
      details: "Lifetime access",
      isVisible: true,
      tableIdentifierToken: "CADV",
      relatedTo: "course-1",
    },
    {
      details: "Certificate included",
      isVisible: true,
      tableIdentifierToken: "CADV",
      relatedTo: "course-1",
    },
  ];

  await db.insert(CourseAdvantagesTable).values(advantages);
});

afterAll(async () => {
  await db.delete(CourseAdvantagesTable);
  await db.delete(OfferedCoursesTable);
  await db.execute(sql`ROLLBACK`);
});

describe("offered course queries work fine", () => {
  test("creates a new offered course", async () => {
    const result = await create__OfferedCourse({
      brochureLink: "",
      courseHeading: "",
      courseTopic: "",
      id: "course-3",
      imageLink: "",
      originalEnrlomentFee: 9999,
    });

    expect(result).toEqual({
      brochureLink: "",
      courseHeading: "",
      courseTopic: "",
      id: "course-3",
      imageLink: "",
      originalEnrlomentFee: 9999,
      tableIdentifierToken: "OFFC",
    });

    const [row] = await db
      .select()
      .from(OfferedCoursesTable)
      .where(eq(OfferedCoursesTable.id, "course-3"));

    expect(row).toBeDefined();
    expect(row).toMatchObject({
      brochureLink: "",
      courseHeading: "",
      courseTopic: "",
      id: "course-3",
      imageLink: "",
      originalEnrlomentFee: 9999,
      tableIdentifierToken: "OFFC",
    });
  });

  test("reads all offered courses with advantages", async () => {
    const courses = await read__AllOfferedCourses();

    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBeGreaterThan(0);

    expect(courses[0]).toHaveProperty("advantages");
    expect(Array.isArray(courses[0].advantages)).toBe(true);

    let isThereAnyNullValueInArray = false;

    courses.forEach((c) =>
      c.advantages.forEach((a) => {
        if (a === null) {
          isThereAnyNullValueInArray = true;
        }
      }),
    );

    expect(isThereAnyNullValueInArray).not.toBe(true);
  });

  test("reads a one offered course with advantages", async () => {
    const course = await read__OneOfferedCourse({
      identifier: { id: "course-2" },
    });

    expect(course).toBeDefined();
    expect(Array.isArray(course?.advantages)).toBe(true);
    expect(course?.advantages).toEqual([]);
  });

  test("reads a non-existing course", async () => {
    const course = await read__OneOfferedCourse({
      identifier: { id: "doesnot-exists" },
    });

    expect(course).toBeNull();
  });

  test("updates an offered course", async () => {
    await update__OfferedCourse({
      identifier: { id: "course-1" },
      dataToUpdate: { courseTopic: "Updated topic" },
    });

    const [updated] = await db
      .select()
      .from(OfferedCoursesTable)
      .where(eq(OfferedCoursesTable.id, "course-1"));

    expect(updated.courseTopic).toBe("Updated topic");
  });

  test("deletes an offered course", async () => {
    await delete__OfferedCourse({
      identifier: { id: "course-1" },
    });

    const [row] = await db
      .select()
      .from(OfferedCoursesTable)
      .where(eq(OfferedCoursesTable.id, "course-1"))
      .limit(1);

    expect(row).not.toBeDefined();
  });
});
