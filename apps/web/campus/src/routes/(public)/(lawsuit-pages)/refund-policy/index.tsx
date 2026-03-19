import RefundPolicy from "@/components/main/public/lawsuit-pages/refund-policy";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(public)/(lawsuit-pages)/refund-policy/",
)({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Refund Policy | Sanjib Academy" }],
  }),
});

function RouteComponent() {
  return (
    <>
      <RefundPolicy />
    </>
  );
}
