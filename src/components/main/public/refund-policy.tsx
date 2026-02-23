import { Main } from "./main";

export default function RefundPolicy() {
  return (
    <Main>
      <div className="m-auto max-w-[80ch] px-6 py-16 lg:px-20">
        <div className="mx-auto max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold">Refund Policy</h1>
          <p className="text-foreground/60">Effective Date: [Insert Date]</p>

          <section>
            <h2 className="mb-2 text-2xl font-semibold">1. Digital Products</h2>
            <p className="text-foreground/70">
              Due to the nature of digital educational content, course purchases
              are generally non-refundable once access has been granted.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-semibold">2. Paid Webinars</h2>
            <p className="text-foreground/70">
              Refunds for paid webinars are available only if requested at least
              [X hours] before the scheduled session. No refunds are issued
              after attendance or access to recordings.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-semibold">
              3. Exceptional Cases
            </h2>
            <p className="text-foreground/70">
              Refunds may be granted in cases of duplicate payments or technical
              errors at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Contact</h2>
            <p className="text-foreground/70">Email: [Contact Email]</p>
          </section>
        </div>
      </div>
    </Main>
  );
}
