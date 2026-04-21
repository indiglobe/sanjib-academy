import { createServerFn } from "@tanstack/react-start";
import {
  create__Webinar,
  read__AllWebinars,
  read__UpcomingWebinars,
  read__OneWebinar,
  read__MostUpcomingWebinar,
  update__Webinar,
  delete__Webinar,
} from "@repo/data/querries/webinar-details";
import {
  create__WebinarSchema,
  delete__WebinarSchema,
  update__WebinarSchema,
  read__OneWebinarSchema,
} from "@repo/utils/zod-schema/data";
import { zodValidator } from "@tanstack/zod-adapter";

export const create__WebinarServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(create__WebinarSchema))
  .handler(async ({ data }) => {
    const faqData = await create__Webinar(data);

    return faqData;
  });

export const read__AllWebinarsServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const faqData = await read__AllWebinars();

  return faqData;
});

export const read__OneWebinarServerFn = createServerFn({ method: "GET" })
  .inputValidator(zodValidator(read__OneWebinarSchema))
  .handler(async ({ data }) => {
    const faqData = await read__OneWebinar(data);

    return faqData;
  });

export const read__UpcomingWebinarsServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const faqData = await read__UpcomingWebinars();

  return faqData;
});

export const read__MostUpcomingWebinarServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const faqData = await read__MostUpcomingWebinar();

  return faqData;
});

export const update__WebinarServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(update__WebinarSchema))
  .handler(async ({ data }) => {
    const faqData = await update__Webinar(data);

    return faqData;
  });

export const delete__WebinarServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(delete__WebinarSchema))
  .handler(async ({ data }) => {
    const faqData = await delete__Webinar(data);

    return faqData;
  });
