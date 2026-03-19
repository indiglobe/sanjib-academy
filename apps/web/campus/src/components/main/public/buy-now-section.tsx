import { useMostUpcomingWebinarData } from "@/hooks/use-most-upcoming-webinar";
import { Button } from "@/ui/button";
import { cn } from "@/utils/cn";
import { ComponentProps, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { env } from "@repo/env";
import { registerForWebinarServerFn } from "@/integrations/server-functions/payment/webinar";
import { useServerFn } from "@tanstack/react-start";
import { VITE_APP_NAME } from "@/utils/const";

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
        `border-primary-500 fixed bottom-0 isolate z-9998 flex w-full flex-col items-center gap-y-4 border-t py-4 text-white md:flex-row md:justify-between`,
        props.className,
      )}
    >
      <Timer />
      <BuyNowButton />
      <div
        aria-hidden
        data-background
        className={cn(
          `bg-primary-900 dark:bg-primary-50 absolute top-0 left-0 -z-1 h-full w-full backdrop-blur-xs`,
        )}
      />
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
        `text-accent-500 dark:text-accent-950 flex flex-col items-center justify-start space-y-2 md:justify-center`,
        props.className,
      )}
    >
      <CountdownTimer targetDate={new Date(data.scheduledDate)} />
    </div>
  );
}

function BuyNowButton({ ...props }: ComponentProps<"div">) {
  const { data } = useMostUpcomingWebinarData();
  const buyNowButtonRef = useRef(null);
  const { Razorpay } = useRazorpay();
  const registerForWebinar = useServerFn(registerForWebinarServerFn);

  useGSAP(
    () => {
      if (!data) return;

      gsap.fromTo(
        buyNowButtonRef.current,
        {
          scale: 1.1,
        },
        { yoyo: true, repeat: -1, scale: 0.9 },
      );
    },
    { dependencies: [data] },
  );

  if (!data) return null;

  const { actualPrice, discountedPrice, id } = data;

  async function buyWebinar() {
    const order = await registerForWebinar({
      data: {
        amount: {
          rupee: discountedPrice ?? actualPrice,
          paise: 0,
        },
        webinarDetails: { id },
      },
    });

    const { amount } = order;

    const razorpayOrderOptions: RazorpayOrderOptions = {
      amount: Number(amount),
      currency: "INR",
      key: env.VITE_RAZOR_PAY_KEY,
      name: VITE_APP_NAME,
      order_id: order.id,
    };

    const razorpayClient = new Razorpay(razorpayOrderOptions);

    razorpayClient.open();
  }

  return (
    <div {...props} className={cn(`flex flex-col gap-y-2`, props.className)}>
      <Button
        ref={buyNowButtonRef}
        variant={"primary"}
        onClick={buyWebinar}
        className={cn(
          `bg-accent-500 w-full text-xl md:w-auto`,
          props.className,
        )}
      >
        Register @{" "}
        {data.discountedPrice && <span>₹{data.discountedPrice}</span>}
        <span
          className={cn(``, { "text-sm line-through": data.discountedPrice })}
        >
          ₹{data.actualPrice}
        </span>{" "}
      </Button>

      <div className={cn(`text-center font-bold text-white max-md:hidden`)}>
        {data.webinarTopic}
      </div>
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
        `bg-accent-500 flex min-w-16 flex-col items-center rounded-lg px-4 py-2 text-white`,
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
