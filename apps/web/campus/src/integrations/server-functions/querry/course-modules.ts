import {
  update__CourseModule,
  read__OneCourseModule,
  read__AllCourseModules,
  delete__CourseModule,
  create__CourseModule,
} from "@repo/data/querries/course-modules";
import { createServerFn } from "@tanstack/react-start";
import {
  create__CourseModuleSchema,
  delete__CourseModuleSchema,
  read__AllCourseModulesSchema,
  read__OneCourseModuleSchema,
  update__CourseModuleSchema,
} from "@repo/utils/zod-schema/data";

export const read__AllCourseModulesServerFn = createServerFn({ method: "GET" })
  .inputValidator(read__AllCourseModulesSchema)
  .handler(async ({ data }) => {
    return await read__AllCourseModules(data);
  });

export const read__OneCourseModuleServerFn = createServerFn({ method: "GET" })
  .inputValidator(read__OneCourseModuleSchema)
  .handler(async ({ data }) => {
    return await read__OneCourseModule(data);
  });

export const create__CourseModuleServerFn = createServerFn({ method: "POST" })
  .inputValidator(create__CourseModuleSchema)
  .handler(async ({ data }) => {
    return await create__CourseModule(data);
  });

export const delete__CourseModuleServerFn = createServerFn({ method: "POST" })
  .inputValidator(delete__CourseModuleSchema)
  .handler(async ({ data }) => {
    return await delete__CourseModule(data);
  });

export const update__CourseModuleServerFn = createServerFn({ method: "POST" })
  .inputValidator(update__CourseModuleSchema)
  .handler(async ({ data }) => {
    return await update__CourseModule(data);
  });
