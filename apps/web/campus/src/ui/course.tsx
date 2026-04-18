import { Button } from "@/ui/button";
import { cn } from "@/utils/cn";
import { Check, Download, UserPlus } from "lucide-react";
import { ComponentProps } from "react";

export function Course({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot={`course`}
      className={cn(
        `bg-primary-50 border-primary-500 flex w-full max-w-100 flex-col space-y-4 rounded-2xl border p-4 sm:p-5 lg:p-6`,
        className,
      )}
      {...props}
    />
  );
}

export function CourseTopic({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      data-slot={`course-topic`}
      className={cn(
        `text-primary-500 text-lg font-semibold sm:text-xl md:text-2xl`,
        className,
      )}
      {...props}
    />
  );
}

export function CourseHeading({ className, ...props }: ComponentProps<"h4">) {
  return (
    <h4
      data-slot={`course-heading`}
      className={cn(`text-sm sm:text-base md:text-lg`, className)}
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
    <div
      data-slot={`course-pricing`}
      className={cn("mb-6 text-2xl font-semibold sm:text-3xl", className)}
      {...props}
    >
      {!discountedPrice && <span>₹ {numberFormatter.format(actualPrice)}</span>}

      {discountedPrice && (
        <div className="flex flex-wrap items-end gap-2 sm:gap-3">
          <span>₹ {numberFormatter.format(discountedPrice)}</span>

          <span className="text-muted-foreground text-lg line-through sm:text-xl">
            ₹ {numberFormatter.format(actualPrice)}
          </span>

          <span className="bg-primary-100 border-primary-500 text-primary-700 rounded-full border px-2 py-1 text-xs font-medium">
            Save ₹{numberFormatter.format(saved)} ({percent}%)
          </span>
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
      className={cn(`space-y-2 text-sm sm:text-base`, className)}
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
      className={cn(`flex items-start gap-2`, className)}
      {...props}
    >
      <span className="mt-1 inline-block rounded-full bg-green-500">
        <Check className="size-4 p-0.5 text-white" />
      </span>
      {props.children}
    </li>
  );
}

export function CourseCardFooter({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`course-card-footer`}
      className={cn(
        `mt-auto flex w-full flex-col flex-wrap gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between`,
        className,
      )}
      {...props}
    />
  );
}

export function CourseEnrollNow({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot={`course-enroll-now`}
      className={cn(
        `flex w-full items-center justify-center gap-2 rounded-none text-sm font-semibold uppercase sm:w-auto sm:text-base`,
        className,
      )}
      {...props}
    >
      <span>Enroll Now</span>
      <UserPlus className="size-4 sm:size-5" />
    </Button>
  );
}

export function DownloadCourseBrochure({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot={`download-course-brochure`}
      variant="outline"
      className={cn(
        `flex w-full items-center justify-center gap-2 rounded-none text-sm sm:w-auto sm:text-base`,
        className,
      )}
      {...props}
    >
      <span>Download Brochure</span>
      <Download className="size-4 sm:size-5" />
    </Button>
  );
}
