import { env } from "@repo/env";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

/**
 * Extract consistent and a default of options
 */
export type DefaultRazorpayOptions = Pick<
  RazorpayOrderOptions,
  "key" | "currency" | "name" | "theme"
>;

/**
 * Extract variable options
 */
export type VariableRazorpayOptions = Omit<
  RazorpayOrderOptions,
  "key" | "currency" | "name" | "theme"
>;

/**
 * This is custom hook because the `currency`, `name`, `key`, `theme`
 * is consistent across the application, so we do not need to
 * use them again and again everywhere we use razorpay. Declare them once and
 * use multiple times.
 */
export function useRazorpayClient() {
  const { Razorpay, error, isLoading } = useRazorpay();

  const DEFAULT_OPTIONS: DefaultRazorpayOptions = {
    key: env.VITE_RAZOR_PAY_KEY,
    currency: "INR",
    name: "Sanjib Academy",
    theme: {
      color: "#3399cc",
    },
  };

  /**
   * Provide the default options and export the function
   */
  function createRazorpayInstance(options: VariableRazorpayOptions) {
    return new Razorpay({
      ...DEFAULT_OPTIONS,
      ...options,
      handler: async (respose) => {
        console.log(respose);
      },
    });
  }

  return { createRazorpayInstance, error, isLoading };
}
