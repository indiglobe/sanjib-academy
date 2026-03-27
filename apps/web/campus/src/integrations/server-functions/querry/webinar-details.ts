import { createServerFn } from "@tanstack/react-start";
import {
  readMostUpcomingWebinar,
  readUpcomingWebinars,
} from "@repo/data/querries/webinar-details";

export const readMostUpcomingWebinarServerFn = createServerFn().handler(
  async () => {
    const upcomingWebinar = await readMostUpcomingWebinar();

    return upcomingWebinar;
  },
);

export const readUpcomingWebinarsListServerFn = createServerFn().handler(
  async () => {
    const readUpcomingWebinarsList = await readUpcomingWebinars();

    return readUpcomingWebinarsList;
  },
);
