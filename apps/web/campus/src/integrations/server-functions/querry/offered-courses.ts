import { createServerFn } from "@tanstack/react-start";
import { offeredCourses } from "@repo/data/querries/offered-courses";

export const offeredCoursesServerFn = createServerFn().handler(async () => {
  const courses = await offeredCourses();

  return courses;
});
