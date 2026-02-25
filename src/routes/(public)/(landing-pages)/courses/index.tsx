import { Main } from "@/components/main/public/main";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(landing-pages)/courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Main>Hello "/(public)/courses/"!</Main>;
}
