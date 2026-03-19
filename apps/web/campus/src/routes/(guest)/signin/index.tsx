import { Main } from "@/components/main/public/main";
import SigninForm from "@/components/main/public/signing-options/signin-form";
import { cn } from "@/utils/cn";
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
      <Main className={cn(`mt-0 md:-mx-10 lg:-mx-20`)}>
        <SigninForm />
      </Main>
    </>
  );
}
