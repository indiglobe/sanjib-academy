import Disclaimer from "@/components/main/public/lawsuit-pages/disclaimer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(lawsuit-pages)/disclaimer/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Disclaimer />
    </>
  );
}
