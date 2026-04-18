import { createCourseEnrolmentRazorpayOrderServerFn } from "@/integrations/server-functions/payment/course-enrolment";
import { cn } from "@/utils/cn";
import { useLoaderData, useLocation } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ComponentProps } from "react";
import { TCourseEnrolmentInputValidator } from "@/utils/zod-schema";
import {
  useRazorpayClient,
  RazorpayOptions,
} from "@/integrations/razorpay/client";
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
} from "@/ui/course";
import { SectionHeading } from "./home";

export function OfferedCourses({
  className,
  ...props
}: ComponentProps<"section">) {
  const { offeredCourses } = useLoaderData({
    from: "/(public)/(landing-pages)/",
  });

  const courseEnrolmentRazorpayOrder = useServerFn(
    createCourseEnrolmentRazorpayOrderServerFn,
  );

  const location = useLocation();
  const { createRazorpayInstance } = useRazorpayClient();

  async function enrollToCourse(params: TCourseEnrolmentInputValidator) {
    const { amount, id } = await courseEnrolmentRazorpayOrder({ data: params });

    const razorpayOptions: RazorpayOptions = {
      amount: Number(amount),
      order_id: id,
      handler: () => {
        // Redirect to another page after successful payment
        window.location.href = `/${"fdfdfd"}/dashboard`; // change this to your target page
      },
    };

    const razorpayClient = createRazorpayInstance(razorpayOptions);
    razorpayClient.open();
  }

  return (
    <section
      data-slot={`offered-courses`}
      className={cn(`py-10 sm:py-14 lg:py-20`, className)}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6">
        <SectionHeading
          id={"offered-courses"}
          className={cn(`pb-6 text-center sm:pb-8`)}
        >
          Courses we offer
        </SectionHeading>

        <div className="flex w-full flex-wrap items-stretch justify-center gap-6 xl:flex-nowrap">
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
                    {advantages.map(({ id, details, isVisible }) =>
                      isVisible ? (
                        <LearningTopicItem key={id}>
                          {details}
                        </LearningTopicItem>
                      ) : null,
                    )}
                  </LearningTopicList>

                  <CourseCardFooter>
                    <CourseEnrollNow
                      onClick={async () =>
                        await enrollToCourse({
                          amount: {
                            paise: 0,
                            rupee:
                              discountedEnrlomentFee ?? originalEnrlomentFee,
                          },
                          courseDetails: id as any,
                          requestInitiatedFrom: location.publicHref,
                        })
                      }
                    />
                    <DownloadCourseBrochure />
                  </CourseCardFooter>
                </Course>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
