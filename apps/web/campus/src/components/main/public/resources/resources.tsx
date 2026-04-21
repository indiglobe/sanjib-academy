import { Main } from "@/components/main/public/main";
import { cn } from "@/utils/cn";
import { Link, useLoaderData } from "@tanstack/react-router";
import { ComponentProps } from "react";
import {
  Course,
  CourseDescription,
  CourseHeading,
  CoursePricing,
  LearningTopicItem,
  LearningTopicList,
} from "../../../../ui/course";
import { Button } from "@/ui/button";

export default function Courses() {
  return (
    <Main>
      <CoursesSection />
      <WebinarTable />
    </Main>
  );
}

export function CoursesSection({
  className,
  ...props
}: ComponentProps<"section">) {
  const { offeredCourses } = useLoaderData({
    from: "/(public)/(landing-pages)/resources/",
  });

  return (
    <section
      {...props}
      className={cn(`mb-20 space-y-16`, className)}
      data-slot={`courses-section`}
    >
      {/* Heading Area */}
      <div
        className={cn(
          `mx-auto flex max-w-7xl flex-col items-center gap-4 text-center`,
        )}
      >
        <div className={cn(`relative inline-block`)}>
          <h2
            className={cn(
              `text-primary-500 dark:text-primary-950 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl`,
            )}
          >
            Explore Our Courses
          </h2>

          {/* Accent underline */}
          <span
            className={cn(
              `from-primary-500 via-accent-500 to-secondary-500 absolute -bottom-2 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-linear-to-r`,
            )}
          />
        </div>

        <p
          className={cn(
            `dark:text-primary-950/70 text-primary-500/70 max-w-2xl text-sm leading-relaxed sm:text-base`,
          )}
        >
          Structured programs designed to help you understand markets, build
          conviction, and execute with confidence — whether you're just starting
          or refining your edge.
        </p>
      </div>

      {/* Courses Grid */}
      <section className={cn(`py-10`)}>
        <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
          <div
            className={cn(
              `grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6`,
            )}
          >
            {offeredCourses.map((course) => {
              return (
                <Course key={course.id}>
                  {/* Title */}
                  <CourseHeading>{course.courseTopic}</CourseHeading>

                  {/* Description */}
                  <CourseDescription>{course.courseHeading}</CourseDescription>

                  {/* Advantages */}
                  <LearningTopicList>
                    {course.advantages.map((item, i) => (
                      <LearningTopicItem
                        key={i}
                        className="text-muted-foreground flex items-start gap-2 text-sm"
                      >
                        <span>{item.details}</span>
                      </LearningTopicItem>
                    ))}
                  </LearningTopicList>

                  {/* PRICE SECTION */}
                  <CoursePricing
                    discountedPrice={course.discountedEnrlomentFee ?? undefined}
                    actualPrice={course.originalEnrlomentFee}
                  />

                  {/* CTA BUTTONS */}
                  <div className="flex gap-2">
                    <Button
                      variant={"outline"}
                      className={`hover:bg-muted border-primary-500 dark:border-primary-900 text-primary-500 dark:text-foreground flex-1 rounded-none border px-4 py-2 text-sm font-medium transition`}
                    >
                      <Link className={cn(``)} tabIndex={-1} to="/resources">
                        View Details
                      </Link>
                    </Button>

                    <Button
                      variant={"primary"}
                      className={`bg-primary-500 flex-1 rounded-none px-4 py-2 text-sm font-medium text-white transition hover:opacity-90`}
                    >
                      Enroll Now
                    </Button>
                  </div>
                </Course>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
  }).format(date);
}

function getRelativeTime(date: Date) {
  const now = new Date();
  const diff = Math.ceil(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diff <= 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return `in ${diff} days`;
}

function formatSeconds(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  // Format with leading zeros using padStart()
  return [hours, minutes, seconds]
    .map((val) => val.toString().padStart(2, "0"))
    .join(":");
}

export function WebinarTable({
  className,
  ...props
}: ComponentProps<"section">) {
  const { webinars } = useLoaderData({
    from: "/(public)/(landing-pages)/resources/",
  });

  return (
    <section
      {...props}
      className={cn(`w-full`, className)}
      data-slot={`webinar-table`}
    >
      {/* 🔥 Section Heading */}
      <div className={cn(`mb-10 flex flex-col items-center gap-3 text-center`)}>
        <div className={cn(`relative inline-block`)}>
          <h2
            className={cn(
              `text-primary-500 dark:text-primary-950 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl`,
            )}
          >
            Upcoming Live Webinars
          </h2>

          {/* Accent underline */}
          <span
            className={cn(
              `from-primary-500 via-accent-500 to-secondary-500 absolute -bottom-2 left-1/2 h-0.5 w-20 -translate-x-1/2 bg-linear-to-r`,
            )}
          />
        </div>

        <p
          className={cn(
            `dark:text-primary-950/70 text-primary-500/70 max-w-2xl text-sm leading-relaxed sm:text-base`,
          )}
        >
          Join our upcoming sessions to learn how markets actually move,
          understand institutional strategies, and improve your execution.
        </p>
      </div>

      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        {/* Empty State */}
        {webinars.length === 0 ? (
          <div
            className={cn(
              `border-primary-500/40 dark:border-primary-500/40 bg-primary-50 dark:bg-primary-50/10 flex flex-col items-center justify-center gap-4 border py-20 text-center`,
            )}
          >
            <div
              className={cn(
                `text-primary-500 dark:text-primary-400 text-lg font-medium`,
              )}
            >
              No Webinars Available
            </div>
            <p
              className={cn(
                `text-primary-900/70 dark:text-primary-900/70 max-w-md text-sm`,
              )}
            >
              We're preparing new sessions. Stay tuned — upcoming webinars will
              be available soon.
            </p>
          </div>
        ) : (
          <div
            className={cn(
              `border-primary-200/40 dark:border-primary-800/40 w-full overflow-x-auto border`,
            )}
          >
            <table className={cn(`w-full min-w-200 text-left`)}>
              {/* Header */}
              <thead className={cn(`bg-primary-50 dark:bg-primary-100/10`)}>
                <tr>
                  <th
                    className={cn(
                      `text-primary-500 px-4 py-3 text-sm font-medium`,
                    )}
                  >
                    Webinar
                  </th>
                  <th
                    className={cn(
                      `text-primary-500 px-4 py-3 text-sm font-medium`,
                    )}
                  >
                    Schedule
                  </th>
                  <th
                    className={cn(
                      `text-primary-500 px-4 py-3 text-sm font-medium`,
                    )}
                  >
                    Duration
                  </th>
                  <th
                    className={cn(
                      `text-primary-500 px-4 py-3 text-sm font-medium`,
                    )}
                  >
                    Price
                  </th>
                  <th className={cn(`px-4 py-3`)} />
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {webinars.map((webinar) => {
                  const date = new Date(webinar.scheduledDate);
                  const relative = getRelativeTime(date);

                  return (
                    <tr
                      key={webinar.id}
                      className={cn(
                        `border-primary-200/40 dark:border-primary-800/40 hover:bg-primary-50/40 dark:hover:bg-primary-900/30 border-t transition`,
                      )}
                    >
                      {/* Name */}
                      <td
                        className={cn(
                          `text-primary-900 px-4 py-4 text-sm font-medium`,
                        )}
                      >
                        {webinar.webinarTopic}
                      </td>

                      {/* Schedule */}
                      <td className={cn(`px-4 py-4 text-sm`)}>
                        <div className={cn(`flex flex-col gap-1`)}>
                          <span className={cn(`ttext-primary-900 font-medium`)}>
                            {formatDate(date)}
                          </span>

                          <span
                            className={cn(
                              `text-xs font-medium`,
                              relative === "Today"
                                ? "text-secondary-900/50 dark:text-secondary-900/50"
                                : "text-primary-900/50 dark:text-primary-900/50",
                            )}
                          >
                            {relative}
                          </span>
                        </div>
                      </td>

                      {/* Duration */}
                      <td
                        className={cn(
                          `text-primary-900/50 dark:text-primary-900/50 px-4 py-4 text-sm`,
                        )}
                      >
                        {webinar.approxDuration
                          ? `${formatSeconds(webinar.approxDuration / 1000)}`
                          : "—"}
                      </td>

                      {/* Price */}
                      <td className={cn(`px-4 py-4 text-sm`)}>
                        <div className={cn(`flex items-center gap-2`)}>
                          {webinar.discountedPrice && (
                            <span
                              className={cn(
                                `text-primary-900/50 dark:text-primary-900/50 text-xs line-through`,
                              )}
                            >
                              ₹{webinar.actualPrice}
                            </span>
                          )}

                          <span
                            className={cn(
                              `text-primary-500 dark:text-primary-600 text-lg font-semibold`,
                            )}
                          >
                            ₹{webinar.discountedPrice ?? webinar.actualPrice}
                          </span>
                        </div>
                      </td>

                      {/* CTA */}
                      <td
                        className={cn(
                          `flex items-center justify-center px-4 py-4`,
                        )}
                      >
                        <Button
                          className={cn(
                            `bg-primary-500 hover:bg-primary-600 rounded-none px-4 py-2 text-sm font-medium text-white transition`,
                          )}
                        >
                          Register
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Hint */}
        {webinars.length > 0 && (
          <p
            className={cn(
              `text-primary-900/60 dark:text-primary-100/60 mt-3 text-xs lg:hidden`,
            )}
          >
            Scroll horizontally to view all details →
          </p>
        )}
      </div>
    </section>
  );
}
