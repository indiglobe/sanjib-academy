import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { CourseAdvantagesTable, OfferedCoursesTable } from "@/schema";
import {
  create__CourseAdvantage,
  read__CourseAdvantage,
  read__AllCourseAdvantages,
  update__CourseAdvantage,
  delete__CourseAdvantage,
} from "@/querries/courses-advantages";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  // (FK dependency order matters)
  await db.delete(CourseAdvantagesTable);
  await db.delete(OfferedCoursesTable);

  // required parent course
  await db.insert(OfferedCoursesTable).values({
    id: "course-1",
    courseTopic: "Test Topic",
    courseHeading: "Test Heading",
    brochureLink: "link",
    originalEnrlomentFee: 1000,
    discountedEnrlomentFee: 500,
    imageLink: "img",
  });

  // seed advantages
  await db.insert(CourseAdvantagesTable).values([
    {
      details: "Advantage 1",
      relatedTo: "course-1",
      isVisible: true,
    },
    {
      details: "Advantage 2",
      relatedTo: "course-1",
      isVisible: false,
    },
  ]);
});

afterAll(async () => {
  await db.delete(CourseAdvantagesTable);
  await db.delete(OfferedCoursesTable);
  await db.execute(sql`ROLLBACK`);
});

describe("course advantage queries works fine", () => {
  test("creates a new course advantage", async () => {
    const result = await create__CourseAdvantage({
      details: "New Advantage",
      relatedTo: "course-1",
      isVisible: true,
    });

    expect(result).toEqual({
      details: "New Advantage",
      relatedTo: "course-1",
      isVisible: true,
      tableIdentifierToken: "CADV",
    });

    const [row] = await db
      .select()
      .from(CourseAdvantagesTable)
      .where(eq(CourseAdvantagesTable.details, "New Advantage"));

    expect(row).toMatchObject({
      details: "New Advantage",
      relatedTo: "course-1",
      isVisible: true,
      tableIdentifierToken: "CADV",
    });
  });

  test("reads a single course advantage by id", async () => {
    const [existing] = await db.select().from(CourseAdvantagesTable).limit(1);

    const result = await read__CourseAdvantage({
      identifier: { id: existing.id },
    });

    expect(result).toEqual(existing);
  });

  test("reads a single course advantage by relatedTo", async () => {
    const result = await read__CourseAdvantage({
      identifier: { relatedTo: "course-1" },
    });

    expect(result).not.toBeNull();
    expect(result?.relatedTo).toBe("course-1");
  });

  test("returns null for non-existing course advantage", async () => {
    const result = await read__CourseAdvantage({
      identifier: { id: 999999 },
    });

    expect(result).toBe(null);
  });

  test("reads all course advantages", async () => {
    const list = await read__AllCourseAdvantages();

    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
  });

  test("reads all course advantages filtered by relatedTo", async () => {
    const list = await read__AllCourseAdvantages({
      identifier: { relatedTo: "course-1" },
    });

    expect(Array.isArray(list)).toBe(true);
    expect(list.every((item) => item.relatedTo === "course-1")).toBe(true);
  });

  test("updates a course advantage", async () => {
    const [existing] = await db.select().from(CourseAdvantagesTable).limit(1);

    await update__CourseAdvantage({
      identifier: { id: existing.id },
      dataToUpdate: { details: "Updated Advantage" },
    });

    const [updated] = await db
      .select()
      .from(CourseAdvantagesTable)
      .where(eq(CourseAdvantagesTable.id, existing.id));

    expect(updated.details).toBe("Updated Advantage");
  });

  test("deletes a course advantage", async () => {
    const [existing] = await db.select().from(CourseAdvantagesTable).limit(1);

    await delete__CourseAdvantage({
      identifier: { id: existing.id },
    });

    const [row] = await db
      .select()
      .from(CourseAdvantagesTable)
      .where(eq(CourseAdvantagesTable.id, existing.id))
      .limit(1);

    expect(row).not.toBeDefined();
  });
});
