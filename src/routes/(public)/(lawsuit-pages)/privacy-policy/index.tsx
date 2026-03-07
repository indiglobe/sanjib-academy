import PrivacyPolicy from "@/components/main/public/lawsuit-pages/privacy-policy";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(public)/(lawsuit-pages)/privacy-policy/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PrivacyPolicy />
    </>
  );
}
