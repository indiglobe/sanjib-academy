import { razorpay } from "@/integrations/razorpay/server";
import { middleware__courseEnrolment } from "@/middleware/course-enrolment";
import { courseEnrolmentInputValidator } from "@/utils/zod-schema";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { read__CoursesBoughtByEmailServerFn } from "../querry/course-buying-profiles";

export const createCourseEnrolmentRazorpayOrderServerFn = createServerFn({
  method: "POST",
})
  .middleware([middleware__courseEnrolment])
  .inputValidator(zodValidator(courseEnrolmentInputValidator))
  .handler(async ({ context }) => {
    // Destructure returned context
    const {
      amount: { paise, rupee },
      courseDetails,
      session: {
        user: { email },
      },
    } = context;

    // check if the user already bought the course or not
    const coursesBoughtByEmail = await read__CoursesBoughtByEmailServerFn({
      data: { courseId: courseDetails, email },
    });

    if (coursesBoughtByEmail) {
      // todo: redirect the user to dashboard page with the course
    }

    // convert amount into paise that is accepted by the razorpay
    const amountToAcceptByRazorpay = rupee * 100 + paise;

    // create a razorpay order and store order details in a variable
    const orderDetails = await razorpay.orders.create({
      amount: amountToAcceptByRazorpay,
      currency: "INR",
    });

    return orderDetails;
  });
