import { Main } from "@/components/main/public/main";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export default function AboutUs() {
  return (
    <Main>
      <MissionVission />

      <CompanyStory />

      <ValuesPrinciple />

      <Team />

      <Achievements />

      <Process />
    </Main>
  );
}

export function MissionVission({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn(``, props.className)}>
      <SectionHeading id="mission-and-vission">
        Mission and Vission
      </SectionHeading>
      <div></div>
    </section>
  );
}

export function CompanyStory({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn(``, props.className)}>
      <SectionHeading id="company-story">Company Story</SectionHeading>
      <div>
        Founded in 2015, we started with a small idea to make eco-friendly
        packaging accessible to everyone.
      </div>
    </section>
  );
}

export function ValuesPrinciple({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn(``, props.className)}>
      <SectionHeading id="values-principles">
        Values & Principles
      </SectionHeading>
      <div>Integrity, Innovation, and Sustainability.</div>
    </section>
  );
}

export function Team({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn(``, props.className)}>
      <SectionHeading id="team">Team / People</SectionHeading>
      <div></div>
    </section>
  );
}

export function Achievements({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn(``, props.className)}>
      <SectionHeading id="achievements">
        Achievements / Milestones
      </SectionHeading>
      <div></div>
    </section>
  );
}

export function Process({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn(``, props.className)}>
      <SectionHeading id="process">How We Work / Process</SectionHeading>
      <div></div>
    </section>
  );
}

export function SectionHeading({ ...props }: ComponentProps<"h2">) {
  return (
    <h2
      {...props}
      className={cn(
        `text-primary-500 text-2xl font-bold underline`,
        props.className,
      )}
    />
  );
}
