import {
  create__CourseAdvantage,
  read__AllCourseAdvantages,
  read__OneCourseAdvantage,
  update__CourseAdvantage,
  delete__CourseAdvantage,
} from "@repo/data/querries/courses-advantages";
import {
  create__CourseAdvantageSchema,
  read__AllCourseAdvantagesSchema,
  read__OneCourseAdvantageSchema,
  update__CourseAdvantageSchema,
  delete__CourseAdvantageSchema,
} from "@repo/utils/zod-schema/data";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";

export const create__CourseAdvantageServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(create__CourseAdvantageSchema))
  .handler(async ({ data }) => {
    return await create__CourseAdvantage(data);
  });

export const read__AllCourseAdvantagesServerFn = createServerFn({
  method: "GET",
})
  .inputValidator(zodValidator(read__AllCourseAdvantagesSchema))
  .handler(async ({ data }) => {
    return await read__AllCourseAdvantages(data);
  });

export const read__OneCourseAdvantageServerFn = createServerFn({
  method: "GET",
})
  .inputValidator(zodValidator(read__OneCourseAdvantageSchema))
  .handler(async ({ data }) => {
    return await read__OneCourseAdvantage(data);
  });

export const update__CourseAdvantageServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(update__CourseAdvantageSchema))
  .handler(async ({ data }) => {
    return await update__CourseAdvantage(data);
  });

export const delete__CourseAdvantageServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(delete__CourseAdvantageSchema))
  .handler(async ({ data }) => {
    return await delete__CourseAdvantage(data);
  });
