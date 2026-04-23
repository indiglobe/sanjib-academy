import AboutUs from "@/components/main/public/about-us/about-us";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(landing-pages)/about-us/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "About us | Sanjib Academy" }],
  }),
});

function RouteComponent() {
  return (
    <>
      <AboutUs />
    </>
  );
}
