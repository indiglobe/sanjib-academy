import { cn } from "@/utils/cn";
import { ComponentProps, Fragment, useEffect } from "react";
import { Image } from "@unpic/react";
import { Button } from "@/ui/button";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Main } from "../main";
import { User, Briefcase, GraduationCap } from "lucide-react";
import { Link, useLoaderData } from "@tanstack/react-router";
import {
  MasterClassCard,
  MasterClassContent,
  MasterClassHeading,
  MasterClassIcon,
} from "@/ui/master-class";
import {
  MetricCard,
  MetricCardInner,
  MetricCardLabel,
  MetricCardValue,
} from "@/ui/metrics-card";
import {
  LearningStep,
  LearningStepCount,
  LearningStepDetails,
  LearningStepHeading,
} from "@/ui/learning-step";
import {
  HorizontalCarousel,
  HorizontalCarouselContent,
  HorizontalCarouselItem,
} from "@/ui/horizontal-carousel";
import ownerPortrait from "@/assets/owner-portrait.png";
import {
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorSocialHandle,
  TestimonialCard,
  TestimonialCardHeader,
  TestimonialCardImage,
  TestimonialMessage,
} from "../../../../ui/testimonials";
import AutoScroll from "embla-carousel-auto-scroll";
import AutoPlay from "embla-carousel-autoplay";
import { FAQ, FAQAnswer, FAQItem, FAQQuestion } from "../../../../ui/faq";
import { OfferedCourses } from "./offered-courses";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:4000/api/me", {
        credentials: "include",
      });

      console.log(await res.json());
    })();
  }, []);

  return (
    <Main>
      <HeroSection />

      <MetricsSection />

      <MasterClassSection />

      <OurMethod />

      <OfferedCourses />

      <MeetYourCoach />

      <Testimonials />

      <FaqSection />
    </Main>
  );
}

