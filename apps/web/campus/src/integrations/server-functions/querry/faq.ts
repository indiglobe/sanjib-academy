import { createServerFn } from "@tanstack/react-start";
import { readAllFaqs } from "@repo/data/querries/faq";

export const readAllFaqsServerFn = createServerFn().handler(async () => {
  const faqData = await readAllFaqs();

  return faqData;
});
