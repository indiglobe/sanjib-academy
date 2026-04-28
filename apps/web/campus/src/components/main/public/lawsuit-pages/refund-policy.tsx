import { ComponentProps } from "react";
import { Main } from "@/components/main/public/main";
import { cn } from "@/utils/cn";
import { env } from "@repo/env";
import LawsuitContentWrapper from "@/components/main/public/lawsuit-pages/lawsuit-content-wrapper";

const effectiveDate = "2026-02-25";

const formatedEffectiveDate = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "full",
}).format(new Date(effectiveDate));

/**
 * If you ever change the content of the component
 * REMEBER to CHANGE the `effectiveDate` in `YYYY-MM-DD` format
 */
export default function RefundPolicy({
  ...props
}: ComponentProps<typeof Main>) {
  return (
    <Main {...props} className={cn(`mt-0`, props.className)}>
      <LawsuitContentWrapper>
        <h1 className={cn(``)}>Refund Policy</h1>
        <p className={cn(``)}>Effective Date: {formatedEffectiveDate}</p>

        <section>
          <h2 className={cn(``)}>1. No Guarantee of Profits</h2>
          <p className={cn(``)}>
            By enrolling in our stock market course, mentorship program, or
            purchasing any digital product or service from our website, you
            acknowledge and agree that trading and investing in financial
            markets involve significant risk.
          </p>
          <p className={cn(``)}>
            We do not guarantee profits, income, or specific results.
          </p>
          <p className={cn(``)}>
            All educational content is provided strictly for informational and
            educational purposes.
          </p>
        </section>

        <section>
          <h2 className={cn(``)}>
            2. Digital Product Policy (Strict No Refund)
          </h2>
          <p className={cn(``)}>
            Due to the digital nature of our courses, recorded sessions,
            downloadable materials, indicators, and strategy documents:
          </p>
          <ul>
            <li>All sales are final</li>
            <li>No refunds will be issued once access has been granted</li>
            <li>No refunds will be provided for partial completion</li>
            <li>No refunds will be issued for lack of results</li>
          </ul>
          <p className={cn(``)}>
            Once login credentials, downloadable files, or course access is
            delivered, it is considered “used.”
          </p>
        </section>

        <section>
          <h2 className={cn(``)}>3. Invoice Generation</h2>
          <ul>
            <li>
              Upon successful payment, an invoice will be generated and sent to
              the email address provided during checkout.
            </li>
            <li>
              This invoice serves as confirmation of purchase and should be
              retained for your records.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={cn(``)}>4. Live Mentorship Programs</h2>
          <p>For live mentorship or webinar-based programs:</p>
          <ul>
            <li>
              Refund requests must be made within 24 hours of payment and before
              attending the first live session
            </li>
            <li>
              Once any live session is attended, no refund will be processed
            </li>
            <li>
              Administrative/processing charges (if applicable) may be deducted
            </li>
          </ul>
        </section>

        <section>
          <h2 className={cn(``)}>
            5. No Refund Policy for Non-Refundable Products
          </h2>
          <ul>
            <li>
              For non-refundable products (including the workshop), once the
              invoice is generated, no refunds will be granted.
            </li>
            <li>
              This policy protects the intellectual property rights and
              time-bound services associated with our products.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={cn(``)}>6. Quality Assurance</h2>
          <ul>
            <li>We strive to provide high-quality content and services.</li>
            <li>
              If you have any questions or concerns about a product before
              purchasing, please contact us for clarification.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={cn(``)}>7. Communication Standards</h2>
          <ul>
            <li>
              Verbal abuse, disrespectful messages, or inappropriate behavior
              will not be considered valid grounds for refunds.
            </li>
            <li>
              We maintain the right to deny refund requests if communication is
              abusive or disrespectful.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={cn(``)}>8. Technical Issues</h2>
          <p>If you face genuine technical access issues:</p>
          <ul>
            <li>You must report the issue within 48 hours</li>
            <li>Our support team will assist in resolving access problems</li>
            <li>
              Refunds will not be issued for device incompatibility, poor
              internet connection, or lack of technical knowledge
            </li>
          </ul>
        </section>

        <section>
          <h2 className={cn(``)}>9. Duplicate Payment</h2>
          <p>In case of accidental duplicate payment:</p>
          <ul>
            <li>The excess amount will be refunded after verification</li>
            <li>Processing time may take 7-10 business days</li>
          </ul>
        </section>

        <section>
          <h2 className={cn(``)}>10. Chargebacks & Disputes</h2>
          <p>
            Initiating a chargeback without contacting support first may result
            in:
          </p>
          <ul>
            <li>Immediate suspension of access</li>
            <li>Permanent ban from future programs</li>
            <li>Legal action if deemed fraudulent</li>
          </ul>
        </section>

        <section>
          <h2 className={cn(``)}>11. Exceptional Circumstances</h2>
          <p>
            Refunds, if any, are granted solely at the discretion of the company
            management and will only be considered in extraordinary cases.
          </p>
        </section>

        <section>
          <h2 className={cn(``)}>12. Contact Information</h2>
          <p>For refund-related inquiries, contact:</p>

          <ul>
            <li>
              📧 Email:{" "}
              <a href="mailto:gangulysanjibkumar@gmail.com">
                gangulysanjibkumar@gmail.com
              </a>
            </li>
            <li>
              📞 Phone: <a href="tel:+919876543210">987 654 3210</a>
            </li>
            <li>
              🌐 Website:{" "}
              <a href={import.meta.env.VITE_CAMPUS_APP_HOST}>Sanjib Academy</a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className={cn(``)}>Agreement</h2>
          <p>
            By purchasing any product or service from our website, you confirm
            that you have read, understood, and agreed to this Refund Policy.
          </p>
        </section>
      </LawsuitContentWrapper>
    </Main>
  );
}
