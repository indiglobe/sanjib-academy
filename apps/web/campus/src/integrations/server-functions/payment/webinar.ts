import { razorpay } from "@/integrations/razorpay/server";
import { registerWebinarMiddleware } from "@/middleware/register-webinar";
import { registerForWebinarInputValidator } from "@/utils/zod-schema";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";

export const registerForWebinarServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(registerForWebinarInputValidator))
  .middleware([registerWebinarMiddleware])
  .handler(async ({ data, context }) => {
    const { rupee, paise } = data.amount;
    const { id: webinarId } = data.webinarDetails;

    const amount = rupee * 100 + paise;

    console.log(amount);

    // const order = await razorpay.orders.create({
    //   amount,
    //   currency: "INR",
    // });

    // return order;
  });
