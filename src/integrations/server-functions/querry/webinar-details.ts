import { db } from "@/db";
import { WebinarDetailsTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { asc, gt } from "drizzle-orm";

export const mostUpcomingWebinarServerFn = createServerFn().handler(
  async () => {
    const now = new Date();

    const upcomingWebinar = await db
      .select()
      .from(WebinarDetailsTable)
      .where(gt(WebinarDetailsTable.scheduledDate, now))
      .orderBy(asc(WebinarDetailsTable.scheduledDate))
      .limit(1);

    return upcomingWebinar[0];
  },
);
