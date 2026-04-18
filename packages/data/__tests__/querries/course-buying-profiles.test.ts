import { afterAll, beforeAll, describe, expect, test } from "vitest";
import {
  CourseBuyingProfilesTable,
  UserTable,
  OfferedCoursesTable,
} from "@/schema";
import {
  create__CourseBuyingProfile,
  read__AllCourseBuyingProfiles,
  read__CourseBuyingProfileById,
  update__CourseBuyingProfile,
  delete__CourseBuyingProfile,
} from "@/querries/course-buying-profiles";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(CourseBuyingProfilesTable);
  await db.delete(UserTable);
  await db.delete(OfferedCoursesTable);

  // Insert required foreign key data
  await db.insert(UserTable).values([
    {
      email: "test@email.com",
      name: "Test User",
      uploadedAvatarImageUrl: "",
      age: 25,
      phoneNo: "9876543210",
    },
  ]);

  await db.insert(OfferedCoursesTable).values([
    {
      id: "course-1",
      courseTopic: "Test Topic",
      courseHeading: "Test Heading",
      brochureLink: "https://example.com",
      originalEnrlomentFee: 1000,
      imageLink: "https://example.com/image.png",
    },
  ]);
});

afterAll(async () => {
  await db.delete(CourseBuyingProfilesTable);
  await db.delete(UserTable);
  await db.delete(OfferedCoursesTable);

  await db.execute(sql`ROLLBACK`);
});

describe("course buying profile queries work fine", () => {
  test("creates a course buying profile", async () => {
    const result = await create__CourseBuyingProfile({
      userEmail: "test@email.com",
      courseId: "course-1",
      amountPaid: 500,
      orderId: "ORD1234567",
      isCompleted: true,
    });

    expect(result).toMatchObject({
      userEmail: "test@email.com",
      courseId: "course-1",
      amountPaid: 500,
      orderId: "ORD1234567",
      isCompleted: true,
      tableIdentifierToken: "CBPR",
    });

    expect(result.purchasedAt).toBeInstanceOf(Date);

    const [row] = await db
      .select()
      .from(CourseBuyingProfilesTable)
      .where(eq(CourseBuyingProfilesTable.userEmail, "test@email.com"));

    expect(row).toBeDefined();
    expect(row.amountPaid).toBe(500);
  });

  test("reads all course buying profiles", async () => {
    const data = await read__AllCourseBuyingProfiles();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test("reads by id", async () => {
    const [existing] = await db
      .select()
      .from(CourseBuyingProfilesTable)
      .limit(1);

    const row = await read__CourseBuyingProfileById({
      identifier: { id: existing.id },
    });

    expect(row).not.toBeNull();

    if (!row) return;

    expect(row.id).toBe(existing.id);
    expect(row.userEmail).toBe("test@email.com");
  });

  test("reads by email + courseId", async () => {
    const row = await read__CourseBuyingProfileById({
      identifier: {
        email: "test@email.com",
        courseId: "course-1",
      },
    });

    expect(row).not.toBeNull();

    if (!row) return;

    expect(row.userEmail).toBe("test@email.com");
    expect(row.courseId).toBe("course-1");
  });

  test("returns null for invalid identifier", async () => {
    const row = await read__CourseBuyingProfileById({
      identifier: { id: 999999 },
    });

    expect(row).toBeNull();
  });

  test("updates using id", async () => {
    const [existing] = await db
      .select()
      .from(CourseBuyingProfilesTable)
      .limit(1);

    const updated = await update__CourseBuyingProfile({
      identifier: { id: existing.id },
      dataToUpdate: {
        amountPaid: 800,
      },
    });

    expect(updated).toMatchObject({
      id: existing.id,
      amountPaid: 800,
      tableIdentifierToken: "CBPR",
    });

    const [row] = await db
      .select()
      .from(CourseBuyingProfilesTable)
      .where(eq(CourseBuyingProfilesTable.id, existing.id));

    expect(row.amountPaid).toBe(800);
  });

  test("updates using email + courseId", async () => {
    const updated = await update__CourseBuyingProfile({
      identifier: {
        email: "test@email.com",
        courseId: "course-1",
      },
      dataToUpdate: {
        isCompleted: false,
      },
    });

    expect(updated).toMatchObject({
      userEmail: "test@email.com",
      courseId: "course-1",
      isCompleted: false,
      tableIdentifierToken: "CBPR",
    });

    const [row] = await db
      .select()
      .from(CourseBuyingProfilesTable)
      .where(eq(CourseBuyingProfilesTable.userEmail, "test@email.com"));

    expect(row.isCompleted).toBe(false);
  });

  test("throws error on empty update", async () => {
    const [existing] = await db
      .select()
      .from(CourseBuyingProfilesTable)
      .limit(1);

    await expect(
      update__CourseBuyingProfile({
        identifier: { id: existing.id },
        dataToUpdate: {},
      }),
    ).rejects.toThrow();
  });

  test("deletes using id", async () => {
    const [existing] = await db
      .select()
      .from(CourseBuyingProfilesTable)
      .limit(1);

    await delete__CourseBuyingProfile({
      identifier: { id: existing.id },
    });

    const [row] = await db
      .select()
      .from(CourseBuyingProfilesTable)
      .where(eq(CourseBuyingProfilesTable.id, existing.id))
      .limit(1);

    expect(row).not.toBeDefined();
  });
});
