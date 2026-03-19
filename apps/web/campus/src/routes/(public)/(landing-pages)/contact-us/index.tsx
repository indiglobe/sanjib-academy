import ContactUs from "@/components/main/public/contact-us/contact-us";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(landing-pages)/contact-us/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Contact | Sanjib Academy" }],
  }),
});

function RouteComponent() {
  return (
    <>
      <ContactUs />
    </>
  );
}
