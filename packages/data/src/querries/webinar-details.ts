import { db } from "@/index";
import { WebinarDetailsTable } from "@/schema";
import { asc, gt } from "drizzle-orm";

export const mostUpcomingWebinar = async () => {
  const now = new Date();

  const upcomingWebinar = await db
    .select()
    .from(WebinarDetailsTable)
    .where(gt(WebinarDetailsTable.scheduledDate, now))
    .orderBy(asc(WebinarDetailsTable.scheduledDate))
    .limit(1);

  return upcomingWebinar[0];
};

export const upcomingWebinars = async () => {
  const now = new Date();

  const upcomingWebinars = await db
    .select()
    .from(WebinarDetailsTable)
    .where(gt(WebinarDetailsTable.scheduledDate, now))
    .orderBy(asc(WebinarDetailsTable.scheduledDate));

  return upcomingWebinars;
};
