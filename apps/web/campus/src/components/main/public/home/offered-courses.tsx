import { createCourseEnrolmentRazorpayOrderServerFn } from "@/integrations/server-functions/payment/course-enrolment";
import { cn } from "@/utils/cn";
import { useLoaderData, useLocation } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SectionHeading } from "./home";
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
} from "../../../../ui/course";
import { ComponentProps } from "react";
import { TCourseEnrolmentInputValidator } from "@/utils/zod-schema";
import {
  useRazorpayClient,
  VariableRazorpayOptions,
} from "@/integrations/razorpay/client";

export function OfferedCourses({ ...props }: ComponentProps<"section">) {
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

    const razorpayOptions: VariableRazorpayOptions = {
      amount: Number(amount),
      order_id: id,
    };

    const razorpayClient = createRazorpayInstance(razorpayOptions);

    razorpayClient.open();
  }

  return (
    <section
      {...props}
      data-slot={`offered-courses`}
      className={cn(`pt-10`, props.className)}
    >
      <div className={cn(`flex flex-col items-center`)}>
        <SectionHeading
          id={"offered-courses"}
          className={cn(`pb-4 text-center`)}
        >
          Courses we offer
        </SectionHeading>

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
                    <CourseEnrollNow
                      onClick={() =>
                        enrollToCourse({
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
