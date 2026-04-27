import {
  create__CourseVideo,
  delete__CourseVideo,
  read__AllCourseVideos,
  read__OneCourseVideo,
  update__CourseVideo,
} from "@repo/data/querries/course-video";
import {
  create__CourseVideoSchema,
  read__OneCourseVideoSchema,
  update__CourseVideoSchema,
  delete__CourseVideoSchema,
} from "@repo/utils/zod-schema/data";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";

export const create__CourseVideoServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(create__CourseVideoSchema))
  .handler(async ({ data }) => {
    return await create__CourseVideo(data);
  });

export const read__AllCourseVideosServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  return await read__AllCourseVideos();
});

export const read__OneCourseVideoServerFn = createServerFn({
  method: "GET",
})
  .inputValidator(zodValidator(read__OneCourseVideoSchema))
  .handler(async ({ data }) => {
    return await read__OneCourseVideo(data);
  });

export const update__CourseVideoServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(update__CourseVideoSchema))
  .handler(async ({ data }) => {
    return await update__CourseVideo(data);
  });

export const delete__CourseVideoServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(delete__CourseVideoSchema))
  .handler(async ({ data }) => {
    return await delete__CourseVideo(data);
  });
