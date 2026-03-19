import { createServerFn } from "@tanstack/react-start";
import {
  mostUpcomingWebinar,
  upcomingWebinars,
} from "@repo/data/querries/webinar-details";

export const mostUpcomingWebinarServerFn = createServerFn().handler(
  async () => {
    const upcomingWebinar = await mostUpcomingWebinar();

    return upcomingWebinar;
  },
);

export const upcomingWebinarsListServerFn = createServerFn().handler(
  async () => {
    const upcomingWebinarsList = await upcomingWebinars();

    return upcomingWebinarsList;
  },
);
