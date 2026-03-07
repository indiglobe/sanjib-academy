import { env } from "@/lib/env";
import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: env.RAZOR_PAY_KEY,
  key_secret: env.RAZOR_PAY_SECRET,
});
