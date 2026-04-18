import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { db } from "..";
import { WebinarDetailsTable } from "@/schema";
import {
  create__Webinar,
  read__MostUpcomingWebinar,
  read__UpcomingWebinars,
  read__AllWebinars,
  read__Webinar,
  update__Webinar,
  delete__Webinar,
} from "./webinar-details";
import { eq, sql } from "drizzle-orm";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);
  await db.delete(WebinarDetailsTable);

  const webinars: (typeof WebinarDetailsTable.$inferInsert)[] = [
    {
      actualPrice: 4999,
      webinarJoiningLink: "https://example.com/join/Topic 1",
      scheduledDate: new Date(Date.now() + 1000000),
      approxDuration: 60,
      discountedPrice: 199,
      webinarTopic: "Topic 1",
    },
  ];

  await db.insert(WebinarDetailsTable).values(webinars);
});

afterAll(async () => {
  await db.delete(WebinarDetailsTable);
  await db.execute(sql`ROLLBACK`);
});

describe("webinar queries works fine", () => {
  test("creates a new webinar", async () => {
    const date = new Date(Date.now() + 5000000);

    const result = await create__Webinar({
      scheduledDate: new Date(date),
      approxDuration: 45,
      discountedPrice: 149,
      actualPrice: 4999,
      webinarJoiningLink: "https://example.com/join/Topic 2",
      webinarTopic: "Topic 2",
    });

    expect(result).toEqual({
      scheduledDate: new Date(date),
      approxDuration: 45,
      discountedPrice: 149,
      actualPrice: 4999,
      webinarJoiningLink: "https://example.com/join/Topic 2",
      webinarTopic: "Topic 2",
      tableIdentifierToken: "WBNR",
    });

    const [row] = await db
      .select()
      .from(WebinarDetailsTable)
      .where(eq(WebinarDetailsTable.webinarTopic, "Topic 2"));

    expect(row).toBeDefined();
    expect(row.webinarTopic).toBe("Topic 2");
  });

  test("reads most upcoming webinar", async () => {
    const webinar = await read__MostUpcomingWebinar();

    expect(webinar).toBeDefined();
    expect(webinar).not.toBeNull();
  });

  test("reads all upcoming webinars", async () => {
    const webinars = await read__UpcomingWebinars();

    expect(Array.isArray(webinars)).toBe(true);
    expect(webinars.length).toBeGreaterThan(0);
  });

  test("reads all webinars", async () => {
    const webinars = await read__AllWebinars();

    expect(Array.isArray(webinars)).toBe(true);
    expect(webinars.length).toBeGreaterThan(0);
  });

  test("reads a single webinar", async () => {
    const [existing] = await db.select().from(WebinarDetailsTable).limit(1);

    const webinar = await read__Webinar({
      identifier: { id: existing.id },
    });

    expect(webinar).toEqual(existing);
  });

  test("reads a non-existing webinar", async () => {
    const webinar = await read__Webinar({
      identifier: { id: 999999 },
    });

    expect(webinar).toBeNull();
  });

  test("updates a webinar", async () => {
    const [existing] = await db.select().from(WebinarDetailsTable).limit(1);

    await update__Webinar({
      identifier: { id: existing.id },
      dataToUpdate: { actualPrice: 9999 },
    });

    const [updated] = await db
      .select()
      .from(WebinarDetailsTable)
      .where(eq(WebinarDetailsTable.id, existing.id));

    expect(updated.actualPrice).toBe(9999);
  });

  test("deletes a webinar", async () => {
    const [existing] = await db.select().from(WebinarDetailsTable).limit(1);

    await delete__Webinar({
      identifier: { id: existing.id },
    });

    const [row] = await db
      .select()
      .from(WebinarDetailsTable)
      .where(eq(WebinarDetailsTable.id, existing.id))
      .limit(1);

    expect(row).not.toBeDefined();
  });
});
