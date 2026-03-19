import { createServerFn } from "@tanstack/react-start";
import { getAllTestimonials } from "@repo/data/querries/testimonial";

export const getAllTestimonialsServerFn = createServerFn().handler(async () => {
  return await getAllTestimonials();
});
