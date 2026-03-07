import Courses from "@/components/main/public/courses/courses";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(landing-pages)/courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Courses />
    </>
  );
}
