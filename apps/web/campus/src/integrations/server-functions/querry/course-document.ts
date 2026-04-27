import {
  create__CourseDocument,
  delete__CourseDocument,
  read__AllDocuments,
  read__OneCourseDocument,
  update__CourseDocument,
} from "@repo/data/querries/course-document";
import {
  create__CourseDocumentSchema,
  delete__CourseDocumentSchema,
  read__OneCourseDocumentSchema,
  update__CourseDocumentSchema,
} from "@repo/utils/zod-schema/data";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";

export const create__CourseDocumentServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(create__CourseDocumentSchema))
  .handler(async ({ data }) => {
    return await create__CourseDocument(data);
  });

export const read__AllDocumentsServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  return await read__AllDocuments();
});

export const read__OneCourseDocumentServerFn = createServerFn({
  method: "GET",
})
  .inputValidator(zodValidator(read__OneCourseDocumentSchema))
  .handler(async ({ data }) => {
    return await read__OneCourseDocument(data);
  });

export const update__CourseDocumentServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(update__CourseDocumentSchema))
  .handler(async ({ data }) => {
    return await update__CourseDocument(data);
  });

export const delete__CourseDocumentServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(delete__CourseDocumentSchema))
  .handler(async ({ data }) => {
    return await delete__CourseDocument(data);
  });
