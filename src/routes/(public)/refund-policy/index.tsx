import RefundPolicy from "@/components/main/public/refund-policy";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/refund-policy/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <RefundPolicy />
    </>
  );
}
