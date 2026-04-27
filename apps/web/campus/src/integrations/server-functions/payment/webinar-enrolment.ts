import { razorpay } from "@/integrations/razorpay/server";
import { middleware__registerWebinar } from "@/middleware/register-webinar";
import { registerForWebinarInputValidator } from "@/utils/zod-schema";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import {
  create__WebinarBuyingProfileServerFn,
  read__OneWebinarBuyingProfileServerFn,
} from "../querry/webinar-buying-profiles";

export const createOrderForWebinarServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(registerForWebinarInputValidator))

  .middleware([middleware__registerWebinar])
  .handler(async ({ data, context }) => {
    const { rupee, paise } = data.amount;
    const { id: webinarId } = data.webinarDetails;
    const { user } = context.session;
    const { email: userEmail } = user;
    const existingWebinarBoughtByEmail =
      await read__OneWebinarBuyingProfileServerFn({
        data: {
          identifier: { userEmail, webinarId },
        },
      });
    if (!existingWebinarBoughtByEmail) {
      const amount = rupee * 100 + paise;
      const orderDetails = await razorpay.orders.create({
        amount,
        currency: "INR",
      });
      await create__WebinarBuyingProfileServerFn({
        data: {
          amountPaid: 0,
          orderId: orderDetails.id,
          userEmail,
          webinarId,
          isCompleted: false,
        },
      });
      return { orderDetails, user };
    }
    const { orderId } = existingWebinarBoughtByEmail;
    const orderDetails = await razorpay.orders.fetch(orderId);
    return { orderDetails, user };
  });
