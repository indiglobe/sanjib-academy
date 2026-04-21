import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

/* Root */
export function LearningStep({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `group relative w-full max-w-xs rounded-2xl border border-gray-200 bg-white p-6 pt-10 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`,
        props.className,
      )}
    >
      {/* subtle glow */}
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="bg-primary-200 absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full opacity-30 blur-2xl"></div>
      </div>

      <div className="z-10 space-y-3">{props.children}</div>
    </div>
  );
}

/* Step Badge */
export function LearningStepCount({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `absolute top-0 left-6 -translate-y-1/2 rounded-full bg-linear-to-r from-indigo-500 to-purple-600 px-4 py-1 text-xs font-semibold text-white shadow-md`,
        props.className,
      )}
    />
  );
}

/* Heading */
export function LearningStepHeading({ ...props }: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className={cn(
        `text-lg font-semibold text-gray-900 md:text-xl`,
        props.className,
      )}
    />
  );
}

/* Content */
export function LearningStepDetails({ ...props }: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn(`text-sm leading-relaxed text-gray-600`, props.className)}
    />
  );
}
