import { cn } from "@/utils/cn";
import { Link, useLoaderData } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ComponentProps, Fragment, useRef } from "react";
import heroSection from "@/assets/hero-section.png";
import ownerPortrait from "@/assets/owner-portrait.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Main } from "@/components/main/public/main";
import {
  MetricsCard,
  MetricsCardContent,
  MetricsCardHeading,
} from "@/components/main/public/home/metrics-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import {
  Courses,
  CourseContent,
  CourseContentContainer,
  TogglingButton,
  TogglingButtonContainer,
  CourseContentHeading,
  LearningTopicList,
  LearningTopicItem,
  CourseContentFooter,
  DownloadCourseBrochure,
  CourseEnrollNow,
} from "@/components/main/public/home/course";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import {
  MasterClassCard,
  MasterClassContent,
  MasterClassHeading,
  MasterClassIcon,
} from "./master-class";
import { Briefcase, GraduationCap, User } from "lucide-react";
import { Button } from "@/ui/button";

gsap.registerPlugin(SplitText);

export default function HomePage() {
  return (
    <Main>
      <HeroSection />

      <Metrics />

      <MasterClass />

      <OurMethod />

      <OfferedCourses />

      <FaqSection />
    </Main>
  );
}

export function HeroSection({ ...props }: ComponentProps<"section">) {
  const { benefitedUsers } = useLoaderData({
    from: "/(public)/(landing-pages)/",
  });

  useGSAP(() => {
    const heroSectionStaggring = gsap.timeline();

    heroSectionStaggring
      .from("#gsap-benefited-users", {
        opacity: 0,
        top: 50,
        duration: 0.3,
        delay: 0.5,
      })
      .from("#gsap-experience-text", {
        opacity: 0,
        top: 50,
        duration: 0.5,
      })
      .from(".gsap-heading-text", {
        opacity: 0,
        top: 50,
        duration: 0.3,
        stagger: 0.2,
      })
      .from("#gsap-cta-buttons", {
        opacity: 0,
        top: 50,
        duration: 0.3,
      });

    gsap.from("#owner-portrait", {
      opacity: 0,
      top: 50,
      duration: 0.3,
      delay: 0.5,
    });
  }, []);

  return (
    <section
      {...props}
      className={cn(`font-primary-secondary pt-8 pb-6`, props.className)}
    >
      {/* hero section bg image */}
      <div
        className={cn(`absolute inset-0 -z-1 flex items-center justify-center`)}
      >
        <div className={cn(`opacity-50 dark:opacity-30`)}>
          <Image src={heroSection} layout="fullWidth" alt="backgrond image" />
        </div>

        <div
          className={cn(
            `from-background absolute top-0 left-0 h-full w-full bg-linear-to-r to-transparent`,
          )}
        />
      </div>
      {/* hero section bg image */}
      {/* hero section content */}
      <div
        className={cn(`flex w-full flex-col gap-6 *:basis-full lg:flex-row`)}
      >
        {/* hero section texts */}
        <div className={cn(`lg:basis-2/3`)}>
          {/* benefited users list with avatar */}
          <div
            id={`gsap-benefited-users`}
            className={cn(
              `bg-foreground/10 group relative mb-4 flex max-w-max items-center gap-2 rounded-full p-2 pr-8 sm:gap-4 md:mb-8`,
            )}
          >
            <div className="flex items-center -space-x-4 transition-all duration-300 group-hover:space-x-0">
              {benefitedUsers.map(({ email, name, imageUrl }, idx) => {
                if (idx >= 4) return null;
                return (
                  <Avatar
                    key={email}
                    className="border-background size-10 border-2 transition-all duration-300 md:size-12"
                  >
                    <AvatarImage src={imageUrl ?? undefined} alt="avatar" />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  </Avatar>
                );
              })}
            </div>
            <div className={cn(``)}>
              {benefitedUsers.length}+ satisfied users
            </div>
          </div>
          {/* benefited users list with avatar */}

          <div
            id={`gsap-experience-text`}
            className={cn(
              `text-background dark:text-foreground bg-primary-500 relative flex max-w-max rounded-full px-4 py-2 text-base font-semibold md:text-lg lg:text-xl`,
            )}
          >
            7+ Years Experience
          </div>

          {/* hero section text */}
          <div
            className={cn(
              `font-brand-secondary flex flex-col gap-1 py-10 md:gap-2 lg:gap-4`,
            )}
          >
            <span
              className={cn(
                `gsap-heading-text`,
                `relative text-2xl md:text-3xl lg:text-4xl`,
              )}
            >
              India's Best Channel to{" "}
            </span>
            <span
              className={cn(
                `gsap-heading-text`,
                `text-primary-500 relative text-4xl font-semibold md:text-5xl lg:text-6xl lg:leading-16`,
              )}
            >
              Learn and Trade Everyday{" "}
            </span>
            <span
              className={cn(
                `gsap-heading-text`,
                `relative text-2xl md:text-3xl lg:text-4xl`,
              )}
            >
              with Experienced Traders.
            </span>
          </div>
          {/* hero section text */}

          {/* CTA buttons */}
          <div
            id={`gsap-cta-buttons`}
            className={cn(`flex flex-wrap gap-x-4 gap-y-4`)}
          >
            <Link to="/courses" tabIndex={-1}>
              <button
                className={cn(
                  `focus-visible:ring-offset-background text-background dark:text-foreground bg-primary-500 hover:bg-primary-500 focus-visible:bg-primary-500 focus-visible:ring-primary-500 focus-visible:textp relative rounded-full px-4 py-2 text-base font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-lg lg:text-xl`,
                )}
              >
                Get started
              </button>
            </Link>

            <button
              className={cn(
                `focus-visible:ring-offset-background dark:text-foreground hover:text-background focus-visible:text-primary-50 text-primary-500 outline-primary-500 hover:bg-primary-500 focus-visible:bg-primary-500 focus-visible:ring-primary-500 rounded-full bg-transparent px-4 py-2 text-base font-semibold outline-2 transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:text-lg lg:text-xl`,
              )}
            >
              See result
            </button>
          </div>
          {/* CTA buttons */}
        </div>
        {/* hero section texts */}
        {/* hero section images */}
        <div
          id={`owner-portrait`}
          className={cn(
            `relative flex items-center justify-center lg:basis-1/3`,
          )}
        >
          <div
            className={cn(
              `relative aspect-3/4 max-lg:w-[70%] max-lg:max-w-80 lg:h-full`,
            )}
          >
            <Image
              src={ownerPortrait}
              alt="owner-portrait"
              layout="fullWidth"
              className={cn(`absolute h-full w-full object-cover`)}
            />
          </div>
        </div>
        {/* hero section images */}
      </div>
      {/* hero section content */}
    </section>
  );
}

