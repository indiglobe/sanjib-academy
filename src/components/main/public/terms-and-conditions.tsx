import { cn } from "@/utils/cn";
import { Main } from "./main";

export default function TermsAndConditions() {
  return (
    <Main className={cn(``)}>
      <div className="m-auto max-w-[80ch] px-6 py-16 lg:px-20">
        <div className="mx-auto max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold">Terms and Conditions</h1>
          <p className="text-foreground/60">Effective Date: [Insert Date]</p>

          {/* INTRO */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              1. Educational Purpose Only
            </h2>
            <p className="text-foreground/70">
              [Platform Name] provides stock market, trading, and financial
              market education. All content including courses, webinars, videos,
              and materials is for educational and informational purposes only.
            </p>
          </section>

          {/* NO INVESTMENT ADVICE */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. No Investment Advice</h2>
            <p className="text-foreground/70">
              We do not provide financial, investment, legal, or tax advice.
              Nothing on this platform constitutes a recommendation to buy or
              sell securities, stocks, derivatives, crypto assets, or financial
              instruments.
            </p>
          </section>

          {/* RISK DISCLOSURE */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Risk Disclosure</h2>
            <p className="text-foreground/70">
              Trading and investing involve substantial risk of loss. You may
              lose part or all of your invested capital. Past performance does
              not guarantee future results.
            </p>
          </section>

          {/* USER RESPONSIBILITY */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. User Responsibility</h2>
            <p className="text-foreground/70">
              You are solely responsible for your investment decisions. We are
              not liable for any financial losses incurred from actions taken
              based on our educational content.
            </p>
          </section>

          {/* WEBINARS */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Webinars & Recordings</h2>
            <p className="text-foreground/70">
              Free and paid webinars may be recorded. By participating, you
              consent to recording. Redistribution of webinar materials without
              written permission is strictly prohibited.
            </p>
          </section>

          {/* PAYMENTS */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Payments & Access</h2>
            <p className="text-foreground/70">
              Access to paid courses or webinars is granted after successful
              payment. Sharing login credentials is prohibited and may result in
              account termination.
            </p>
          </section>

          {/* INTELLECTUAL PROPERTY */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Intellectual Property</h2>
            <p className="text-foreground/70">
              All course materials, strategies, slides, and content are the
              intellectual property of [Platform Name] and may not be reproduced
              or distributed.
            </p>
          </section>

          {/* GOVERNING LAW */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Governing Law</h2>
            <p className="text-foreground/70">
              These terms are governed by the laws of [Country/State].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">9. Contact</h2>
            <p className="text-foreground/70">
              Email: [Contact Email] <br />
              Address: [Business Address]
            </p>
          </section>
        </div>
      </div>
    </Main>
  );
}
