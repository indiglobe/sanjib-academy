import { Footer } from "@/components/footer/public-footer/footer";
import LawsuitPagesNavigation from "@/components/main/public/lawsuit-pages/lawsuit-pages-navigation";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(lawsuit-pages)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <LawsuitPagesNavigation />
      <Outlet />
      <Footer />
    </>
  );
}