export function Metrics({ ...props }: ComponentProps<"section">) {
  const { metrics } = useLoaderData({ from: "/(public)/(landing-pages)/" });
  const sectionElement = useRef({} as HTMLElement);

  useGSAP(() => {
    gsap.from(".gsap-metrics-card", {
      opacity: 0,
      top: 50,
      duration: 0.5,
      delay: 0.5,
      stagger: 0.1,
      scrollTrigger: { trigger: sectionElement.current, start: "top 90%" },
    });
  }, []);

  return (
    <section
      {...props}
      ref={sectionElement}
      className={cn(`@container py-10`, props.className)}
    >
      <div
        className={cn(
          `m-auto grid max-w-max grid-cols-1 gap-4 @md:grid-cols-2 @5xl:grid-cols-4`,
        )}
      >
        {metrics.map(({ content, heading }) => {
          return (
            <MetricsCard
              key={content}
              className={cn(`gsap-metrics-card relative`)}
            >
              <MetricsCardHeading>{heading}</MetricsCardHeading>
              <MetricsCardContent>{content}</MetricsCardContent>
            </MetricsCard>
          );
        })}
      </div>
    </section>
  );
}

export function MasterClass({ ...props }: ComponentProps<"section">) {
  useGSAP(() => {
    gsap.from(".gsap-master-class-card", {
      opacity: 0,
      position: "relative",
      top: "100px",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".gsap-master-class-wrapper",
        start: "top top",
      },
    });
  }, {});

  return (
    <section {...props} className={cn(``, props.className)}>
      <div
        className={cn(
          `@container flex flex-col items-center py-10 text-center`,
        )}
      >
        <SectionHeading className={cn(`pb-4`)}>
          Who is this courses for
        </SectionHeading>

        <div
          className={cn(
            `gsap-master-class-wrapper`,
            `flex w-full flex-col items-center justify-center gap-4 @2xl:flex-row @2xl:items-stretch`,
          )}
        >
          <MasterClassCard className={cn(`gsap-master-class-card`)}>
            <MasterClassIcon>
              <User />
            </MasterClassIcon>
            <MasterClassHeading>Traders</MasterClassHeading>
            <MasterClassContent>
              Beginner, intermediate and professional traders who are looking to
              level up their trading game and become a super trader.
            </MasterClassContent>
          </MasterClassCard>

          <MasterClassCard className={cn(`gsap-master-class-card`)}>
            <MasterClassIcon>
              <Briefcase />
            </MasterClassIcon>
            <MasterClassHeading>Investors</MasterClassHeading>
            <MasterClassContent>
              First time or seasoned investors who are looking to outperform
              their portfolio returns with superior tools and techniques.
            </MasterClassContent>
          </MasterClassCard>

          <MasterClassCard className={cn(`gsap-master-class-card`)}>
            <MasterClassIcon>
              <GraduationCap />
            </MasterClassIcon>
            <MasterClassHeading>Learners</MasterClassHeading>
            <MasterClassContent>
              Working professionals, home makers or students who are looking to
              venture into stock trading to create active and passive source of
              income.
            </MasterClassContent>
          </MasterClassCard>
        </div>
      </div>
    </section>
  );
}

