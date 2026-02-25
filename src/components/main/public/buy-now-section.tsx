import { useMostUpcomingWebinarData } from "@/hooks/use-most-upcoming-webinar";
import { Button } from "@/ui/button";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

export function BuyNowSection({ ...props }: ComponentProps<"section">) {
  const { data } = useMostUpcomingWebinarData();

  useGSAP(
    () => {
      if (!data) return;

      gsap.fromTo("#gsap-buy-now-section", { y: "100%" }, { y: 0 });
    },
    { dependencies: [data] },
  );

  if (!data) return null;

  return (
    <section
      {...props}
      id="gsap-buy-now-section"
      className={cn(
        `px-4 sm:px-10 md:px-20 lg:px-30`,
        `bg-primary-200 dark:bg-primary-50 fixed bottom-0 z-9999 flex w-full flex-col items-center gap-y-4 py-4 text-white md:flex-row md:justify-between`,
        props.className,
      )}
    >
      <Timer />
      <BuyNowButton />
    </section>
  );
}

function Timer({ ...props }: ComponentProps<"div">) {
  const { data } = useMostUpcomingWebinarData();

  if (!data) return null;

  return (
    <div
      {...props}
      className={cn(
        `text-primary-500 dark:text-primary-950 flex flex-col items-center justify-start space-y-2 md:justify-center`,
        props.className,
      )}
    >
      <CountdownTimer targetDate={new Date(data.scheduledDate)} />
    </div>
  );
}

function BuyNowButton({ ...props }: ComponentProps<"div">) {
  const { data } = useMostUpcomingWebinarData();

  useGSAP(
    () => {
      if (!data) return;

      gsap.fromTo(
        "#gsap-buy-now-button",
        {
          scale: 1,
        },
        { yoyo: true, repeat: -1, scale: 0.9 },
      );
    },
    { dependencies: [data] },
  );

  if (!data) return null;

  return (
    <div
      {...props}
      className={cn(
        `flex flex-col-reverse gap-y-2 md:flex-col`,
        props.className,
      )}
    >
      <div className={cn(`text-primary-500 dark:text-primary-950 font-bold`)}>
        {data.webinarTopic}
      </div>
      <Button
        id="gsap-buy-now-button"
        variant={"primary"}
        className={cn(`w-full bg-red-500 text-xl md:w-auto`, props.className)}
      >
        Register @{" "}
        <span
          className={cn(``, { "text-sm line-through": data.discountedPrice })}
        >
          ₹{data.actualPrice}
        </span>{" "}
        {data.discountedPrice && <span>₹{data.discountedPrice}</span>}
      </Button>
    </div>
  );
}

type CountdownProps = {
  targetDate: Date;
};

export function CountdownTimer({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const format = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="flex gap-4 text-center">
      <TimeBox>
        <TimeBoxValue>{format(timeLeft.days)}</TimeBoxValue>
        <TimeBoxLabel>{"Days".slice(0, 4)}</TimeBoxLabel>
      </TimeBox>
      <TimeBox>
        <TimeBoxValue>{format(timeLeft.hours)}</TimeBoxValue>
        <TimeBoxLabel>{"Hours".slice(0, 4)}</TimeBoxLabel>
      </TimeBox>
      <TimeBox>
        <TimeBoxValue>{format(timeLeft.minutes)}</TimeBoxValue>
        <TimeBoxLabel>{"Minutes".slice(0, 3)}</TimeBoxLabel>
      </TimeBox>
      <TimeBox>
        <TimeBoxValue>{format(timeLeft.seconds)}</TimeBoxValue>
        <TimeBoxLabel>{"Seconds".slice(0, 3)}</TimeBoxLabel>
      </TimeBox>
    </div>
  );
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeBox({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `bg-primary-500 flex min-w-16 flex-col items-center rounded-lg px-4 py-2 text-white`,
        props.className,
      )}
    />
  );
}

function TimeBoxValue({ ...props }: ComponentProps<"span">) {
  return (
    <span {...props} className={cn(`text-2xl font-bold`, props.className)} />
  );
}

function TimeBoxLabel({ ...props }: ComponentProps<"span">) {
  return (
    <span {...props} className={cn(`text-xs uppercase`, props.className)} />
  );
}
