import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { db } from "..";
import { FaqTable } from "@/schema";
import {
  create__Faq,
  read__AllFaqs,
  read__Faq,
  update__Faq,
  delete__Faq,
} from "./faq";
import { eq, sql } from "drizzle-orm";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);
  await db.delete(FaqTable);

  const faqs: (typeof FaqTable.$inferInsert)[] = [
    {
      faqQuestion: "What is this?",
      faqAnswer: "This is a test FAQ.",
      isVisible: true,
    },
    {
      faqQuestion: "How does it work?",
      faqAnswer: "It works using drizzle ORM.",
      isVisible: false,
    },
  ];

  await db.insert(FaqTable).values(faqs);
});

afterAll(async () => {
  await db.delete(FaqTable);
  await db.execute(sql`ROLLBACK`);
});

describe("faq queries works fine", () => {
  test("creates a new faq", async () => {
    const result = await create__Faq({
      faqQuestion: "New Question?",
      faqAnswer: "New Answer.",
      isVisible: true,
    });

    expect(result).toEqual({
      faqQuestion: "New Question?",
      faqAnswer: "New Answer.",
      isVisible: true,
      tableIdentifierToken: "FAQS",
    });

    const [row] = await db
      .select()
      .from(FaqTable)
      .where(eq(FaqTable.faqAnswer, "New Answer."));

    expect(row).toBeDefined();

    expect(row).toMatchObject({
      faqQuestion: "New Question?",
      faqAnswer: "New Answer.",
      isVisible: true,
      tableIdentifierToken: "FAQS",
    });

    // ensure id exists
    expect(row.id).toBeTypeOf("number");
  });

  test("reads all faqs", async () => {
    const faqs = await read__AllFaqs();

    expect(Array.isArray(faqs)).toBe(true);

    expect(faqs.length).toBeGreaterThan(0);

    expect(faqs[0]).toHaveProperty("id");
    expect(faqs[0]).toHaveProperty("faqQuestion");
    expect(faqs[0]).toHaveProperty("faqAnswer");
    expect(faqs[0]).toHaveProperty("tableIdentifierToken");
  });

  test("reads a single existing faq", async () => {
    const [existing] = await db.select().from(FaqTable).limit(1);

    const faq = await read__Faq({
      identifier: { id: existing.id },
    });

    expect(faq).toEqual(existing);
  });

  test("reads a non-existing faq", async () => {
    const faq = await read__Faq({
      identifier: { id: 999999 },
    });

    expect(faq).toBe(null);
  });

  test("updates a faq", async () => {
    const [existing] = await db.select().from(FaqTable).limit(1);

    await update__Faq({
      identifier: { id: existing.id },
      dataToUpdate: { faqQuestion: "Updated Question" },
    });

    const [updated] = await db
      .select()
      .from(FaqTable)
      .where(eq(FaqTable.id, existing.id));

    expect(updated.faqQuestion).toBe("Updated Question");
  });

  test("deletes a faq", async () => {
    const [existing] = await db.select().from(FaqTable).limit(1);

    await delete__Faq({
      identifier: { id: existing.id },
    });

    const [row] = await db
      .select()
      .from(FaqTable)
      .where(eq(FaqTable.id, existing.id))
      .limit(1);

    expect(row).not.toBeDefined();
  });
});