export function HeroSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(`bg-background text-foreground w-full`, className)}
      {...props}
    >
      <div className={cn(`mx-auto max-w-7xl py-16 sm:py-20 lg:py-24`)}>
        <div
          className={cn(
            `grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16`,
          )}
        >
          {/* LEFT CONTENT */}
          <div
            className={cn(
              `flex flex-col items-center gap-8 text-center lg:items-start lg:text-left`,
            )}
          >
            <div className={cn(`flex max-w-2xl flex-col gap-5`)}>
              {/* Heading */}
              <h1
                className={cn(
                  `text-3xl leading-tight font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl`,
                )}
              >
                Learn Trading the Right Way — Not the Hard Way
              </h1>

              {/* Subheading */}
              <p
                className={cn(
                  `text-muted-foreground text-sm leading-relaxed sm:text-base md:text-lg`,
                )}
              >
                Join structured live and recorded sessions designed to take you
                from confusion to confidence. Learn, practice, and grow with a
                system that actually works.
              </p>

              {/* CTA Buttons */}
              <div
                className={cn(
                  `flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:gap-4 lg:items-start lg:justify-start`,
                )}
              >
                <Link to={"/resources"} tabIndex={-1}>
                  <Button
                    variant={"primary"}
                    className={cn(`rounded-none px-6 py-6`)}
                  >
                    Start Learning
                  </Button>
                </Link>

                <Link to="/resources" tabIndex={-1}>
                  <Button
                    variant={"outline"}
                    className={cn(
                      `border-primary-500 text-primary-500 rounded-none px-6 py-6 dark:border-white dark:text-white`,
                    )}
                  >
                    Explore Classes
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className={cn(`flex items-center justify-center lg:justify-end`)}
          >
            <div
              className={cn(
                `relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg`,
              )}
            >
              {/* Glow background */}
              <div
                className={cn(
                  `from-primary-500/20 via-accent-500/10 to-secondary-500/20 absolute inset-0 -z-10 rounded-2xl blur-2xl`,
                )}
              />

              <div className={cn(`h-80 w-full overflow-clip rounded-lg`)}>
                <Image
                  src={ownerPortrait}
                  alt={""}
                  layout="fullWidth"
                  className={cn(`h-auto w-full object-cover`)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MetricsSection({
  className,
  ...props
}: ComponentProps<"section">) {
  const { metrics } = useLoaderData({ from: "/(public)/(landing-pages)/" });

  return (
    <section
      className={cn(`bg-background text-foreground w-full`, className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index}>
              <MetricCardInner>
                <MetricCardValue>{metric.heading}</MetricCardValue>
                <MetricCardLabel>{metric.content}</MetricCardLabel>
              </MetricCardInner>
            </MetricCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MasterClassSection() {
  return (
    <section className="relative py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Who is this masterclass for
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-500">
          Whether you're just starting out or refining your strategy, this
          masterclass is built to give you a structured edge in the markets.
        </p>

        {/* Cards */}
        <div className="mt-14 grid justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <MasterClassCard>
            <MasterClassIcon>
              <User />
            </MasterClassIcon>
            <MasterClassHeading>Traders</MasterClassHeading>
            <MasterClassContent>
              Ideal for traders who want to develop a rule-based and
              institutional-level trading strategy with consistency.
            </MasterClassContent>
          </MasterClassCard>

          <MasterClassCard>
            <MasterClassIcon>
              <Briefcase />
            </MasterClassIcon>
            <MasterClassHeading>Investors</MasterClassHeading>
            <MasterClassContent>
              Designed for investors looking to make smarter long-term decisions
              backed by structured market understanding.
            </MasterClassContent>
          </MasterClassCard>

          <MasterClassCard>
            <MasterClassIcon>
              <GraduationCap />
            </MasterClassIcon>
            <MasterClassHeading>Learners</MasterClassHeading>
            <MasterClassContent>
              Perfect for beginners who want to build strong fundamentals and a
              deep understanding of how markets actually work.
            </MasterClassContent>
          </MasterClassCard>
        </div>
      </div>
    </section>
  );
}

export function OurMethod() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="@container flex flex-col gap-12 xl:flex-row">
          {/* LEFT CONTENT */}
          <div className="m-auto w-full max-w-md text-center xl:text-left">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Learn & Transform in 3 Simple Steps
            </h2>

            <p className="mt-4 text-gray-500">
              Master the stock market with a simple step-by-step learning
              process designed for beginners, traders, and investors.
            </p>

            <Link to="/resources" tabIndex={-1}>
              <Button className="mt-6 rounded-full bg-linear-to-r from-indigo-500 to-purple-600 px-6 py-5 text-base font-medium text-white shadow-md transition hover:shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>

          {/* RIGHT STEPS */}
          <div className="relative flex w-full flex-col items-center gap-8 @3xl:flex-row @3xl:items-start @3xl:justify-between">
            <LearningStep className={cn(`relative -left-10 @3xl:left-0`)}>
              <LearningStepCount>Step 1</LearningStepCount>
              <LearningStepHeading>Join a Free Masterclass</LearningStepHeading>
              <LearningStepDetails>
                Understand how professional traders read the market using Smart
                Money Concepts and institutional strategies.
              </LearningStepDetails>
            </LearningStep>

            <LearningStep className={cn(`relative @3xl:top-5`)}>
              <LearningStepCount>Step 2</LearningStepCount>
              <LearningStepHeading>Enroll & Start Learning</LearningStepHeading>
              <LearningStepDetails>
                Get access to the complete course covering institutional
                trading, option hedging, and real market strategies.
              </LearningStepDetails>
            </LearningStep>

            <LearningStep
              className={cn(`relative @max-3xl:left-10 @3xl:top-10`)}
            >
              <LearningStepCount>Step 3</LearningStepCount>
              <LearningStepHeading>
                Apply & Trade Confidently
              </LearningStepHeading>
              <LearningStepDetails>
                Use the strategies in live market conditions and develop the
                mindset of a disciplined trader.
              </LearningStepDetails>
            </LearningStep>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MeetYourCoach({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section {...props} className={cn(`w-full pt-16`, className)}>
      <div className={cn(`mx-auto flex max-w-7xl flex-col gap-12`)}>
        {/* Heading */}
        <div className={cn(`text-center lg:text-left`)}>
          <h2
            className={cn(
              `text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl`,
            )}
          >
            Meet Your Coach
          </h2>
        </div>

        {/* Content */}
        <div
          className={cn(
            `grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16`,
          )}
        >
          {/* TEXT SIDE */}
          <div className={cn(`mb-auto flex flex-col gap-6`)}>
            {/* Highlight Quote */}
            <div
              className={cn(
                `border-primary-300/40 dark:border-primary-800/40 bg-primary-50/40 dark:bg-primary-50/50 relative rounded-xl border px-6 py-6`,
              )}
            >
              <span
                className={cn(
                  `font-brand-secondary text-primary-500 dark:text-primary-900 absolute -top-10 left-4 text-[calc(var(--spacing)*24)]`,
                )}
              >
                “
              </span>

              <p
                className={cn(
                  `text-primary-900 dark:text-primary-950 text-base leading-relaxed font-medium sm:text-lg`,
                )}
              >
                I operate at the intersection of fundamental intelligence and
                institutional market behavior.
              </p>
            </div>

            {/* Paragraphs */}
            <div
              className={cn(
                `flex flex-col gap-4 text-sm leading-relaxed sm:text-base`,
              )}
            >
              <p className={cn(`text-primary-900/80 dark:text-primary-900/80`)}>
                As a professional trader and mentor, my expertise lies in
                decoding how capital flows through markets—combining deep
                fundamental analysis with institutional-grade execution models.
                My approach is inspired by the same principles used by hedge
                funds and smart money participants.
              </p>

              <p className={cn(`text-primary-900/80 dark:text-primary-900/80`)}>
                I don't teach retail shortcuts. I train traders to think like
                institutions—focusing on valuation, macro trends, liquidity, and
                precision timing.
              </p>

              <p
                className={cn(
                  `text-primary-700 dark:text-primary-900 font-medium`,
                )}
              >
                This is not just trading education. It's a shift in perspective—
                from following the market to understanding who truly moves it.
              </p>
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div
            className={cn(
              `relative flex items-center justify-center lg:justify-end`,
            )}
          >
            <div
              className={cn(
                `relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg`,
              )}
            >
              {/* Glow */}
              <div
                className={cn(
                  `absolute inset-0 -z-10 rounded-2xl blur-2xl`,
                  `from-primary-500/30 via-accent-500/20 to-secondary-500/30 bg-linear-to-br`,
                )}
              />

              {/* Image */}
              <div
                className={cn(
                  `relative overflow-hidden rounded-2xl border`,
                  `border-primary-300/40 dark:border-primary-800/40`,
                )}
              >
                <Image
                  src={ownerPortrait}
                  alt="coach"
                  className={cn(`h-auto w-full object-cover`)}
                  width={500}
                  height={700}
                />
              </div>

              {/* Floating Tag */}
              <div
                className={cn(
                  `absolute bottom-4 left-4 rounded-md px-3 py-1 text-xs font-medium`,
                  `bg-primary-500 text-white shadow-md`,
                )}
              >
                Professional Trader
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials({ ...props }: ComponentProps<"section">) {
  const { testimonials } = useLoaderData({
    from: "/(public)/(landing-pages)/",
  });

  return (
    <section
      {...props}
      className={cn("relative py-24 sm:py-32", props.className)}
    >
      {/* soft glow background */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* heading */}
      <div className="relative mb-14 flex flex-col items-center text-center">
        <span className="mb-3 text-sm font-medium text-neutral-500">
          Testimonials
        </span>

        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          Loved by builders worldwide
        </h2>

        <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-400">
          Real feedback from teams and creators using our product in production.
        </p>
      </div>

      {/* carousel wrapper with fade edges */}
      <div
        className={cn(
          `-mx-4 mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] sm:-mx-10 md:-mx-20 lg:-mx-30`,
        )}
      >
        <HorizontalCarousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            AutoScroll({ startDelay: 0, speed: 0.5, stopOnInteraction: false }),
            AutoPlay({ delay: 0 }),
          ]}
          className={cn(`min-w-full`)}
        >
          <HorizontalCarouselContent className={cn(`w-full`)}>
            {testimonials &&
              testimonials.map(
                ({
                  id,
                  name,
                  authorSocialHandle,
                  testimonialText,
                  uploadedAvatarImageUrl,
                }) => {
                  return (
                    <HorizontalCarouselItem
                      key={id}
                      className={cn(`max-w-max basis-full`)}
                    >
                      <TestimonialCard>
                        <TestimonialCardHeader>
                          <TestimonialCardImage src={uploadedAvatarImageUrl} />
                          <TestimonialAuthor>
                            <TestimonialAuthorName>
                              {name}
                            </TestimonialAuthorName>
                            <TestimonialAuthorSocialHandle>
                              {authorSocialHandle}
                            </TestimonialAuthorSocialHandle>
                          </TestimonialAuthor>
                        </TestimonialCardHeader>
                        <TestimonialMessage>
                          {testimonialText}
                        </TestimonialMessage>
                      </TestimonialCard>
                    </HorizontalCarouselItem>
                  );
                },
              )}
          </HorizontalCarouselContent>
        </HorizontalCarousel>
      </div>
    </section>
  );
}

export function FaqSection({ ...props }: ComponentProps<"section">) {
  const { faqs } = useLoaderData({ from: "/(public)/(landing-pages)/" });
  return (
    <section
      {...props}
      data-slot={`faq-section`}
      className={cn(`py-10`, props.className)}
    >
      <div className={cn(`flex flex-col items-center`)}>
        <div className="mb-8 text-center">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
            Frequently Asked Questions
          </h2>

          <p className="text-foreground/60 mt-2 text-sm">
            Everything you need to know before getting started
          </p>
        </div>

        <div className={cn(`m-auto w-full max-w-2xl`)}>
          <FAQ
            type="single"
            collapsible
            defaultValue="shipping"
            className="w-full"
          >
            {faqs.map(({ faqAnswer, faqQuestion, isVisible }) => {
              return (
                <Fragment key={faqQuestion}>
                  {isVisible && (
                    <FAQItem value={faqQuestion}>
                      <FAQQuestion>{faqQuestion}</FAQQuestion>
                      <FAQAnswer transformingString={faqAnswer} />
                    </FAQItem>
                  )}
                </Fragment>
              );
            })}
          </FAQ>
        </div>
      </div>
    </section>
  );
}

// export function SectionHeading({ ...props }: ComponentProps<"h2">) {
//   return (
//     <h2
//       {...props}
//       data-slot={`hero-section-heading`}
//       className={cn(
//         `font-brand-secondary text-primary-500 pb-6 text-4xl font-semibold md:text-5xl`,
//         props.className,
//       )}
//     />
//   );
// }
