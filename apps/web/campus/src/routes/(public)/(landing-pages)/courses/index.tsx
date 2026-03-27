import Courses from "@/components/main/public/courses/courses";
import { readOfferedCoursesServerFn } from "@/integrations/server-functions/querry/offered-courses";
import { readUpcomingWebinarsListServerFn } from "@/integrations/server-functions/querry/webinar-details";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(landing-pages)/courses/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Courses | Sanjib Academy" }],
  }),

  loader: async () => {
    const [offeredCoursesList, readUpcomingWebinarsList] = await Promise.all([
      readOfferedCoursesServerFn(),
      readUpcomingWebinarsListServerFn(),
    ] as const);

    return {
      offeredCoursesList,
      readUpcomingWebinarsList,
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
