import { Footer } from "@/components/footer/public-footer/footer";
import { Header } from "@/components/header/public-header/header";
import { BuyNowSection } from "@/components/main/public/buy-now-section";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(landing-pages)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <BuyNowSection />
      <Footer />
    </>
  );
}
