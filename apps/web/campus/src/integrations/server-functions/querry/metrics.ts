import { createServerFn } from "@tanstack/react-start";
import { readMetricsDetails } from "@repo/data/querries/metrics";

export const readMetricsDetailsServeFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const metrics = await readMetricsDetails();

  return metrics;
});
