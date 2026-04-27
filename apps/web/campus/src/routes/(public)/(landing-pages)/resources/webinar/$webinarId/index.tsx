import { createFileRoute, notFound } from "@tanstack/react-router";
import { read__OneWebinarServerFn } from "@/integrations/server-functions/querry/webinar-details";
import { Main } from "@/components/main/public/main";
import { WebinarNotFound } from "@/components/main/public/resources/webinar-not-found";
import { WebinarDetailsSection } from "@/components/main/public/resources/webinar";

export const Route = createFileRoute(
  "/(public)/(landing-pages)/resources/webinar/$webinarId/",
)({
  component: RouteComponent,

  loader: async ({ params }) => {
    const { webinarId } = params;

    const [webinarDetails] = await Promise.all([
      read__OneWebinarServerFn({
        data: { identifier: { id: Number(webinarId) } },
      }),
    ]);

    if (!webinarDetails) throw notFound();

    return { webinarDetails };
  },

  notFoundComponent: () => (
    <Main>
      <WebinarNotFound />
    </Main>
  ),
});

function RouteComponent() {
  return (
    <Main>
      <WebinarDetailsSection />
    </Main>
  );
}
