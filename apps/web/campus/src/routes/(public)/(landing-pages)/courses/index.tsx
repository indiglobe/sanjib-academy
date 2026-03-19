import Courses from "@/components/main/public/courses/courses";
import { offeredCoursesServerFn } from "@/integrations/server-functions/querry/offered-courses";
import { upcomingWebinarsListServerFn } from "@/integrations/server-functions/querry/webinar-details";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(landing-pages)/courses/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Courses | Sanjib Academy" }],
  }),

  loader: async () => {
    const [offeredCourses, upcomingWebinarsList] = await Promise.all([
      offeredCoursesServerFn(),
      upcomingWebinarsListServerFn(),
    ] as const);

    return {
      offeredCourses,
      upcomingWebinarsList,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <Courses />
    </>
  );
}
