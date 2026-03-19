import { Button } from "@/ui/button";
import { cn } from "@/utils/cn";
import { Check, Download, UserPlus } from "lucide-react";
import { ComponentProps } from "react";

export function Course({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `bg-primary-50 border-primary-500 flex max-w-80 flex-col space-y-4 rounded-2xl border px-4 py-6`,
        props.className,
      )}
    />
  );
}

export function CourseTopic({ ...props }: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className={cn(`text-primary-500 text-2xl font-semibold`, props.className)}
    />
  );
}

export function CourseHeading({ ...props }: ComponentProps<"h4">) {
  return <h4 {...props} className={cn(``, props.className)} />;
}

export function CoursePricing({
  actualPrice,
  discountedPrice,
  ...props
}: { actualPrice: number; discountedPrice?: number } & ComponentProps<"div">) {
  const saved = discountedPrice ? actualPrice - discountedPrice : 0;
  const percent = discountedPrice ? Math.round((saved / actualPrice) * 100) : 0;
  const numberFormatter = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  });

  return (
    <div
      {...props}
      className={cn("mb-8 text-3xl font-semibold", props.className)}
    >
      {!discountedPrice && (
        <span>
          <span>₹ </span>
          <span>{numberFormatter.format(actualPrice)}</span>
        </span>
      )}

      {discountedPrice && (
        <div className="flex flex-wrap items-end gap-3">
          {/* Discounted price */}
          <span>
            <span>₹ </span>
            <span>{numberFormatter.format(discountedPrice)}</span>
          </span>

          {/* Original price */}
          <span className="text-muted-foreground text-xl line-through">
            ₹ {numberFormatter.format(actualPrice)}
          </span>

          {/* Save badge */}
          <span className="bg-primary-100 border-primary-500 text-primary-700 rounded-full border px-2 py-1 text-xs font-medium">
            Save ₹{numberFormatter.format(saved)} ({percent}%)
          </span>
        </div>
      )}
    </div>
  );
}

export function LearningTopicList({ ...props }: ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      data-slot={`learning-topic-list`}
      className={cn(`space-y-2`, props.className)}
    />
  );
}

export function LearningTopicItem({ ...props }: ComponentProps<"li">) {
  return (
    <li
      {...props}
      data-slot={`learning-topic-item`}
      className={cn(`flex items-start gap-2`, props.className)}
    >
      <span className={cn(`mt-1 inline-block rounded-full bg-green-500`)}>
        <Check className={cn(`size-4 p-0.5 text-white`)} />
      </span>
      {props.children}
    </li>
  );
}
export function CourseCardFooter({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot={`course-content-footer`}
      className={cn(
        `mt-auto flex w-full flex-wrap items-center justify-between gap-4 pt-8`,
        props.className,
      )}
    />
  );
}

export function CourseEnrollNow({ ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      data-slot={`course-enroll-now`}
      className={cn(
        `flex items-center justify-center gap-2 rounded-none font-semibold text-white uppercase`,
        props.className,
      )}
    >
      <span>Enroll Now</span>
      <span>
        <UserPlus />
      </span>
    </Button>
  );
}

export function DownloadCourseBrochure({
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      data-slot={`download-course-brochure`}
      variant={"outline"}
      className={cn(
        `jucen flex items-center gap-2 rounded-none`,
        props.className,
      )}
    >
      <span>Download Brochure</span>
      <span>
        <Download />
      </span>
    </Button>
  );
}
