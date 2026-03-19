import { Main } from "@/components/main/public/main";
import { cn } from "@/utils/cn";
import { useLoaderData } from "@tanstack/react-router";
import { ComponentProps } from "react";
import {
  Course,
  CourseCardFooter,
  CourseEnrollNow,
  CourseHeading,
  CoursePricing,
  CourseTopic,
  DownloadCourseBrochure,
  LearningTopicItem,
  LearningTopicList,
} from "../home/course";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { Button } from "@/ui/button";
import { ExternalLink } from "lucide-react";

export default function Courses() {
  return (
    <Main>
      <CoursesSection />
    </Main>
  );
}

export function CoursesSection({ ...props }: ComponentProps<"section">) {
  const { offeredCourses, upcomingWebinarsList } = useLoaderData({
    from: "/(public)/(landing-pages)/courses/",
  });
  return (
    <section
      {...props}
      className={cn(`mb-20 space-y-20`, props.className)}
      data-slot={`courses-section`}
    >
      <div>
        <h2 className={cn(`mb-10 text-3xl font-semibold`)}>Courses</h2>
        <div
          className={cn(
            `flex w-full flex-wrap items-stretch justify-center gap-4`,
          )}
        >
          {offeredCourses.map(
            ({
              id,
              courseTopic,
              courseHeading,
              originalEnrlomentFee,
              discountedEnrlomentFee,
              advantages,
            }) => {
              return (
                <Course key={id}>
                  <CourseTopic>{courseTopic}</CourseTopic>
                  <CourseHeading>{courseHeading}</CourseHeading>
                  <CoursePricing
                    actualPrice={originalEnrlomentFee}
                    discountedPrice={discountedEnrlomentFee ?? undefined}
                  />
                  <LearningTopicList>
                    {advantages.map(({ id, details, isVisible }) => {
                      return isVisible ? (
                        <LearningTopicItem key={id}>
                          {details}
                        </LearningTopicItem>
                      ) : null;
                    })}
                  </LearningTopicList>

                  <CourseCardFooter>
                    <CourseEnrollNow />
                    <DownloadCourseBrochure />
                  </CourseCardFooter>
                </Course>
              );
            },
          )}
        </div>
      </div>

      <div>
        <h2 className={cn(`mb-10 text-3xl font-semibold`)}>Webinars</h2>

        <Table
          className={cn(`border-primary-400 dark:border-primary-600 border`)}
        >
          <TableHeader>
            <TableRow
              className={cn(
                `bg-primary-100 dark:bg-primary-50 border-primary-400 dark:border-primary-600`,
              )}
            >
              <TableHead className={cn(`text-center`)}>Webinar topic</TableHead>

              <TableHead>Scheduled date</TableHead>

              <TableHead className={cn(`text-center`)}>
                Webinar joining link
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingWebinarsList.map(
              ({ id, webinarTopic, webinarJoiningLink, scheduledDate }) => (
                <TableRow
                  key={id}
                  className={cn(`border-primary-400 dark:border-primary-600`)}
                >
                  <TableCell className={cn(`font-medium`)}>
                    <span>{webinarTopic}</span>
                  </TableCell>

                  <TableCell>
                    <span>
                      {Intl.DateTimeFormat("en-IN", {
                        dateStyle: "long",
                      }).format(new Date(scheduledDate))}
                      {" at "}
                      {Intl.DateTimeFormat("en-IN", {
                        timeStyle: "medium",
                      }).format(new Date(scheduledDate))}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span
                      className={cn(
                        `flex h-full w-full items-center justify-center`,
                      )}
                    >
                      <a
                        tabIndex={-1}
                        href={webinarJoiningLink}
                        target="_blank"
                      >
                        <Button
                          className={cn(
                            `flex items-center justify-center gap-2 rounded-none`,
                          )}
                        >
                          <span>Join now</span>
                          <span>
                            <ExternalLink />
                          </span>
                        </Button>
                      </a>
                    </span>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
