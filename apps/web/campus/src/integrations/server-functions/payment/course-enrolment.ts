import { razorpay } from "@/integrations/razorpay/server";
import { courseEnrolmentMiddleware } from "@/middleware/course-enrolment";
import { courseEnrolmentInputValidator } from "@/utils/zod-schema";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { readCoursesBoughtByEmailServerFn } from "../querry/course-buying-profiles";

export const createCourseEnrolmentRazorpayOrderServerFn = createServerFn({
  method: "POST",
})
  .middleware([courseEnrolmentMiddleware])
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

    const coursesBoughtByEmail = await readCoursesBoughtByEmailServerFn({
      data: { courseId: courseDetails, email },
    });

    if (coursesBoughtByEmail) {
    }

    // convert amount into paise that is accepted by the razorpay
    const amountToAcceptByRazorpay = rupee * 100 + paise;

    // create a razorpay order and store order details in a variable
    const orderDetails = await razorpay.orders.create({
      amount: amountToAcceptByRazorpay,
      currency: "INR",
      method: "upi",
    });

    return orderDetails;
  });
