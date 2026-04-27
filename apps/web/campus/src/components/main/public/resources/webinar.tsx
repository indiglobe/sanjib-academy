import { useRazorpayClient } from "@/integrations/razorpay/client";
import { createOrderForWebinarServerFn } from "@/integrations/server-functions/payment/webinar-enrolment";
import { getRouter } from "@/router";
import { Button } from "@/ui/button";
import { cn } from "@/utils/cn";
import { env } from "@repo/env";
import { generateUserNameFromEmail } from "@repo/utils/utility";
import { useLoaderData } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ComponentProps } from "react";
import { formatSeconds } from "@repo/utils/utility";

export function WebinarDetailsSection({
  className,
  ...props
}: ComponentProps<"section">) {
  const { webinarDetails } = useLoaderData({
    from: "/(public)/(landing-pages)/resources/webinar/$webinarId/",
  });
  const createOrderForWebinar = useServerFn(createOrderForWebinarServerFn);
  const { createRazorpayInstance } = useRazorpayClient();

  const scheduled = new Date(webinarDetails.scheduledDate);

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(scheduled);

  const formattedTime = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "numeric",
  }).format(scheduled);

  const diff = scheduled.getTime() - Date.now();
  const daysLeft = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);

  const isPast = diff < 0;

  /**
   * Function to run when the user clicks the webinar buying button
   */
  async function registerIntoWebinar() {
    const { discountedPrice, actualPrice, id } = webinarDetails;

    const orderResponse = await createOrderForWebinar({
      data: {
        amount: {
          paise: 0,
          rupee: discountedPrice ?? actualPrice,
        },
        webinarDetails: { id },
        requestInitiatedFrom: new URL(
          location.href,
          env.VITE_CAMPUS_APP_HOST,
        ).toString(),
      },
    });

    /**
     * Destructure the order response
     */
    const {
      orderDetails: { amount, id: order_id },
      user,
    } = orderResponse;

    // The URL Where the user should go after a successful purchase
    const redirectUrlAfterSuccessfulPurchase = getRouter().buildLocation({
      to: "/$username",
      params: {
        username: generateUserNameFromEmail(user.email),
      },
    }).href;

    const razorpay = createRazorpayInstance({
      order_id,
      amount: Number(amount),
      handler: () => {
        window.location.href = redirectUrlAfterSuccessfulPurchase;
      },
    });

    razorpay.open();
  }

  return (
    <section
      {...props}
      className={cn(`w-full`, className)}
      data-slot={`webinar-details`}
    >
      <div className={cn(`mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8`)}>
        <div
          className={cn(`mb-10 flex flex-col gap-3 text-center lg:text-left`)}
        >
          <h2
            className={cn(`text-foreground text-3xl font-semibold sm:text-4xl`)}
          >
            Live Webinar Session
          </h2>

          <p
            className={cn(
              `text-foreground/70 mx-auto max-w-2xl text-sm sm:text-base lg:mx-0`,
            )}
          >
            Learn how markets actually move with structured, real-world
            insights. No shortcuts — only clarity, execution, and institutional
            thinking.
          </p>
        </div>

        <div
          className={cn(
            `border-primary-200/40 dark:border-primary-800/40 bg-background relative overflow-hidden border p-6 sm:p-8`,
          )}
        >
          {/* Gradient */}
          <div
            className={cn(
              `from-primary-500/20 via-accent-500/10 to-secondary-500/20 absolute inset-0 -z-10 bg-linear-to-br opacity-40 blur-2xl`,
            )}
          />

          <div
            className={cn(
              `flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between`,
            )}
          >
            {/* LEFT */}
            <div className={cn(`flex max-w-2xl flex-col gap-5`)}>
              {/* Status Badge */}
              <div className={cn(`flex items-center gap-2`)}>
                <span
                  className={cn(
                    `px-2 py-1 text-xs font-medium`,
                    isPast
                      ? `bg-red-500/10 text-red-500`
                      : daysLeft === 0
                        ? `bg-accent-500/10 text-accent-500`
                        : `bg-primary-500/10 text-primary-600 dark:text-primary-300`,
                  )}
                >
                  {isPast
                    ? "Completed"
                    : daysLeft === 0
                      ? "Happening Today"
                      : "Upcoming"}
                </span>
              </div>

              {/* Title */}
              <h1
                className={cn(
                  `text-foreground text-2xl leading-tight font-semibold sm:text-3xl lg:text-4xl`,
                )}
              >
                {webinarDetails.webinarTopic}
              </h1>

              {/* Meta */}
              <div className={cn(`grid grid-cols-1 gap-4 sm:grid-cols-2`)}>
                {/* Date */}
                <div
                  className={cn(
                    `border-primary-300/40 dark:border-primary-700/40 bg-background border px-4 py-3`,
                  )}
                >
                  <p className={cn(`text-foreground/60 text-xs`)}>
                    Scheduled Date
                  </p>
                  <p
                    className={cn(
                      `text-primary-600 dark:text-primary-300 text-sm font-medium`,
                    )}
                  >
                    {formattedDate}
                  </p>
                  <p className={cn(`text-foreground/50 text-xs`)}>
                    {formattedTime}
                  </p>
                  <p className={cn(`text-foreground/50 text-xs`)}>
                    {isPast
                      ? "Session completed"
                      : daysLeft === 0
                        ? "Starts today"
                        : `in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`}
                  </p>
                </div>

                {/* Duration */}
                <div
                  className={cn(
                    `border-primary-300/40 dark:border-primary-700/40 bg-background border px-4 py-3`,
                  )}
                >
                  <p className={cn(`text-foreground/60 text-xs`)}>Duration</p>
                  <p
                    className={cn(
                      `text-primary-600 dark:text-primary-300 text-sm font-medium`,
                    )}
                  >
                    {webinarDetails.approxDuration
                      ? `${formatSeconds(webinarDetails.approxDuration)}`
                      : "Not specified"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className={cn(`text-foreground/70 text-sm leading-relaxed`)}>
                Learn how markets actually behave using structured frameworks,
                institutional logic, and real execution models. This session is
                designed to eliminate guesswork and build clarity in trading.
              </p>

              {/* Extra Info */}
              <div
                className={cn(
                  `border-primary-300/40 dark:border-primary-700/40 bg-background flex flex-col gap-2 border px-4 py-3`,
                )}
              >
                <p className={cn(`text-foreground/60 text-xs`)}>
                  Joining Details
                </p>
                <p className={cn(`text-foreground/70 text-sm`)}>
                  {isPast
                    ? "This webinar has already ended."
                    : "Joining link will be shared after successful registration."}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div
              className={cn(
                `border-primary-300/40 dark:border-primary-700/40 bg-background flex w-full max-w-sm flex-col gap-5 border p-6`,
              )}
            >
              {/* Price */}
              <div className={cn(`flex flex-col gap-1`)}>
                <p className={cn(`text-foreground/60 text-xs`)}>
                  Enrollment Fee
                </p>

                <div className={cn(`flex items-center gap-2`)}>
                  {webinarDetails.discountedPrice && (
                    <span
                      className={cn(`text-foreground/50 text-sm line-through`)}
                    >
                      ₹{webinarDetails.actualPrice}
                    </span>
                  )}
                  <span
                    className={cn(
                      `text-primary-600 dark:text-primary-300 text-2xl font-semibold`,
                    )}
                  >
                    ₹
                    {webinarDetails.discountedPrice ??
                      webinarDetails.actualPrice}
                  </span>
                </div>

                {webinarDetails.discountedPrice && (
                  <p className={cn(`text-xs text-green-600`)}>
                    You save ₹
                    {webinarDetails.actualPrice -
                      webinarDetails.discountedPrice}
                  </p>
                )}
              </div>

              {/* CTA */}
              <Button
                disabled={isPast}
                onClick={isPast ? undefined : () => registerIntoWebinar()}
                variant="primary"
                className={cn(
                  `bg-primary-500 hover:bg-primary-600 w-full rounded-none px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50`,
                )}
              >
                {isPast ? "Registration Closed" : "Register Now"}
              </Button>

              {/* Note */}
              <p className={cn(`text-foreground/50 text-xs`)}>
                {isPast
                  ? "This session is no longer available."
                  : "Limited seats. Secure your spot before it fills."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
