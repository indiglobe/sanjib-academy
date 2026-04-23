import { afterAll, beforeAll, describe, expect, test } from "vitest";
import {
  CourseModulesTable,
  CourseVideoTable,
  CourseDocumentTable,
  OfferedCoursesTable,
} from "@/schema";
import {
  create__CourseModule,
  read__AllCourseModules,
  read__OneCourseModule,
  update__CourseModule,
  delete__CourseModule,
} from "@/querries/course-modules";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  // clean order (FK safe)
  await db.delete(CourseVideoTable);
  await db.delete(CourseDocumentTable);
  await db.delete(CourseModulesTable);
  await db.delete(OfferedCoursesTable);

  await db.insert(OfferedCoursesTable).values({
    id: "course-1",
    courseTopic: "Test Topic",
    courseHeading: "Test Course",
    brochureLink: "link",
    originalEnrlomentFee: 1000,
    discountedEnrlomentFee: 500,
    imageLink: "img",
  });

  await db.insert(CourseModulesTable).values([
    {
      title: "Module 1",
      description: "Desc 1",
      courseId: "course-1",
      appearingOrder: 1,
    },
    {
      title: "Module 2",
      description: "Desc 2",
      courseId: "course-1",
      appearingOrder: 2,
    },
  ]);

  const modules = await db.select().from(CourseModulesTable);

  // seed videos (FIXED: thumbnailImage added)
  await db.insert(CourseVideoTable).values([
    {
      moduleId: modules[0].id,
      moduleVideoURL: "video-1",
      thumbnailImage: "thumb-1",
    },
    {
      moduleId: modules[0].id,
      moduleVideoURL: "video-2",
      thumbnailImage: "thumb-2",
    },
  ]);

  await db.insert(CourseDocumentTable).values([
    {
      moduleId: modules[0].id,
      documentURL: "doc-1",
    },
  ]);
});

afterAll(async () => {
  await db.execute(sql`ROLLBACK`);
});

describe("course module queries work fine", () => {
  test("creates a new course module", async () => {
    const result = await create__CourseModule({
      title: "New Module",
      description: "New Desc",
      courseId: "course-1",
      appearingOrder: 3,
    });

    expect(result).toEqual({
      title: "New Module",
      description: "New Desc",
      courseId: "course-1",
      appearingOrder: 3,
      tableIdentifierToken: "CMOD",
    });
  });

  test("reads all course modules with videos & documents (ordered)", async () => {
    const modules = await read__AllCourseModules({
      identifier: { courseId: "course-1" },
    });

    expect(Array.isArray(modules)).toBe(true);
    expect(modules.length).toBeGreaterThan(0);

    // ✅ check ordering (desc)
    for (let i = 1; i < modules.length; i++) {
      expect(modules[i - 1].appearingOrder).toBeGreaterThanOrEqual(
        modules[i].appearingOrder,
      );
    }

    const moduleWithRelations = modules.find((m) => m.videos.length > 0);

    expect(moduleWithRelations).toBeDefined();

    expect(Array.isArray(moduleWithRelations!.videos)).toBe(true);
    expect(Array.isArray(moduleWithRelations!.documents)).toBe(true);

    // ensure no nulls
    expect(moduleWithRelations!.videos.every(Boolean)).toBe(true);
    expect(moduleWithRelations!.documents.every(Boolean)).toBe(true);
  });

  test("reads one module", async () => {
    const [existing] = await db.select().from(CourseModulesTable);

    const module = await read__OneCourseModule({
      identifier: { id: existing.id },
    });

    expect(module).toBeDefined();
    expect(module?.id).toBe(existing.id);
  });

  test("reads non-existing module", async () => {
    const module = await read__OneCourseModule({
      identifier: { id: -999 },
    });

    expect(module).toBeNull();
  });

  test("updates a course module", async () => {
    const [existing] = await db.select().from(CourseModulesTable);

    await update__CourseModule({
      identifier: { id: existing.id },
      dataToUpdate: {
        title: "Updated Title",
      },
    });

    const [updated] = await db
      .select()
      .from(CourseModulesTable)
      .where(eq(CourseModulesTable.id, existing.id));

    expect(updated.title).toBe("Updated Title");
  });

  test("deletes a course module", async () => {
    const [existing] = await db.select().from(CourseModulesTable);

    await delete__CourseModule({
      identifier: { id: existing.id },
    });

    const [deleted] = await db
      .select()
      .from(CourseModulesTable)
      .where(eq(CourseModulesTable.id, existing.id))
      .limit(1);

    expect(deleted).toBeUndefined();
  });
});
