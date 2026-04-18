import { db } from "@/index";
import { MetricsTable } from "@/schema";
import { eq, sql } from "drizzle-orm";
import { TableIdentifierToken } from "@/schema";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "MTRC";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__Metric = Omit<
  typeof MetricsTable.$inferInsert,
  "tableIdentifierToken" | "id"
>;

export const create__Metric = async ({
  metricsContent,
  metricsHeading,
  metricsSuffix,
  isVisible,
}: TCreate__Metric) => {
  await db.insert(MetricsTable).values({
    metricsContent,
    metricsHeading,
    metricsSuffix,
    isVisible,
  });

  return {
    metricsContent,
    metricsHeading,
    metricsSuffix,
    isVisible: isVisible ?? false,
    tableIdentifierToken,
  } satisfies typeof MetricsTable.$inferInsert;
};

/**
 * ----------------------------------------
 * READ (ALL - CUSTOM SHAPE)
 * ----------------------------------------
 */

export const read__AllMetricsDetails = async () => {
  const metrics = await db
    .select({
      content: MetricsTable.metricsContent,
      heading: sql<string>`CONCAT(${MetricsTable.metricsHeading}, ${MetricsTable.metricsSuffix})`,
    })
    .from(MetricsTable)
    .where(eq(MetricsTable.isVisible, true))
    .limit(4);

  return metrics;
};

/**
 * ----------------------------------------
 * READ (BY IDENTIFIER - metricsContent)
 * ----------------------------------------
 */

export type TRead__Metric = {
  identifier: Required<{
    id: (typeof MetricsTable.$inferSelect)["id"];
  }>;
};

export const read__Metric = async ({ identifier }: TRead__Metric) => {
  const [metrics] = await db
    .select({
      content: MetricsTable.metricsContent,
      heading: sql<string>`CONCAT(${MetricsTable.metricsHeading}, ${MetricsTable.metricsSuffix})`,
    })
    .from(MetricsTable)
    .where(eq(MetricsTable.id, identifier.id))
    .limit(1);

  return metrics ? metrics : null;
};

/**
 * ----------------------------------------
 * UPDATE (BY metricsContent)
 * ----------------------------------------
 */

export type TUpdate__Metric = {
  identifier: Required<{
    id: NonNullable<(typeof MetricsTable.$inferSelect)["id"]>;
  }>;

  dataToUpdate: Partial<
    Omit<typeof MetricsTable.$inferInsert, "tableIdentifierToken">
  >;
};

export const update__Metric = async ({
  identifier,
  dataToUpdate,
}: TUpdate__Metric) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  ) as Partial<typeof dataToUpdate>;

  await db
    .update(MetricsTable)
    .set({
      ...filteredData,
    })
    .where(eq(MetricsTable.id, identifier.id));

  return {
    ...filteredData,
    tableIdentifierToken,
  } satisfies Partial<typeof MetricsTable.$inferInsert>;
};

/**
 * ----------------------------------------
 * DELETE (BY metricsContent)
 * ----------------------------------------
 */

export type TDelete__Metric = {
  identifier: Required<{
    id: NonNullable<(typeof MetricsTable.$inferInsert)["id"]>;
  }>;
};

export const delete__Metric = async ({ identifier }: TDelete__Metric) => {
  await db.delete(MetricsTable).where(eq(MetricsTable.id, identifier.id));
};
