import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function Course({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot={`course`}
      className={cn(
        `group border-primary-200 bg-background hover:border-primary-500 flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`,
        className,
      )}
      {...props}
    />
  );
}

export function CourseDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      data-slot={`course-description`}
      className={cn(`text-muted-foreground mb-4 text-sm`, className)}
      {...props}
    />
  );
}

export function CourseHeading({ className, ...props }: ComponentProps<"h4">) {
  return (
    <h4
      data-slot={`course-heading`}
      className={cn(`mb-2 text-lg font-semibold`, className)}
      {...props}
    />
  );
}

export function CoursePricing({
  actualPrice,
  discountedPrice,
  className,
  ...props
}: { actualPrice: number; discountedPrice?: number } & ComponentProps<"div">) {
  const saved = discountedPrice ? actualPrice - discountedPrice : 0;
  const percent = discountedPrice ? Math.round((saved / actualPrice) * 100) : 0;

  const numberFormatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  });

  return (
    <div className={cn("mt-auto", className)} {...props}>
      {percent ? (
        <>
          <div className="mb-3 flex items-center gap-3">
            <span className="text-primary text-xl font-semibold">
              ₹{discountedPrice}
            </span>

            <span className="text-muted-foreground text-sm line-through">
              ₹{actualPrice}
            </span>

            <span className="rounded-full border border-green-500 bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
              {numberFormatter.format(percent)}% OFF
            </span>
          </div>

          <p className="text-muted-foreground mb-4 text-xs">
            You save ₹{saved}
          </p>
        </>
      ) : (
        <div className="mb-4">
          <span className="text-xl font-semibold">₹{actualPrice}</span>
        </div>
      )}
    </div>
  );
}

export function LearningTopicList({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      data-slot={`learning-topic-list`}
      className={cn(`mb-5 space-y-2`, className)}
      {...props}
    />
  );
}

export function LearningTopicItem({
  className,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      data-slot={`learning-topic-item`}
      className={cn(
        `text-muted-foreground flex items-start gap-2 text-sm`,
        className,
      )}
      {...props}
    >
      <span className="bg-primary mt-1 h-1.5 w-1.5 shrink-0 rounded-full" />
      {props.children}
    </li>
  );
}
