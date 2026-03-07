import { db } from "@/db";
import { FaqTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";

export const fetchAllFaqsServerFn = createServerFn().handler(async () => {
  const faqData = await db.select().from(FaqTable);

  return faqData;
});
