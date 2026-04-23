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
    return await create__Webinar(data);
  });

export const read__AllWebinarsServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  return await read__AllWebinars();
});

export const read__OneWebinarServerFn = createServerFn({ method: "GET" })
  .inputValidator(zodValidator(read__OneWebinarSchema))
  .handler(async ({ data }) => {
    return await read__OneWebinar(data);
  });

export const read__UpcomingWebinarsServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  return await read__UpcomingWebinars();
});

export const read__MostUpcomingWebinarServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  return await read__MostUpcomingWebinar();
});

export const update__WebinarServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(update__WebinarSchema))
  .handler(async ({ data }) => {
    return await update__Webinar(data);
  });

export const delete__WebinarServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(delete__WebinarSchema))
  .handler(async ({ data }) => {
    return await delete__Webinar(data);
  });
