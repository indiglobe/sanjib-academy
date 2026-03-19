import TermsAndConditions from "@/components/main/public/lawsuit-pages/terms-and-conditions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(public)/(lawsuit-pages)/terms-and-conditions/",
)({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Terms and Conditions | Sanjib Academy" }],
  }),

  loader: async () => {
    const effectiveDate = new Date("22/02/2026");

    return { effectiveDate };
  },
});

function RouteComponent() {
  return (
    <>
      <TermsAndConditions />
    </>
  );
}
