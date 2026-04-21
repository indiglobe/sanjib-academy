import { useMostUpcomingWebinarData } from "@/hooks/use-most-upcoming-webinar";
import { cn } from "@/utils/cn";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ComponentProps, useEffect, useState } from "react";
import { Button } from "@/ui/button";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const diff = targetDate.getTime() - new Date().getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export function EventStickyBar({
  className,
  ...props
}: ComponentProps<"section">) {
  const { data: upcomingWebinar } = useMostUpcomingWebinarData();

  useGSAP(
    () => {
      if (!upcomingWebinar) return;

      gsap.fromTo("#gsap-event-sticky-bar", { y: "100%" }, { y: 0 });
      gsap.fromTo(
        "#gsap-webinar-register-cta",
        { scaleX: 1, scaleY: 1 },
        { scaleX: 1.2, scaleY: 1.3, yoyo: true, repeat: -1 },
      );
    },
    { dependencies: [upcomingWebinar] },
  );

  if (!upcomingWebinar) return null;

  const { actualPrice, discountedPrice, webinarTopic } = upcomingWebinar;

  async function registerIntoWebinar() {
    console.log("register");
  }

  return (
    <section
      className={cn(
        `px-6 sm:px-10 md:px-20 lg:px-30`,
        `bg-primary-100/80 supports-backdrop-filter:bg-primary-100/60 border-primary-500 fixed bottom-0 left-0 z-50 w-full border-t backdrop-blur`,
        className,
      )}
      id="gsap-event-sticky-bar"
      {...props}
    >
      <div
        className={cn(
          `mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-4 lg:flex-row lg:gap-6`,
        )}
      >
        {/* Title */}
        <div className={cn(`flex-1 text-center md:text-left`)}>
          <p className={cn(`text-sm leading-tight font-medium sm:text-base`)}>
            {webinarTopic}
          </p>
        </div>

        {/* Countdown */}
        <CountdownTimer />

        {/* CTA */}
        <div className={cn(`flex items-center gap-3`)}>
          <Button
            variant={"primary"}
            onClick={registerIntoWebinar}
            id="gsap-webinar-register-cta"
            className={cn(
              `inline-flex items-center justify-center gap-2 rounded-none px-4 py-2 text-sm font-medium transition`,
              `bg-primary-500 hover:bg-primary-600 text-white active:scale-[0.98]`,
            )}
          >
            <span>Register Now </span>
            <span className={cn(`text-sm font-semibold`)}>
              {discountedPrice && (
                <span>
                  <span className={cn(`line-through opacity-50`)}>
                    ₹ {actualPrice}
                  </span>{" "}
                  <span className={cn(`text-base`)}>₹ {discountedPrice}</span>
                </span>
              )}
              {!discountedPrice && (
                <span className={cn(`text-base`)}>
                  ₹ <span>{actualPrice}</span>
                </span>
              )}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CountdownTimer({ className, ...props }: ComponentProps<"div">) {
  const { data: upcomingWebinar } = useMostUpcomingWebinarData();

  if (!upcomingWebinar) return null;

  const { scheduledDate } = upcomingWebinar;

  const target = new Date(scheduledDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(target));

  const format = (num: number) => String(num).padStart(2, "0");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [scheduledDate]);

  return (
    <div
      className={cn(`flex items-center gap-2 sm:gap-3`, className)}
      {...props}
    >
      {[
        { label: "D", value: timeLeft.days },
        { label: "H", value: timeLeft.hours },
        { label: "M", value: timeLeft.minutes },
        { label: "S", value: timeLeft.seconds },
      ].map((item) => (
        <div
          key={item.label}
          className={cn(`flex min-w-10.5 items-center gap-1`)}
        >
          <div
            className={cn(
              `bg-primary-500 rounded-md px-2 py-1 text-xs font-semibold text-white tabular-nums sm:text-sm`,
            )}
          >
            {format(item.value)}
          </div>
          <span
            className={cn(
              `text-muted-foreground mt-0.5 text-[10px] sm:text-xs`,
            )}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
