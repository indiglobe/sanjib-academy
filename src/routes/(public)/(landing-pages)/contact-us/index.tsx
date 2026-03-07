import ContactUs from "@/components/main/public/contact-us/contact-us";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(landing-pages)/contact-us/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <ContactUs />
    </>
  );
}
