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
    const response = await create__CourseAdvantage(data);

    return response;
  });

export const read__AllCourseAdvantagesServerFn = createServerFn({
  method: "GET",
})
  .inputValidator(zodValidator(read__AllCourseAdvantagesSchema))
  .handler(async ({ data }) => {
    const response = await read__AllCourseAdvantages(data);

    return response;
  });

export const read__OneCourseAdvantageServerFn = createServerFn({
  method: "GET",
})
  .inputValidator(zodValidator(read__OneCourseAdvantageSchema))
  .handler(async ({ data }) => {
    const response = await read__OneCourseAdvantage(data);

    return response;
  });

export const update__CourseAdvantageServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(update__CourseAdvantageSchema))
  .handler(async ({ data }) => {
    const response = await update__CourseAdvantage(data);

    return response;
  });

export const delete__CourseAdvantageServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(delete__CourseAdvantageSchema))
  .handler(async ({ data }) => {
    const response = await delete__CourseAdvantage(data);

    return response;
  });
