import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { db } from "@/index";
import { TestimonialsTable, UserTable } from "@/schema";
import {
  create__Testimonial,
  read__AllTestimonials,
  read__SingleTestimonial,
  update__Testimonial,
  delete__Testimonial,
} from "./testimonial";
import { eq, sql } from "drizzle-orm";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(TestimonialsTable);
  await db.delete(UserTable);

  const users: (typeof UserTable.$inferInsert)[] = [
    {
      age: 43,
      email: "example@email.com",
      name: "Name One",
      phoneNo: "9876543210",
      uploadedAvatarImageUrl: "https://example.com/avatar.png",
    },
  ];

  await db.insert(UserTable).values(users);
});

afterAll(async () => {
  await db.delete(TestimonialsTable);
  await db.delete(UserTable);
  await db.execute(sql`ROLLBACK`);
});

describe("testimonials queries work fine", () => {
  test("creates a testimonial", async () => {
    const result = await create__Testimonial({
      testimonialText: "Great service!",
      authorEmail: "example@email.com",
      authorSocialHandle: "@testuser",
    });

    expect(result).toEqual({
      testimonialText: "Great service!",
      authorEmail: "example@email.com",
      authorSocialHandle: "@testuser",
      tableIdentifierToken: "TMNL",
    });

    const [row] = await db
      .select()
      .from(TestimonialsTable)
      .where(eq(TestimonialsTable.authorEmail, "example@email.com"));

    expect(row).toBeDefined();
    expect(row.testimonialText).toBe("Great service!");
  });

  test("reads all testimonials with joined user data", async () => {
    const data = await read__AllTestimonials();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    const row = data.find((r) => r.email === "example@email.com");

    expect(row).toBeDefined();

    if (!row) return;

    expect(row.testimonialText).toBe("Great service!");
    expect(row.authorSocialHandle).toBe("@testuser");
    expect(row.uploadedAvatarImageUrl).toBe("https://example.com/avatar.png");
  });

  test("reads single testimonial", async () => {
    const [existing] = await db.select().from(TestimonialsTable).limit(1);

    const row = await read__SingleTestimonial({
      identifier: { id: existing.id },
    });

    expect(row).not.toBeNull();

    if (!row) return;

    expect(row.id).toBe(existing.id);
    expect(row.email).toBe("example@email.com");
  });

  test("returns null for invalid testimonial id", async () => {
    const row = await read__SingleTestimonial({
      identifier: { id: 999999 },
    });

    expect(row).toBeNull();
  });

  test("updates testimonial", async () => {
    const [existing] = await db.select().from(TestimonialsTable).limit(1);

    const updated = await update__Testimonial({
      identifier: { id: existing.id },
      dataToUpdate: {
        testimonialText: "Updated testimonial text",
      },
    });

    expect(updated).toEqual({
      testimonialText: "Updated testimonial text",
      tableIdentifierToken: "TMNL",
    });

    const [row] = await db
      .select()
      .from(TestimonialsTable)
      .where(eq(TestimonialsTable.id, existing.id));

    expect(row.testimonialText).toBe("Updated testimonial text");
  });

  test("deletes testimonial", async () => {
    const [existing] = await db.select().from(TestimonialsTable).limit(1);

    await delete__Testimonial({
      identifier: { id: existing.id },
    });

    const [row] = await db
      .select()
      .from(TestimonialsTable)
      .where(eq(TestimonialsTable.id, existing.id))
      .limit(1);

    expect(row).not.toBeDefined();
  });
});
