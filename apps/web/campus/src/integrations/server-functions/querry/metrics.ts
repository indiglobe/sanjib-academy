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
    const faqData = await create__Metric(data);

    return faqData;
  });

export const read__AllMetricsDetailsServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const faqData = await read__AllMetricsDetails();

  return faqData;
});

export const read__OneMetricServerFn = createServerFn({ method: "GET" })
  .inputValidator(zodValidator(read__OneMetricSchema))
  .handler(async ({ data }) => {
    const faqData = await read__OneMetric(data);

    return faqData;
  });

export const update__MetricServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(update__MetricSchema))
  .handler(async ({ data }) => {
    const faqData = await update__Metric(data);

    return faqData;
  });

export const delete__MetricServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(delete__MetricSchema))
  .handler(async ({ data }) => {
    const faqData = await delete__Metric(data);

    return faqData;
  });