export function OurMethod({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn(``, props.className)}>
      <div className={cn(`flex flex-col items-center`)}>
        <SectionHeading className={cn(`pb-4 text-center`)}>
          Our Method
        </SectionHeading>

        <div className={cn(`w-full`)}>
          <div>
            <h3>Learn & Transform in 3 Simple Steps!</h3>
            <p>
              Learning real-life skills has never been easier! Follow these
              three simple steps and start your journey towards financial
              freedom & personal growth
            </p>

            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OfferedCourses({ ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn(``, props.className)}>
      <div className={cn(`flex flex-col items-center`)}>
        <SectionHeading className={cn(`pb-4 text-center`)}>
          Courses we offer
        </SectionHeading>

        <div className={cn(`w-full`)}>
          <Courses>
            <TogglingButtonContainer>
              <TogglingButton buttonPanel={`institutional-trading`}>
                Institutional Trading
              </TogglingButton>

              <TogglingButton buttonPanel={`fno-trading`}>
                FNO Hedging
              </TogglingButton>

              <TogglingButton buttonPanel={`option-hedging`}>
                Option Hedging
              </TogglingButton>
            </TogglingButtonContainer>

            <CourseContentContainer>
              <CourseContent contentPanel="institutional-trading">
                <CourseContentHeading>
                  Learn how big institutions and banks move the market—and how
                  you can trade with them.
                </CourseContentHeading>

                <LearningTopicList>
                  <LearningTopicItem>
                    Smart Money Concepts (SMC)
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Order Blocks & Liquidity Zones
                  </LearningTopicItem>
                  <LearningTopicItem>Supply & Demand Mapping</LearningTopicItem>
                  <LearningTopicItem>
                    Market Structure (BOS & CHoCH)
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Wyckoff Accumulation & Distribution
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Institutional Stop-Hunting Techniques
                  </LearningTopicItem>
                  <LearningTopicItem>Entry & Exit Planning</LearningTopicItem>
                </LearningTopicList>

                <CourseContentFooter>
                  <DownloadCourseBrochure />
                  <CourseEnrollNow />
                </CourseContentFooter>
              </CourseContent>

              <CourseContent contentPanel="fno-trading">
                <CourseContentHeading>
                  Master Futures & Options strategies to protect capital and
                  earn consistently.
                </CourseContentHeading>

                <LearningTopicList>
                  <LearningTopicItem>
                    Options Basics & Advanced Greeks
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Hedging with Spreads & Combos
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Iron Condor, Butterfly & Ratio Strategies
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Positional & Intraday Hedging
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Volatility-Based Trading
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Portfolio Risk Protection
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Margin & Capital Optimization
                  </LearningTopicItem>
                </LearningTopicList>

                <CourseContentFooter>
                  <DownloadCourseBrochure />
                  <CourseEnrollNow />
                </CourseContentFooter>
              </CourseContent>

              <CourseContent contentPanel="option-hedging">
                <CourseContentHeading>
                  Learn how to find strong companies and invest like
                  professionals.
                </CourseContentHeading>

                <LearningTopicList>
                  <LearningTopicItem>
                    Financial Statement Analysis
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Balance Sheet, P&L & Cash Flow Reading
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Valuation Models (PE, PB, DCF)
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Sector & Industry Analysis
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Economic & Policy Impact
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Management Quality Assessment
                  </LearningTopicItem>
                  <LearningTopicItem>
                    Long-Term Portfolio Building
                  </LearningTopicItem>
                </LearningTopicList>

                <CourseContentFooter>
                  <DownloadCourseBrochure />
                  <CourseEnrollNow />
                </CourseContentFooter>
              </CourseContent>
            </CourseContentContainer>
          </Courses>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ ...props }: ComponentProps<"section">) {
  const { faqs } = useLoaderData({ from: "/(public)/(landing-pages)/" });
  return (
    <section {...props} className={cn(`py-10`, props.className)}>
      <div className={cn(`flex flex-col items-center`)}>
        <SectionHeading>FAQs</SectionHeading>

        <div className={cn(`m-auto w-full max-w-2xl`)}>
          <Accordion
            type="single"
            collapsible
            defaultValue="shipping"
            className="w-full"
          >
            {faqs.map(({ faqAnswer, faqQuestion, isVisible }) => {
              return (
                <Fragment key={faqQuestion}>
                  {isVisible && (
                    <AccordionItem value={faqQuestion}>
                      <AccordionTrigger>{faqQuestion}</AccordionTrigger>
                      <AccordionContent>{faqAnswer}</AccordionContent>
                    </AccordionItem>
                  )}
                </Fragment>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ ...props }: ComponentProps<"h2">) {
  return (
    <h2
      {...props}
      className={cn(
        `font-brand-secondary text-primary-500 pb-6 text-4xl font-semibold md:text-5xl`,
        props.className,
      )}
    />
  );
}
