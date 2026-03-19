import { createServerFn } from "@tanstack/react-start";
import { fetchMetricsDetails } from "@repo/data/querries/metrics";

export const fetchMetricsDetailsServeFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const metrics = await fetchMetricsDetails();

  return metrics;
});
