import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function MasterClassCard({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `group relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`,
        props.className,
      )}
    >
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* Soft background glow */}
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-purple-200 opacity-30 blur-3xl"></div>
      </div>

      <div className="relative z-10 space-y-4">{props.children}</div>
    </div>
  );
}

export function MasterClassIcon({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-md transition-transform duration-300 group-hover:scale-105 [&>svg]:size-7`,
        props.className,
      )}
    />
  );
}

export function MasterClassHeading({ ...props }: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className={cn(
        `text-primary-500 dark:text-primary-900 text-lg font-semibold md:text-xl`,
        props.className,
      )}
    />
  );
}

export function MasterClassContent({ ...props }: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn(
        `text-sm leading-relaxed text-gray-600 dark:text-gray-400`,
        props.className,
      )}
    />
  );
}
