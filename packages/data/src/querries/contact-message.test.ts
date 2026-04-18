import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { db } from "@/index";
import { ContactMessageTable } from "@/schema";
import {
  create__ContactMessage,
  read__AllContactMessages,
  read__ContactMessageById,
  update__ContactMessage,
  delete__ContactMessage,
} from "./contact-message"; // adjust path if needed
import { eq, sql } from "drizzle-orm";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);
  await db.delete(ContactMessageTable);
});

afterAll(async () => {
  await db.delete(ContactMessageTable);
  await db.execute(sql`ROLLBACK`);
});

describe("contact message queries work fine", () => {
  test("creates a contact message", async () => {
    const result = await create__ContactMessage({
      firstName: "Debo",
      lastName: "Purkait",
      email: "debo@email.com",
      phoneNo: "9876543210",
      message: "Hello there!",
    });

    expect(result).toMatchObject({
      firstName: "Debo",
      lastName: "Purkait",
      email: "debo@email.com",
      phoneNo: "9876543210",
      message: "Hello there!",
      isVerified: false,
      tableIdentifierToken: "CONT",
    });

    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);

    const [row] = await db
      .select()
      .from(ContactMessageTable)
      .where(eq(ContactMessageTable.email, "debo@email.com"));

    expect(row).toBeDefined();
    expect(row.message).toBe("Hello there!");
  });

  test("reads all contact messages", async () => {
    const data = await read__AllContactMessages();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test("reads single contact message by id", async () => {
    const [existing] = await db.select().from(ContactMessageTable).limit(1);

    const row = await read__ContactMessageById({
      identifier: { id: existing.id },
    });

    expect(row).not.toBeNull();

    if (!row) return;

    expect(row.id).toBe(existing.id);
    expect(row.email).toBe(existing.email);
  });

  test("returns null for invalid id", async () => {
    const row = await read__ContactMessageById({
      identifier: { id: 999999 },
    });

    expect(row).toBeNull();
  });

  test("updates a contact message", async () => {
    const [existing] = await db.select().from(ContactMessageTable).limit(1);

    const updated = await update__ContactMessage({
      identifier: { id: existing.id },
      dataToUpdate: {
        message: "Updated message",
      },
    });

    expect(updated).toMatchObject({
      id: existing.id,
      message: "Updated message",
      tableIdentifierToken: "CONT",
    });

    expect(updated.updatedAt).toBeInstanceOf(Date);

    const [row] = await db
      .select()
      .from(ContactMessageTable)
      .where(eq(ContactMessageTable.id, existing.id));

    expect(row.message).toBe("Updated message");
  });

  test("deletes a contact message", async () => {
    const [existing] = await db.select().from(ContactMessageTable).limit(1);

    await delete__ContactMessage({
      identifier: { id: existing.id },
    });

    const [row] = await db
      .select()
      .from(ContactMessageTable)
      .where(eq(ContactMessageTable.id, existing.id))
      .limit(1);

    expect(row).not.toBeDefined();
  });
});
