import { Main } from "@/components/main/public/main";
import SigninForm from "@/components/main/public/signing-options/signin-form";
import { cn } from "@/utils/cn";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

export const signinSearchParams = z.object({
  callbackUrl: z.string().catch("").optional(),
  initiator: z.enum(["landing-page"]).catch("landing-page").optional(),
});

export type SigninSearchParams = z.infer<typeof signinSearchParams>;

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
