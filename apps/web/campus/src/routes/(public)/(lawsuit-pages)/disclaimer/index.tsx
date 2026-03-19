import Disclaimer from "@/components/main/public/lawsuit-pages/disclaimer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(lawsuit-pages)/disclaimer/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Disclaimer | Sanjib Academy" }],
  }),
});

function RouteComponent() {
  return (
    <>
      <Disclaimer />
    </>
  );
}
