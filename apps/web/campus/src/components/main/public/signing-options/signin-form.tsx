import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/ui/button";
import { GoogleSigninButton } from "@/ui/signin-buttons";
import { cn } from "@/utils/cn";
import { ArrowLeft } from "lucide-react";
import { ComponentProps } from "react";
import signinPageImage from "@/assets/signin-page-image.png";
import { Image } from "@unpic/react";
import { useSearch } from "@tanstack/react-router";
import { env } from "@repo/env";

export default function SigninForm({ ...props }: ComponentProps<"section">) {
  const { callbackUrl, ...restSearchParams } = useSearch({
    from: "/(guest)/signin/",
  });
  /**
   * the callback url is type safe search params object so it does not have host
   * so we need to append the host/baseurl into it.
   */
  const callbackUrlWithHost = new URL(callbackUrl ?? "", env.VITE_APP_HOST);

  /**
   * for other search params append those into the callback url so that
   * it forwords them into the callback url.
   */
  Object.entries(restSearchParams).forEach(([key, value]) => {
    callbackUrlWithHost.searchParams.set(key, value);
  });

  // conver the url into string to use in signin button
  const fullCallbackUrl = callbackUrlWithHost.toString();

  return (
    <section {...props} className={cn(`pt-8`, props.className)}>
      {/* navigation menu */}
      <div className={cn(`flex w-full items-center justify-between`)}>
        <Button
          variant={"ghost"}
          onClick={() => {
            window.history.back();
          }}
          className={cn(`text-primary-500 hover:text-primary-400`)}
        >
          <ArrowLeft className={cn(`size-8`)} />
        </Button>
      </div>
      {/* navigation menu */}

      {/* signin form */}
      <div
        className={cn(`flex flex-col gap-4 md:mt-10 md:flex-row md:*:w-1/2`)}
      >
        {/* signin form intro */}
        <div
          className={cn(
            `m-auto flex w-72 flex-col items-center justify-center gap-y-6`,
          )}
        >
          <h1
            className={cn(
              `text-center text-4xl leading-14 font-bold md:w-full md:leading-12`,
            )}
          >
            <span>Welcome to </span>
            <br />
            <span
              className={cn(
                `from-primary-500 to-accent-500 bg-linear-to-r bg-clip-text text-4xl text-transparent`,
              )}
            >
              Sanjib Academy
            </span>
          </h1>

          <SigninSubheading className={cn(`max-w-100 text-center md:hidden`)} />

          <div className={cn(`mt-16 w-full md:mb-10 md:hidden`)}>
            <GoogleSigninButton
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "google",
                  callbackURL: fullCallbackUrl,
                });
              }}
            />
          </div>

          <div className={cn(`relative mt-10 size-70 w-full overflow-clip`)}>
            <Image
              src={signinPageImage}
              alt="signin-page-image"
              layout="fullWidth"
              className={cn(`h-full w-full object-contain`)}
            />
          </div>
        </div>
        {/* signin form intro */}

        {/* sign in form action area */}
        <div className={cn(`flex items-center justify-center`)}>
          <div
            className={cn(
              `border-primary-500 mx-auto flex max-h-max max-w-100 flex-col items-center justify-center rounded-xl border px-8 py-16 max-md:hidden`,
            )}
          >
            <SigninFormHeading />

            <SigninSubheading
              className={cn(`text-center text-balance max-md:hidden`)}
            />

            <div className={cn(`mt-16 w-full max-md:hidden`)}>
              <GoogleSigninButton
                onClick={async () => {
                  await authClient.signIn.social({
                    provider: "google",
                    callbackURL: fullCallbackUrl,
                  });
                }}
              />
            </div>
          </div>
        </div>
        {/* sign in form action area */}
      </div>
      {/* signin form */}
    </section>
  );
}

function SigninSubheading({ ...props }: ComponentProps<"p">) {
  return (
    <p {...props} className={cn(``, props.className)}>
      Get access to the resources you need to invest, spend, and put your money
      in motion.
    </p>
  );
}

function SigninFormHeading({ ...props }: ComponentProps<"h2">) {
  const { initiator } = useSearch({ from: "/(guest)/signin/" });

  return (
    <h2
      {...props}
      className={cn(
        `text-primary-500 mb-6 text-3xl font-bold *:text-balance md:text-center`,
        props.className,
      )}
    >
      {initiator === "authenticated-routes" && <span>Uh-uh. Hold on. </span>}
      {initiator === "course-register" && <span>To register in courses </span>}
      {initiator === "webinar-register" && (
        <span>To register for webinar </span>
      )}
      {initiator === "landing-page" && <span>Welcome back </span>}
      <br />
      <span className={cn(`inline-block`)}>You need to sign in first.</span>
    </h2>
  );
}
