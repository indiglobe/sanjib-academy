import { ContactMessageTable } from "@/schema";
import { db } from "..";
import { InferInsertModel } from "drizzle-orm";

type InsertNewContactMessage = Omit<
  InferInsertModel<typeof ContactMessageTable>,
  "id" | "createdAt" | "tableIdentifierToken" | "updatedAt"
>;

export const insertNewContactMessage = async (
  messageDetails: InsertNewContactMessage,
) => {
  const insertResult = await db
    .insert(ContactMessageTable)
    .values({ ...messageDetails, updatedAt: new Date(Date.now()) });

  if (insertResult[0].affectedRows >= 1) {
    return { status: "success", data: messageDetails } as const;
  }
  return { status: "fail" } as const;
};
