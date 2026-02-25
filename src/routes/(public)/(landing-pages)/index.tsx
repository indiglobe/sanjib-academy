import HomePage from "@/components/main/public/home/home";
import { getAllBenefitedUsersServerFn } from "@/integrations/server-functions/querry/benefited-users";
import { fetchMetricsDetailsServeFn } from "@/integrations/server-functions/querry/metrics";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(landing-pages)/")({
  component: RouteComponent,

  loader: async () => {
    const [benefitedUsers, metrics] = await Promise.all([
      getAllBenefitedUsersServerFn(),
      fetchMetricsDetailsServeFn(),
    ] as const);

    return { benefitedUsers, metrics };
  },
});

function RouteComponent() {
  return (
    <>
      <HomePage />
    </>
  );
}
