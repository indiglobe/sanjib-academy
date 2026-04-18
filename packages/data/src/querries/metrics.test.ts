import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { db } from "..";
import { MetricsTable } from "@/schema";
import {
  create__Metric,
  read__AllMetricsDetails,
  read__Metric,
  update__Metric,
  delete__Metric,
} from "./metrics";
import { eq, sql } from "drizzle-orm";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);
  await db.delete(MetricsTable);

  await db.insert(MetricsTable).values([
    {
      metricsContent: "1000",
      metricsHeading: "Users",
      metricsSuffix: "+",
      isVisible: true,
    },
    {
      metricsContent: "95",
      metricsHeading: "Success Rate",
      metricsSuffix: "%",
      isVisible: true,
    },
    {
      metricsContent: "Hidden",
      metricsHeading: "HiddenMetric",
      metricsSuffix: "+",
      isVisible: false,
    },
  ]);
});

afterAll(async () => {
  await db.delete(MetricsTable);
  await db.execute(sql`ROLLBACK`);
});

describe("metrics queries works fine", () => {
  test("creates a new metric", async () => {
    const result = await create__Metric({
      metricsContent: "500",
      metricsHeading: "Clients",
      metricsSuffix: "+",
      isVisible: true,
    });

    expect(result).toEqual({
      metricsContent: "500",
      metricsHeading: "Clients",
      metricsSuffix: "+",
      isVisible: true,
      tableIdentifierToken: "MTRC",
    });

    const [row] = await db
      .select()
      .from(MetricsTable)
      .where(eq(MetricsTable.metricsContent, "500"));

    expect(row).toEqual({
      id: row.id,
      metricsContent: "500",
      metricsHeading: "Clients",
      metricsSuffix: "+",
      isVisible: true,
      tableIdentifierToken: "MTRC",
    });
  });

  test("reads all visible metrics (custom shape)", async () => {
    const metrics = await read__AllMetricsDetails();

    expect(Array.isArray(metrics)).toBe(true);

    // ensure hidden metric is excluded
    const hasHidden = metrics.some((m) => m.content.includes("Hidden"));
    expect(hasHidden).toBe(false);

    // check shape
    expect(metrics[0]).toHaveProperty("content");
    expect(metrics[0]).toHaveProperty("heading");
  });

  test("reads a single existing metric", async () => {
    const [existing] = await db.select().from(MetricsTable).limit(1);

    const metric = await read__Metric({
      identifier: { id: existing.id },
    });

    expect(metric).toEqual({
      content: existing.metricsContent,
      heading: `${existing.metricsHeading}${existing.metricsSuffix}`,
    });
  });

  test("reads a non-existing metric", async () => {
    const metric = await read__Metric({
      identifier: { id: -1 },
    });

    expect(metric).toBe(null);
  });

  test("updates a metric", async () => {
    const [existing] = await db.select().from(MetricsTable).limit(1);

    await update__Metric({
      identifier: { id: existing.id },
      dataToUpdate: {
        metricsContent: "9999",
      },
    });

    const [updated] = await db
      .select()
      .from(MetricsTable)
      .where(eq(MetricsTable.id, existing.id));

    expect(updated.metricsContent).toBe("9999");
  });

  test("deletes a metric", async () => {
    const [existing] = await db.select().from(MetricsTable).limit(1);

    await delete__Metric({
      identifier: { id: existing.id },
    });

    const [row] = await db
      .select()
      .from(MetricsTable)
      .where(eq(MetricsTable.id, existing.id))
      .limit(1);

    expect(row).not.toBeDefined();
  });
});
