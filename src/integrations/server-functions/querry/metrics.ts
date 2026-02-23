import { db } from "@/db";
import { MetricsTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";

export const fetchMetricsDetailsServeFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const metrics = await db
    .select({
      content: MetricsTable.metricsContent,
      heading: sql<string>`CONCAT(${MetricsTable.metricsHeading}, ${MetricsTable.metricsSuffix})`,
    })
    .from(MetricsTable)
    .where(eq(MetricsTable.isVisible, true))
    .limit(4);

  return metrics;
});
