import { env } from "@repo/env";
import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY,
  key_secret: process.env.RAZOR_PAY_SECRET,
});
