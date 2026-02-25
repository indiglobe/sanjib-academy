import { cn } from "@/utils/cn";
import { Main } from "../main";
import { ComponentProps } from "react";
import LawsuitContentWrapper from "./lawsuit-content-wrapper";

const effectiveDate = "2026-02-25";

const formatedEffectiveDate = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "full",
}).format(new Date(effectiveDate));

export default function TermsAndConditions({
  ...props
}: ComponentProps<typeof Main>) {
  return (
    <Main {...props} className={cn(`mt-0`, props.className)}>
      <LawsuitContentWrapper>
        <h1 className={cn(``)}>Terms and Conditions</h1>
        <p className={cn(``)}>
          <strong>Effective Date:</strong> {formatedEffectiveDate}
        </p>

        <section className={cn(``)}>
          <h2 className={cn(``)}>1. Acceptance of Terms</h2>
          <p className={cn(``)}>
            By accessing or using this website and purchasing our stock market
            courses, you agree to be bound by these{" "}
            <strong>Terms & Conditions</strong>. If you do not agree, please do
            not use our website or services.
          </p>
        </section>

        <section className={cn(``)}>
          <h2 className={cn(``)}>2. Educational Purpose Only</h2>
          <p className={cn(``)}>
            All content provided on this website, including courses, webinars,
            videos, PDFs, charts, strategies, and mentorship sessions, is
            strictly for educational and informational purposes only.
          </p>
          <p>We do not provide:</p>
          <ul className={cn(``)}>
            <li>Investment advisory services</li>
            <li>Portfolio management services</li>
            <li>Buy/Sell recommendations</li>
            <li>Guaranteed returns</li>
          </ul>
          <p>
            Nothing on this website should be considered financial, investment,
            legal, or tax advice. You are solely responsible for your investment
            decisions.
          </p>
        </section>

        <section className={cn(``)}>
          <h2 className={cn(``)}>3. Eligibility & Registration</h2>
          <p className={cn(``)}>
            <ul className={cn(``)}>
              <li>
                The platform is open to individuals aged 18 years or older.
              </li>
              <li>
                By registering, you confirm that all information provided is
                accurate and truthful.
              </li>
              <li>
                Registration requires payment through Razorpay. Payment
                confirmation secures your access to the live session.
              </li>
            </ul>
          </p>
        </section>

        <section className={cn(``)}>
          <h2 className={cn(``)}>4. Risk disclosure</h2>
          <p className={cn(``)}>You acknowledge that:</p>
          <ul>
            <li>
              Stock market trading and investing involve significant risk.
            </li>
            <li>You may lose part or all of your capital.</li>
            <li>Past performance does not guarantee future results.</li>
            <li>
              Futures, Options, Intraday, and leveraged trading carry high risk.
            </li>
          </ul>
          <p>
            You agree that all trading decisions are made solely by you at our
            own risk.
          </p>
          <p>We shall not be liable for any financial loss or damage.</p>
        </section>

        <section>
          <h2>5. NO SEBI REGISTRATION DISCLAIMER</h2>
          <p>
            We are not registered as a SEBI Investment Advisor. We do not
            provide personalized investment advice or stock recommendations.
          </p>
        </section>

        <section>
          <h2>6. Course Access & Usage</h2>
          <ul className={cn(``)}>
            <li>Course access is for personal use only.</li>
            <li>Sharing login credentials is strictly prohibited.</li>
            <li>
              Recording, distributing, or reselling course material is not
              allowed.
            </li>
            <li>
              We reserve the right to terminate access without refund if misuse
              is detected.
            </li>
          </ul>
          <p>
            All intellectual property, including presentations, materials, and
            videos, remains the property of Sanjib Academy.
          </p>
        </section>

        <section>
          <h2>7. Payment & Refund Policy</h2>
          <ul className={cn(``)}>
            <li>All payments are processed through secure payment gateways.</li>

            <li>Fees once paid are non-refundable unless explicitly stated.</li>
            <li>In case of technical issues, support will be provided.</li>
            <li>We reserve the right to change pricing at any time.</li>
          </ul>
        </section>

        <section>
          <h2>8. USER RESPONSIBILITY</h2>
          <p>You agree that:</p>
          <ul>
            <li>You are at least 18 years old.</li>
            <li>You are legally capable of entering into this Agreement.</li>
            <li>You are solely responsible for your trading decisions.</li>
            <li>
              You will conduct your own research before making investments.
            </li>
          </ul>
        </section>

        <section>
          <h2>9. Intellectual Property Rights</h2>

          <p>All content including:</p>
          <ul className={cn(``)}>
            <li>Videos</li>
            <li>Charts</li>
            <li>Course modules</li>
            <li>Logos</li>
            <li>Branding</li>
            <li>
              Website content are protected under copyright and intellectual
              property laws.
            </li>
            <li>
              Unauthorized reproduction or distribution is strictly prohibited.
            </li>
          </ul>
        </section>

        <section>
          <h2>10. No Guarantee of Results</h2>

          <p> We do not guarantee:</p>
          <ul className={cn(``)}>
            <li>Profitability</li>
            <li>Specific returns</li>
            <li>Income generation</li>
            <li>Financial success</li>
          </ul>
          <p>
            Results vary depending on individual effort, risk management,
            capital, psychology, and market conditions.
          </p>
        </section>

        <section>
          <h2>11. Participant Conduct</h2>

          <ul className={cn(``)}>
            <li>
              Participants may ask questions or clarify doubts through the
              designated chat/Q&A feature.
            </li>
            <li>
              Any behavior that is abusive, offensive, or disruptive is
              prohibited. Niveshdemy reserves the right to remove or block
              participants for inappropriate conduct.
            </li>
            <li>
              Content shared by participants (questions, messages, or feedback)
              may be used for marketing purposes only with explicit consent.
            </li>
          </ul>
        </section>

        <section>
          <h2>12. Testimonials & Consent</h2>

          <ul className={cn(`list-disc`)}>
            <li>
              Any testimonial, screenshot, or chat feedback may be used by{" "}
              <strong>Sanjib Academy</strong> for promotional or marketing
              purposes with the attendee's consent.
            </li>
            <li>
              By registering, participants consent to receive communications
              through email or CRM tracking tools.
            </li>
          </ul>
        </section>

        <section>
          <h2>13. Cookies & Tracking</h2>

          <ul className={cn(`list-disc`)}>
            <li>
              By using the website or registering for the workshop, you consent
              to the use of cookies and tracking tools as per our Privacy
              Policy.
            </li>
            <li>
              Cookies and tracking are used for website functionality,
              registration processing, and marketing automation.
            </li>
          </ul>
        </section>

        <section>
          <h2>14. Limitation of Liability & Disclaimer</h2>

          <p>
            Under no circumstances shall <strong>Sanjib Academy</strong> or its
            owner be liable for:
          </p>

          <ul className={cn(`list-disc`)}>
            <li>Trading losses</li>
            <li>Financial damages</li>
            <li>Indirect or consequential losses</li>
            <li>Technical issues</li>
            <li>Website downtime</li>
          </ul>
          <p>
            Your use of the website and services is entirely at your own risk.
          </p>
        </section>

        <section>
          <h2>15. Third-Party Links</h2>

          <p>
            Our website may contain links to third-party websites or brokers. We
            are not responsible for their content, services, or policies.
          </p>
        </section>

        <section>
          <h2>16. Account Termination</h2>
          <p>We reserve the right to:</p>

          <ul>
            <li>Suspend or terminate access</li>
            <li>Remove user accounts</li>
            <li>Deny service</li>
          </ul>

          <p>if any violation of these Terms is detected.</p>
        </section>

        <section>
          <h2>17. Modification of Terms</h2>
          <p>
            We reserve the right to update these Terms at any time. Continued
            use of the website implies acceptance of updated Terms.
          </p>
        </section>

        <section>
          <h2>18. Governing Law & Jurisdiction</h2>
          <ul>
            <li>All terms shall be governed by the laws of India.</li>
            <li>
              Any disputes shall be subject to the jurisdiction of{" "}
              <strong> Krisnanagr Judge Court</strong>, located in{" "}
              <strong>Kirisnanagr, Nadia, West bengal</strong>.
            </li>
          </ul>
        </section>

        <section>
          <h2>19. Contact Information</h2>
          <p>
            For any questions regarding these Terms & Conditions, you can reach
            us at:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:gangulysanjibkumar@gmail.com">
                gangulysanjibkumar@gmail.com
              </a>
            </li>
          </ul>
          <p>
            By registering for any content, you acknowledge that you have read,
            understood, and agreed to these Terms & Conditions.
          </p>
        </section>
      </LawsuitContentWrapper>
    </Main>
  );
}
