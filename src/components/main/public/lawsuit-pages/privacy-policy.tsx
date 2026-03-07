import { ComponentProps } from "react";
import { Main } from "@/components/main/public/main";
import { cn } from "@/utils/cn";
import LawsuitContentWrapper from "@/components/main/public/lawsuit-pages/lawsuit-content-wrapper";

const effectiveDate = "2026-02-25";

const formatedEffectiveDate = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "full",
}).format(new Date(effectiveDate));

/**
 * If you ever change the content of the component
 * REMEBER to CHANGE the `effectiveDate` in `YYYY-MM-DD` format
 */
export default function PrivacyPolicy({
  ...props
}: ComponentProps<typeof Main>) {
  return (
    <Main {...props} className={cn(`mt-0`, props.className)}>
      <LawsuitContentWrapper>
        <h1 className={cn(``)}>Privacy Policy</h1>
        <p className={cn(``)}>Effective Date: {formatedEffectiveDate}</p>

        <section>
          <p>
            Sanjib Academy (“we”, “our”, “us”) respects your privacy. This
            Privacy Policy explains how we collect, use, and protect personal
            information when you access our website, platform, courses,
            mentorship programs, and membership services.
          </p>
        </section>

        <section>
          <h2 className={cn(``)}>1. Information We Collect</h2>
          <p className={cn(``)}>
            We only collect information necessary to provide our educational
            services, such as:
          </p>

          <ul>
            <li>Name and email address for registration or support</li>
            <li>Payment details for course or membership enrollment</li>
            <li>Account information to access our programs</li>
          </ul>
          <p>
            We do not collect sensitive financial information, and we do not
            provide personalized investment advice.
          </p>
        </section>

        <section>
          <h2 className={cn(``)}>2. How We Use Your Information</h2>
          <p className={cn(``)}>We use your information to:</p>
          <ul>
            <li>Provide access to purchased courses</li>
            <li>Process payments</li>
            <li>Send course-related updates</li>
            <li>Respond to inquiries</li>
            <li>Improve website functionality</li>
            <li>Send marketing emails (only if you opt-in)</li>
            <li>Prevent fraud or misuse</li>
          </ul>
          <p>We do not offer investment advice or manage investments.</p>
        </section>

        <section>
          <h2 className={cn(``)}>3. Payment Processing</h2>
          <p className={cn(``)}>
            All payments are processed through secure third-party payment
            gateways. We do not store your complete debit/credit card details on
            our servers.
          </p>
          <p>
            You are advised to review the privacy policies of payment processors
            separately.
          </p>
        </section>

        <section>
          <h2 className={cn(``)}>4. Cookies Policy</h2>
          <p className={cn(``)}>
            We may use cookies and tracking technologies to:
          </p>
          <ul>
            <li>Improve user experience</li>
            <li>Analyze website traffic</li>
            <li>Remember login sessions</li>
            <li>Run advertisements</li>
          </ul>
          <p>
            You may disable cookies in your browser settings; however, some
            features may not function properly.
          </p>
        </section>

        <section>
          <h2 className={cn(``)}>5. Data Protection & Security</h2>
          <p>
            We implement reasonable technical and organizational security
            measures to protect your personal data.
          </p>
          <p>
            However, no method of transmission over the Internet is 100% secure.
            We cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className={cn(``)}>6. Data Sharing</h2>
          <p>We may share your information only with:</p>
          <ul>
            <li>Payment gateway providers</li>
            <li>Technical hosting providers</li>
            <li>Legal authorities (if required by law)</li>
          </ul>
          <p>We do not sell or rent personal information.</p>
        </section>

        <section>
          <h2 className={cn(``)}>7. Data Retention</h2>
          <p>We retain personal information only as long as necessary for:</p>
          <ul>
            <li>Providing services</li>
            <li>Legal compliance</li>
            <li>Resolving disputes</li>
            <li>Enforcing agreements</li>
          </ul>
        </section>

        <section>
          <h2 className={cn(``)}>8. User Rights</h2>
          <p>As a user, you may:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>
              Request deletion of your data (subject to legal requirements)
            </li>
          </ul>
          <p>To exercise these rights, contact us at:</p>
          <p>
            <a href="mailto:gangulysanjibkumar@gmail.com">
              gangulysanjibkumar@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className={cn(``)}>9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites or broker
            platforms. We are not responsible for their privacy practices.
          </p>
        </section>

        <section>
          <h2 className={cn(``)}>10. Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time.
            Updates will be posted on this page with a revised effective date.
          </p>
          <p>
            Continued use of the website constitutes acceptance of the updated
            policy.
          </p>
        </section>

        <section>
          <h2 className={cn(``)}>12. Contact us</h2>

          <p>For questions regarding this Privacy Policy, contact:</p>

          <p>Sanjib Academy</p>
          <p>
            Email:{" "}
            <a href="mailto:gangulysanjibkumar@gmail.com">
              gangulysanjibkumar@gmail.com
            </a>
          </p>
          <p>Address: Krisnanagar, Nadia, West Bengal</p>
        </section>
      </LawsuitContentWrapper>
    </Main>
  );
}
