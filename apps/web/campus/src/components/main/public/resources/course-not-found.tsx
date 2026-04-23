import { ComponentProps } from "react";
import { cn } from "@/utils/cn";
import { Link } from "@tanstack/react-router";

export function CoursesNotFound({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      {...props}
      className={cn(
        `flex min-h-[70vh] w-full items-center justify-center`,
        className,
      )}
      data-slot={`courses-not-found`}
    >
      <div
        className={cn(
          `relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 text-center`,
        )}
      >
        {/* subtle balanced glow */}
        <div
          className={cn(
            `from-primary-500/20 via-accent-500/10 to-secondary-500/20 absolute inset-0 -z-10 bg-linear-to-br opacity-50 blur-2xl`,
          )}
        />

        {/* Label */}
        <p
          className={cn(
            `text-primary-600 dark:text-primary-400 text-sm font-medium tracking-wide`,
          )}
        >
          404 — Courses Not Found
        </p>

        {/* Heading */}
        <h1
          className={cn(
            `text-foreground text-2xl font-semibold sm:text-3xl lg:text-4xl`,
          )}
        >
          No courses available right now
        </h1>

        {/* Description */}
        <p className={cn(`text-foreground/70 max-w-lg text-sm sm:text-base`)}>
          The courses you’re looking for may not exist, are currently
          unavailable, or the link might be incorrect. You can explore available
          resources or return to the homepage.
        </p>

        {/* Actions */}
        <div
          className={cn(
            `flex w-full flex-col gap-3 pt-2 sm:flex-row sm:justify-center`,
          )}
        >
          {/* Go Home */}
          <Link
            to="/"
            className={cn(
              `border-primary-300 dark:border-primary-700 hover:bg-primary-100/40 dark:hover:bg-primary-900/40 border px-6 py-2 text-center text-sm font-medium transition`,
            )}
          >
            Go to Home
          </Link>

          {/* Browse Resources */}
          <Link
            to="/resources"
            className={cn(
              `bg-primary-500 hover:bg-primary-600 px-6 py-2 text-center text-sm font-medium text-white transition`,
            )}
          >
            Browse Courses
          </Link>
        </div>

        {/* Extra hint */}
        <p className={cn(`text-foreground/50 pt-4 text-xs`)}>
          New courses are added regularly. Check back soon.
        </p>
      </div>
    </section>
  );
}
