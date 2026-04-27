import HomePage from "@/components/main/public/home/home";
import { read__AllFaqsServerFn } from "@/integrations/server-functions/querry/faq";
import { read__AllMetricsDetailsServerFn } from "@/integrations/server-functions/querry/metrics";
import { read__AllOfferedCoursesServerFn } from "@/integrations/server-functions/querry/offered-courses";
import { read__AllTestimonialsServerFn } from "@/integrations/server-functions/querry/testimonials";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(landing-pages)/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Home | Sanjib Academy" }],
  }),

  loader: async () => {
    const [metrics, faqs, offeredCourses, testimonials] = await Promise.all([
      read__AllMetricsDetailsServerFn(),
      read__AllFaqsServerFn(),
      read__AllOfferedCoursesServerFn(),
      read__AllTestimonialsServerFn(),
    ] as const);

    return {
      metrics,
      faqs,
      offeredCourses,
      testimonials,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <HomePage />
    </>
  );
}
