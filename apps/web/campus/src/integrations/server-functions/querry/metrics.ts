import { createServerFn } from "@tanstack/react-start";
import {
  read__AllMetricsDetails,
  create__Metric,
  delete__Metric,
  read__OneMetric,
  update__Metric,
} from "@repo/data/querries/metrics";
import {
  create__MetricSchema,
  delete__MetricSchema,
  update__MetricSchema,
  read__OneMetricSchema,
} from "@repo/utils/zod-schema/data";
import { zodValidator } from "@tanstack/zod-adapter";

export const create__MetricServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(create__MetricSchema))
  .handler(async ({ data }) => {
    return await create__Metric(data);
  });

export const read__AllMetricsDetailsServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  return await read__AllMetricsDetails();
});

export const read__OneMetricServerFn = createServerFn({ method: "GET" })
  .inputValidator(zodValidator(read__OneMetricSchema))
  .handler(async ({ data }) => {
    return await read__OneMetric(data);
  });

export const update__MetricServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(update__MetricSchema))
  .handler(async ({ data }) => {
    return await update__Metric(data);
  });

export const delete__MetricServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(delete__MetricSchema))
  .handler(async ({ data }) => {
    return await delete__Metric(data);
  });
