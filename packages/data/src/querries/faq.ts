import { db } from "@/index";
import { FaqTable } from "@/schema";
import { asc } from "drizzle-orm";

export const readAllFaqs = async () => {
  const faqData = await db.select().from(FaqTable).orderBy(asc(FaqTable.id));

  return faqData;
};
