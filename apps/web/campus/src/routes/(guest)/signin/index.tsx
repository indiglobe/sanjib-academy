import SigninForm from "@/components/main/unauthenticated/signing-options/signin-form";
import { signinSearchParams } from "@/utils/zod-schema";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute("/(guest)/signin/")({
  validateSearch: zodValidator(signinSearchParams),

  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Sign In | Sanjib Academy" }],
  }),
});

function RouteComponent() {
  return (
    <>
      <SigninForm />
    </>
  );
}
