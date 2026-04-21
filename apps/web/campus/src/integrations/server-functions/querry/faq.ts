import { createServerFn } from "@tanstack/react-start";
import {
  read__AllFaqs,
  create__Faq,
  delete__Faq,
  read__OneFaq,
  update__Faq,
} from "@repo/data/querries/faq";
import {
  create__FaqSchema,
  delete__FaqSchema,
  update__FaqSchema,
  read__OneFaqSchema,
} from "@repo/utils/zod-schema/data";
import { zodValidator } from "@tanstack/zod-adapter";

export const create__FaqServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(create__FaqSchema))
  .handler(async ({ data }) => {
    const faqData = await create__Faq(data);

    return faqData;
  });

export const read__AllFaqsServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const faqData = await read__AllFaqs();

    return faqData;
  },
);

export const read__OneFaqServerFn = createServerFn({ method: "GET" })
  .inputValidator(zodValidator(read__OneFaqSchema))
  .handler(async ({ data }) => {
    const faqData = await read__OneFaq(data);

    return faqData;
  });

export const update__FaqServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(update__FaqSchema))
  .handler(async ({ data }) => {
    const faqData = await update__Faq(data);

    return faqData;
  });

export const delete__FaqServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(delete__FaqSchema))
  .handler(async ({ data }) => {
    const faqData = await delete__Faq(data);

    return faqData;
  });
