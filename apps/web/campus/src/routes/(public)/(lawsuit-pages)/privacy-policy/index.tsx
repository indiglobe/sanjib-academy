import PrivacyPolicy from "@/components/main/public/lawsuit-pages/privacy-policy";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(public)/(lawsuit-pages)/privacy-policy/",
)({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Privacy Policy | Sanjib Academy" }],
  }),
});

function RouteComponent() {
  return (
    <>
      <PrivacyPolicy />
    </>
  );
}
