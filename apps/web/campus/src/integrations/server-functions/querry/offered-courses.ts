import { createServerFn } from "@tanstack/react-start";
import { readOfferedCourses } from "@repo/data/querries/offered-courses";

export const readOfferedCoursesServerFn = createServerFn().handler(async () => {
  const courses = await readOfferedCourses();

  return courses;
});
