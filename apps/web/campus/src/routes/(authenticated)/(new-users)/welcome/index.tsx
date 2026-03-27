import WelcomeForm from "@/components/main/authenticated/welcome/welcome-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/(new-users)/welcome/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WelcomeForm />;
}
