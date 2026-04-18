import ComingSoon from "@/components/main/comming-soon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <ComingSoon />
    </>
  );
}
