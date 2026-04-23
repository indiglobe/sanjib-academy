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
    return await create__OfferedCourse(data);
  });

export const read__AllOfferedCoursesServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  return await read__AllOfferedCourses();
});

export const read__OneOfferedCourseServerFn = createServerFn({ method: "GET" })
  .inputValidator(zodValidator(read__OneOfferedCourseSchema))
  .handler(async ({ data }) => {
    return await read__OneOfferedCourse(data);
  });

export const update__OfferedCourseServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(update__OfferedCourseSchema))
  .handler(async ({ data }) => {
    return await update__OfferedCourse(data);
  });

export const delete__OfferedCourseServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(delete__OfferedCourseSchema))
  .handler(async ({ data }) => {
    return await delete__OfferedCourse(data);
  });
