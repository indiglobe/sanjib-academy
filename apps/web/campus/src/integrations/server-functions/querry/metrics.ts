import { createServerFn } from "@tanstack/react-start";
import { readAllMetricsDetails } from "@repo/data/querries/metrics";

export const readAllMetricsDetailsServeFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const metrics = await readAllMetricsDetails();

  return metrics;
});
