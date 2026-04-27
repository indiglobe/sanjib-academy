import { createFileRoute, notFound } from "@tanstack/react-router";

import { read__AllCourseModulesServerFn } from "@/integrations/server-functions/querry/course-modules";
import { Main } from "@/components/main/public/main";
import { CourseDetails } from "@/components/main/public/resources/course";
import { read__OneOfferedCourseServerFn } from "@/integrations/server-functions/querry/offered-courses";
import { CoursesNotFound } from "@/components/main/public/resources/course-not-found";

export const Route = createFileRoute(
  "/(public)/(landing-pages)/resources/course/$courseId/",
)({
  component: RouteComponent,

  loader: async ({ params }) => {
    const [courseModules, courseDetails] = await Promise.all([
      read__AllCourseModulesServerFn({
        data: { identifier: { courseId: params.courseId } },
      }),
      read__OneOfferedCourseServerFn({
        data: { identifier: { id: params.courseId } },
      }),
    ]);

    if (!courseDetails) throw notFound();

    return { courseModules, courseDetails };
  },

  notFoundComponent: () => (
    <Main>
      <CoursesNotFound />
    </Main>
  ),
});

function RouteComponent() {
  return (
    <>
      <Main>
        <CourseDetails />
      </Main>
    </>
  );
}
