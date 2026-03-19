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
export default function Disclaimer({ ...props }: ComponentProps<typeof Main>) {
  return (
    <Main {...props} className={cn(`mt-0`, props.className)}>
      <LawsuitContentWrapper>
        <h1 className={cn(``)}>Disclaimer</h1>
        <p className={cn(``)}>Effective Date: {formatedEffectiveDate}</p>

        <section>
          <h2>1. Educational Purposes Only</h2>
          <p>
            The information provided in this platform, including all materials,
            charts, and verbal discussions, is for educational and informational
            purposes only. It should not be construed as legal, tax, investment,
            financial, or other advice.
          </p>
        </section>

        <section>
          <h2>2. No Investment Recommendations</h2>
          <p>
            Nothing contained in this presentation constitutes a solicitation,
            recommendation, endorsement, or offer to buy or sell any securities
            or other financial instruments. The instructor is not a registered
            investment advisor (RIA) or broker-dealer.
          </p>
        </section>

        <section>
          <h2>3. Acknowledgment of Risk</h2>
          <p>
            Investing in the stock market involves significant risk. The value
            of stocks and financial instruments can go down as well as up, and
            you may lose some or all of your invested capital.
          </p>
          <ul>
            <li>Past performance is not indicative of future results.</li>
            <li>
              Any "simulated" or "back-tested" results have inherent
              limitations.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Personal Responsibility</h2>
          <p>
            Participants are encouraged to consult with a professional financial
            advisor before making any investment decisions. You alone assume the
            sole responsibility of evaluating the merits and risks associated
            with the use of any information provided in this workshop.
          </p>
        </section>

        <section>
          <h2>5. Accuracy of Information</h2>
          <p>
            While we strive to provide accurate and up-to-date information, we
            do not guarantee the completeness or accuracy of the data presented.
            Use of the information is at your own risk.
          </p>
        </section>
      </LawsuitContentWrapper>
    </Main>
  );
}
