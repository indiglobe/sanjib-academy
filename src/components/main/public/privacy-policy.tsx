import { Main } from "./main";

export default function PrivacyPolicy() {
  return (
    <Main>
      <div className="m-auto max-w-[80ch] px-6 py-16 lg:px-20">
        <div className="mx-auto max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-foreground/60">Effective Date: [Insert Date]</p>

          <section>
            <h2 className="mb-2 text-2xl font-semibold">
              1. Information We Collect
            </h2>
            <ul className="text-foreground/70 list-disc space-y-1 pl-6">
              <li>Name, email, phone number</li>
              <li>Billing details</li>
              <li>Payment transaction information</li>
              <li>IP address and browser/device data</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-semibold">
              2. How We Use Information
            </h2>
            <ul className="text-foreground/70 list-disc space-y-1 pl-6">
              <li>To provide course and webinar access</li>
              <li>To process payments</li>
              <li>To send educational and promotional emails</li>
              <li>To improve platform security</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-semibold">3. Data Protection</h2>
            <p className="text-foreground/70">
              We implement appropriate technical and organizational safeguards
              to protect your personal data.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-semibold">
              4. Third-Party Services
            </h2>
            <p className="text-foreground/70">
              We may use payment processors and webinar hosting platforms. These
              providers process data in accordance with their own privacy
              policies.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-semibold">5. Your Rights</h2>
            <p className="text-foreground/70">
              You may request access, correction, or deletion of your personal
              data by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Contact</h2>
            <p className="text-foreground/70">Email: [Contact Email]</p>
          </section>
        </div>
      </div>
    </Main>
  );
}
