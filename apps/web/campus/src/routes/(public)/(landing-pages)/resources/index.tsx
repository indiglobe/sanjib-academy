import Resources from "@/components/main/public/resources/resources";
import { read__AllOfferedCoursesServerFn } from "@/integrations/server-functions/querry/offered-courses";
import { read__UpcomingWebinarsServerFn } from "@/integrations/server-functions/querry/webinar-details";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(landing-pages)/resources/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Resources | Sanjib Academy" }],
  }),

  loader: async () => {
    const [offeredCourses, webinars] = await Promise.all([
      read__AllOfferedCoursesServerFn(),
      read__UpcomingWebinarsServerFn(),
    ] as const);

    return {
      offeredCourses,
      webinars,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <Resources />
    </>
  );
}
