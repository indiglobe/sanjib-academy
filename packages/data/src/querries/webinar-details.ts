import { db } from "@/index";
import { WebinarDetailsTable } from "@/schema";
import { asc, gt } from "drizzle-orm";

export const readMostUpcomingWebinar = async () => {
  const now = new Date();

  const upcomingWebinar = await db
    .select()
    .from(WebinarDetailsTable)
    .where(gt(WebinarDetailsTable.scheduledDate, now))
    .orderBy(asc(WebinarDetailsTable.scheduledDate))
    .limit(1);

  return upcomingWebinar[0];
};

export const readUpcomingWebinars = async () => {
  const now = new Date();

  const readUpcomingWebinars = await db
    .select()
    .from(WebinarDetailsTable)
    .where(gt(WebinarDetailsTable.scheduledDate, now))
    .orderBy(asc(WebinarDetailsTable.scheduledDate));

  return readUpcomingWebinars;
};
