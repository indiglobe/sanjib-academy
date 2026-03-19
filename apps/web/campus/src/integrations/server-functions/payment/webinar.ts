import { razorpay } from "@/integrations/razorpay";
import { checkExistingUserMiddleware } from "@/middleware/auth";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const registerForWebinarInputValidator = z.object({
  amount: z.object({
    rupee: z.number(),
    paise: z.number(),
  }),
  webinarDetails: z.object({ id: z.number() }),
});

export const registerForWebinarServerFn = createServerFn({ method: "POST" })
  .inputValidator(zodValidator(registerForWebinarInputValidator))
  .middleware([checkExistingUserMiddleware])
  .handler(async ({ data, context }) => {
    const { rupee, paise } = data.amount;
    const { id: webinarId } = data.webinarDetails;

    const amount = rupee * 100 + paise;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
    });

    return order;
  });
