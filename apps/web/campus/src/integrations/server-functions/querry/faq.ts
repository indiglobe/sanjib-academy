import { createServerFn } from "@tanstack/react-start";
import { fetchAllFaqs } from "@repo/data/querries/faq";

export const fetchAllFaqsServerFn = createServerFn().handler(async () => {
  const faqData = await fetchAllFaqs();

  return faqData;
});
