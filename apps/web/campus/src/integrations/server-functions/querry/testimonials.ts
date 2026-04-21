import { createServerFn } from "@tanstack/react-start";
import {
  read__AllTestimonials,
  create__Testimonial,
  delete__Testimonial,
  read__OneTestimonial,
  update__Testimonial,
} from "@repo/data/querries/testimonial";
import {
  create__TestimonialSchema,
  delete__TestimonialSchema,
  update__TestimonialSchema,
  read__OneTestimonialSchema,
} from "@repo/utils/zod-schema/data";
import { zodValidator } from "@tanstack/zod-adapter";

export const create__TestimonialServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(create__TestimonialSchema))
  .handler(async ({ data }) => {
    const faqData = await create__Testimonial(data);

    return faqData;
  });

export const read__AllTestimonialsServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const faqData = await read__AllTestimonials();

  return faqData;
});

export const read__OneTestimonialServerFn = createServerFn({ method: "GET" })
  .inputValidator(zodValidator(read__OneTestimonialSchema))
  .handler(async ({ data }) => {
    const faqData = await read__OneTestimonial(data);

    return faqData;
  });

export const update__TestimonialServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(update__TestimonialSchema))
  .handler(async ({ data }) => {
    const faqData = await update__Testimonial(data);

    return faqData;
  });

export const delete__TestimonialServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(delete__TestimonialSchema))
  .handler(async ({ data }) => {
    const faqData = await delete__Testimonial(data);

    return faqData;
  });
