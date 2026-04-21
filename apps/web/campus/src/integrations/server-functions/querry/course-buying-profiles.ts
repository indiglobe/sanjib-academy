import {
  create__CourseBuyingProfile,
  delete__CourseBuyingProfile,
  read__AllCourseBuyingProfiles,
  read__OneCourseBuyingProfile,
  update__CourseBuyingProfile,
} from "@repo/data/querries/course-buying-profiles";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import {
  read__OneCourseBuyingProfileSchema,
  read__AllCourseBuyingProfilesSchema,
  create__CourseBuyingProfileSchema,
  delete__CourseBuyingProfileSchema,
  update__CourseBuyingProfileSchema,
} from "@repo/utils/zod-schema/data";

export const create__CourseBuyingProfileServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(create__CourseBuyingProfileSchema))
  .handler(async ({ data }) => {
    return await create__CourseBuyingProfile(data);
  });

export const read__AllCourseBuyingProfilesServerFn = createServerFn({
  method: "GET",
})
  .inputValidator(zodValidator(read__AllCourseBuyingProfilesSchema))
  .handler(async ({ data }) => {
    return await read__AllCourseBuyingProfiles(data);
  });

export const read__OneCourseBuyingProfileServerFn = createServerFn({
  method: "GET",
})
  .inputValidator(zodValidator(read__OneCourseBuyingProfileSchema))
  .handler(async ({ data }) => {
    return await read__OneCourseBuyingProfile(data);
  });

export const update__CourseBuyingProfileServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(update__CourseBuyingProfileSchema))
  .handler(async ({ data }) => {
    return await update__CourseBuyingProfile(data);
  });

export const delete__CourseBuyingProfileServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(zodValidator(delete__CourseBuyingProfileSchema))
  .handler(async ({ data }) => {
    return await delete__CourseBuyingProfile(data);
  });
