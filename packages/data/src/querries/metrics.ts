import { db } from "@/index";
import { MetricsTable } from "@/schema";
import { eq, sql } from "drizzle-orm";

export const fetchMetricsDetails = async () => {
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
