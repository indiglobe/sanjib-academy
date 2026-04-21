import { createServerFn } from "@tanstack/react-start";
import {
  read__AllOfferedCourses,
  create__OfferedCourse,
  delete__OfferedCourse,
  read__OneOfferedCourse,
  update__OfferedCourse,
} from "@repo/data/querries/offered-courses";
import {
  create__OfferedCourseSchema,
  delete__OfferedCourseSchema,
  update__OfferedCourseSchema,
  read__OneOfferedCourseSchema,
} from "@repo/utils/zod-schema/data";
import { zodValidator } from "@tanstack/zod-adapter";

export const create__OfferedCourseServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(create__OfferedCourseSchema))
  .handler(async ({ data }) => {
    const faqData = await create__OfferedCourse(data);

    return faqData;
  });

export const read__AllOfferedCoursesServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const faqData = await read__AllOfferedCourses();

  return faqData;
});

export const read__OneOfferedCourseServerFn = createServerFn({ method: "GET" })
  .inputValidator(zodValidator(read__OneOfferedCourseSchema))
  .handler(async ({ data }) => {
    const faqData = await read__OneOfferedCourse(data);

    return faqData;
  });

export const update__OfferedCourseServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(update__OfferedCourseSchema))
  .handler(async ({ data }) => {
    const faqData = await update__OfferedCourse(data);

    return faqData;
  });

export const delete__OfferedCourseServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(delete__OfferedCourseSchema))
  .handler(async ({ data }) => {
    const faqData = await delete__OfferedCourse(data);

    return faqData;
  });
