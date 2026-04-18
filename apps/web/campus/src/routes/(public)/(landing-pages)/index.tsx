import HomePage from "@/components/main/public/home/home";
import { readAllBenefitedUsersServerFn } from "@/integrations/server-functions/querry/benefited-users";
import { readAllFaqsServerFn } from "@/integrations/server-functions/querry/faq";
import { readAllMetricsDetailsServeFn } from "@/integrations/server-functions/querry/metrics";
import { readOfferedCoursesServerFn } from "@/integrations/server-functions/querry/offered-courses";
import { getAllTestimonialsServerFn } from "@/integrations/server-functions/querry/testimonials";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(landing-pages)/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Home | Sanjib Academy" }],
  }),

  loader: async () => {
    const [benefitedUsers, metrics, faqs, offeredCourses, testimonials] =
      await Promise.all([
        readAllBenefitedUsersServerFn(),
        readAllMetricsDetailsServeFn(),
        readAllFaqsServerFn(),
        readOfferedCoursesServerFn(),
        getAllTestimonialsServerFn(),
      ] as const);

    return { benefitedUsers, metrics, faqs, offeredCourses, testimonials };
  },
});

function RouteComponent() {
  return (
    <>
      <HomePage />
    </>
  );
}
