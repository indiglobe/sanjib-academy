import { db } from "@/index";
import { FaqTable, TableIdentifierToken } from "@/schema";
import { asc, eq } from "drizzle-orm";

/**
 * Table identifier token (system controlled)
 */
const tableIdentifierToken: TableIdentifierToken = "FAQS";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

export type TCreate__Faq = Omit<
  typeof FaqTable.$inferInsert,
  "tableIdentifierToken" | "id"
>;

export const create__Faq = async ({
  faqQuestion,
  faqAnswer,
  isVisible,
}: TCreate__Faq) => {
  await db.insert(FaqTable).values({
    faqQuestion,
    faqAnswer,
    isVisible,
  });

  return {
    faqQuestion,
    faqAnswer,
    isVisible: isVisible ?? false,
    tableIdentifierToken,
  } satisfies typeof FaqTable.$inferInsert;
};

/**
 * ----------------------------------------
 * READ (ALL)
 * ----------------------------------------
 */

export const read__AllFaqs = async () => {
  return await db.select().from(FaqTable).orderBy(asc(FaqTable.id));
};

/**
 * ----------------------------------------
 * READ (BY IDENTIFIER)
 * ----------------------------------------
 */

export type TRead__OneFaq = {
  identifier: Required<{
    id: (typeof FaqTable.$inferSelect)["id"];
  }>;
};

export const read__OneFaq = async ({ identifier }: TRead__OneFaq) => {
  const [faq] = await db
    .select()
    .from(FaqTable)
    .where(eq(FaqTable.id, identifier.id))
    .limit(1);

  return faq ? faq : null;
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

export type TUpdate__Faq = {
  identifier: Required<{
    id: (typeof FaqTable.$inferSelect)["id"];
  }>;

  dataToUpdate: Partial<
    Omit<typeof FaqTable.$inferInsert, "tableIdentifierToken" | "id">
  >;
};

export const update__Faq = async ({
  identifier,
  dataToUpdate,
}: TUpdate__Faq) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, v]) => v !== undefined),
  ) as Partial<typeof dataToUpdate>;

  await db
    .update(FaqTable)
    .set({
      ...filteredData,
    })
    .where(eq(FaqTable.id, identifier.id));

  return {
    ...filteredData,
    tableIdentifierToken,
  } satisfies Partial<typeof FaqTable.$inferInsert>;
};

/**
 * ----------------------------------------
 * DELETE
 * ----------------------------------------
 */

export type TDelete__Faq = {
  identifier: Required<{
    id: (typeof FaqTable.$inferSelect)["id"];
  }>;
};

export const delete__Faq = async ({ identifier }: TDelete__Faq) => {
  await db.delete(FaqTable).where(eq(FaqTable.id, identifier.id));
};
