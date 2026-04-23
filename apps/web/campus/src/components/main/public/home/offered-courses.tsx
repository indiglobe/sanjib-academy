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
} from "@/ui/course";
import { Button } from "@/ui/button";

export function OfferedCourses({
  className,
  ...props
}: ComponentProps<"section">) {
  const { offeredCourses } = useLoaderData({
    from: "/(public)/(landing-pages)/",
  });

  return (
    <section className={cn("py-14", className)} {...props}>
      <div className="mx-auto max-w-7xl px-4">
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

                <CoursePricing
                  discountedPrice={course.discountedEnrlomentFee ?? undefined}
                  actualPrice={course.originalEnrlomentFee}
                />

                {/* PRICE SECTION */}

                {/* CTA BUTTONS */}
                <div className="flex gap-2 *:w-full">
                  <Link
                    className="flex-1"
                    tabIndex={-1}
                    to="/resources/course/$courseId"
                    params={{ courseId: course.id }}
                  >
                    <Button
                      variant="outline"
                      className="hover:bg-muted border-primary-500 dark:border-primary-100 text-primary-500 dark:text-foreground w-full rounded-none border px-4 py-2 text-sm font-medium transition"
                    >
                      View Details
                    </Button>
                  </Link>

                  <Button
                    variant="primary"
                    className="bg-primary-500 w-full flex-1 rounded-none px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
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
  );
}
