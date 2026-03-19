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
  Course,
  CourseCardFooter,
  CourseEnrollNow,
  CourseHeading,
  CoursePricing,
  CourseTopic,
  DownloadCourseBrochure,
  LearningTopicItem,
  LearningTopicList,
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
import { useAnimation } from "@/hooks/use-animaiton";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  LearningStep,
  LearningStepCount,
  LearningStepDetails,
  LearningStepHeading,
} from "./learning-step";
import {
  HorizontalCarousel,
  HorizontalCarouselContent,
  HorizontalCarouselItem,
} from "@/ui/horizontal-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import AutoPlay from "embla-carousel-autoplay";
import {
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorSocialHandle,
  TestimonialCard,
  TestimonialCardHeader,
  TestimonialCardImage,
  TestimonialMessage,
} from "./testimonials";
import { FAQ, FAQAnswer, FAQItem, FAQQuestion } from "./faq";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function HomePage() {
  return (
    <Main>
      <HeroSection />

      <Metrics />

      <MasterClass />

      <OurMethod />

      <OfferedCourses />

      <MeetYourCoach />

      <Testimonials />

      <FaqSection />
    </Main>
  );
}

export function HeroSection({ ...props }: ComponentProps<"section">) {
  const { benefitedUsers } = useLoaderData({
    from: "/(public)/(landing-pages)/",
  });
  const { hasPlayed, markPlayed } = useAnimation.getState();

  useGSAP(() => {
    if (hasPlayed("hero-section")) return;

    const heroSectionStaggring = gsap.timeline({
      onComplete: () => {
        markPlayed("hero-section");
      },
    });

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
      data-slot={`hero-section`}
      className={cn(`font-primary-secondary pt-8 pb-6`, props.className)}
    >
      {/* hero section bg image */}
      <div
        aria-hidden
        data-slot={`background`}
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
            <span
              className={cn(
                `gsap-heading-text`,
                `font-brand-primary max-w-120 pt-4 text-sm md:text-base lg:text-xl`,
              )}
            >
              Combining Smart Money Concepts, Options Hedging, and Fundamental
              Analysis in one powerful mentorship.
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

          <div
            className={cn(
              `absolute bottom-0 left-1/2 isolate flex w-max -translate-x-1/2 flex-col items-center justify-center rounded-2xl px-4 py-2 text-white`,
            )}
          >
            <span className={cn(`text-2xl font-bold`)}>27+</span>
            <span>Years of Market Back Testing</span>
            <span
              className={cn(
                `bg-primary-500/50 border-primary-500 absolute inset-0 -z-1 rounded-2xl border-2 backdrop-blur-xs`,
              )}
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
  const { markPlayed, hasPlayed } = useAnimation();

  useGSAP(() => {
    if (hasPlayed("gsap-metrics-card")) return;

    gsap.from(".gsap-metrics-card", {
      opacity: 0,
      top: 50,
      duration: 0.5,
      delay: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionElement.current,
        start: "top 80%",
        once: true,
      },
      onComplete: () => {
        markPlayed("gsap-metrics-card");
      },
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
  const { markPlayed, hasPlayed } = useAnimation();

  useGSAP(() => {
    if (hasPlayed("gsap-master-class-card")) return;

    gsap.from(".gsap-master-class-card", {
      opacity: 0,
      position: "relative",
      top: "100px",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".gsap-master-class-wrapper",
        start: "top 95%",
      },
      onComplete: () => {
        markPlayed("gsap-master-class-card");
      },
    });
  }, {});

  return (
    <section
      {...props}
      data-slot={`master-class`}
      className={cn(``, props.className)}
    >
      <div
        className={cn(
          `@container flex flex-col items-center py-10 text-center`,
        )}
      >
        <SectionHeading className={cn(`pb-4`)}>
          Who is this masterclass for
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
              Ideal for traders who want to develop a rule-based and
              institutional-level trading strategy.
            </MasterClassContent>
          </MasterClassCard>

          <MasterClassCard className={cn(`gsap-master-class-card`)}>
            <MasterClassIcon>
              <Briefcase />
            </MasterClassIcon>
            <MasterClassHeading>Investors</MasterClassHeading>
            <MasterClassContent>
              Who want to make smarter long-term stock market decisions.
            </MasterClassContent>
          </MasterClassCard>

          <MasterClassCard className={cn(`gsap-master-class-card`)}>
            <MasterClassIcon>
              <GraduationCap />
            </MasterClassIcon>
            <MasterClassHeading>Learners</MasterClassHeading>
            <MasterClassContent>
              Perfect for individuals who want to build deep knowledge of the
              stock market from the ground up.
            </MasterClassContent>
          </MasterClassCard>
        </div>
      </div>
    </section>
  );
}

export function OurMethod({ ...props }: ComponentProps<"section">) {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 28rem)", () => {
      // gsap.from(".gsap-learning-steps", {
      //   stagger: 0.2,
      //   background: "#ff0000",
      //   left: (idx) => {
      //     return `calc(calc(var(--spacing)*4)*${idx})`;
      //   },
      // });
    });
  }, {});

  return (
    <section
      {...props}
      data-slot={`our-method`}
      className={cn(`pt-10`, props.className)}
    >
      <div
        className={cn(
          `flex flex-col items-center gap-4 gap-y-8 xl:flex-row xl:items-start`,
        )}
      >
        <div
          className={cn(
            `w-full max-w-120 text-center xl:basis-1/3 xl:text-left`,
          )}
        >
          <SectionHeading className={cn(`pb-4`)}>
            Learn & Transform in 3 Simple Steps!
          </SectionHeading>

          <p className={cn(``)}>
            Master the stock market with a simple step-by-step learning process
            designed for beginners, traders, and investors.
          </p>

          <div
            className={cn(
              `mt-4 flex items-center justify-center xl:justify-start`,
            )}
          >
            <Link to="/courses" tabIndex={-1}>
              <Button className={cn(`rounded-full`)}>Get Started</Button>
            </Link>
          </div>
        </div>

        <div
          className={cn(
            `flex w-full flex-col items-center justify-center gap-4 gap-y-6 pb-20 sm:flex-row xl:basis-2/3`,
          )}
        >
          <LearningStep
            className={cn(
              `gsap-learning-steps`,
              `3xs:-left-4 top-0 sm:top-0 sm:left-0`,
            )}
          >
            <LearningStepCount>Step 1</LearningStepCount>
            <LearningStepHeading>Join a Free Masterclass</LearningStepHeading>
            <LearningStepDetails>
              Understand how professional traders read the market using Smart
              Money Concepts and institutional strategies.
            </LearningStepDetails>
          </LearningStep>

          <LearningStep
            className={cn(
              `gsap-learning-steps`,
              `3xs:left-0 top-0 sm:top-10 sm:left-0`,
            )}
          >
            <LearningStepCount>Step 2</LearningStepCount>
            <LearningStepHeading>Enroll & Start Learning</LearningStepHeading>
            <LearningStepDetails>
              Get access to the complete course covering institutional trading,
              option hedging, and real market strategies.
            </LearningStepDetails>
          </LearningStep>

          <LearningStep
            className={cn(
              `gsap-learning-steps`,
              `3xs:left-4 top-0 sm:top-20 sm:left-0`,
            )}
          >
            <LearningStepCount>Step 3</LearningStepCount>
            <LearningStepHeading>Apply & Trade Confidently</LearningStepHeading>
            <LearningStepDetails>
              Use the strategies in live market conditions and develop the
              mindset of a disciplined trader.
            </LearningStepDetails>
          </LearningStep>
        </div>
      </div>
    </section>
  );
}

export function OfferedCourses({ ...props }: ComponentProps<"section">) {
  const { offeredCourses } = useLoaderData({
    from: "/(public)/(landing-pages)/",
  });
  return (
    <section
      {...props}
      data-slot={`offered-courses`}
      className={cn(`pt-10`, props.className)}
    >
      <div className={cn(`flex flex-col items-center`)}>
        <SectionHeading className={cn(`pb-4 text-center`)}>
          Courses we offer
        </SectionHeading>

        <div
          className={cn(
            `flex w-full flex-wrap items-stretch justify-center gap-4`,
          )}
        >
          {offeredCourses.map(
            ({
              id,
              courseTopic,
              courseHeading,
              originalEnrlomentFee,
              discountedEnrlomentFee,
              advantages,
            }) => {
              return (
                <Course key={id}>
                  <CourseTopic>{courseTopic}</CourseTopic>
                  <CourseHeading>{courseHeading}</CourseHeading>
                  <CoursePricing
                    actualPrice={originalEnrlomentFee}
                    discountedPrice={discountedEnrlomentFee ?? undefined}
                  />
                  <LearningTopicList>
                    {advantages.map(({ id, details, isVisible }) => {
                      return isVisible ? (
                        <LearningTopicItem key={id}>
                          {details}
                        </LearningTopicItem>
                      ) : null;
                    })}
                  </LearningTopicList>

                  <CourseCardFooter>
                    <CourseEnrollNow />
                    <DownloadCourseBrochure />
                  </CourseCardFooter>
                </Course>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}

export function MeetYourCoach({ ...props }: ComponentProps<"section">) {
  return (
    <section
      {...props}
      data-slot={`meet-your-coach`}
      className={cn(`pt-10`, props.className)}
    >
      <SectionHeading className={cn(`pb-4 text-center md:pt-10`)}>
        Meet your coach
      </SectionHeading>
      <div
        className={cn(
          `flex flex-col items-center gap-4 gap-y-8 lg:m-auto lg:max-w-max lg:flex-row`,
        )}
      >
        <div className={cn(`lg:basis-1/2`)}>
          <div className={cn(`relative flex max-w-240 flex-col gap-y-6 pt-4`)}>
            <span className={cn(``)}>
              <span
                className={cn(
                  `font-brand-secondary text-accent-500 absolute -top-6 left-0 text-[calc(var(--spacing)*40)]`,
                )}
              >
                “
              </span>
              <span className={cn(`float-start inline-block size-20`)} />
              <span className={cn(`text-accent-500 text-4xl font-semibold`)}>
                I
              </span>
              <span> </span>
              operate at the intersection of fundamental intelligence and
              institutional market behavior.
            </span>
            <span>
              As a professional trader and mentor, my expertise lies in decoding
              how capital flows through markets—combining deep fundamental
              analysis with institutional-grade execution models. My approach is
              inspired by the same principles used by hedge funds and smart
              money participants.
            </span>
            <span>
              I don't teach retail shortcuts. I train traders to think like
              institutions—focusing on valuation, macro trends, liquidity, and
              precision timing. This is not just trading education. It's a shift
              in perspective—from following the market to understanding who
              truly moves it.
            </span>
          </div>
        </div>

        <div className={cn(`w-full lg:basis-1/2`)}>
          <div
            className={cn(
              `relative m-auto aspect-3/5 w-full max-w-80 overflow-clip`,
            )}
          >
            <Image
              src={ownerPortrait}
              alt="owner-portrait"
              className={cn(`absolute top-0 right-0 bottom-0 left-0`)}
              layout="fullWidth"
            />
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
    <section {...props} className={cn(``, props.className)}>
      <div className={cn(`flex flex-col items-center justify-center`)}>
        <SectionHeading>Clients words</SectionHeading>
      </div>

      <div className={cn(`-mx-4 sm:-mx-10 md:-mx-20 lg:-mx-30`)}>
        <HorizontalCarousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            AutoScroll({ startDelay: 0, speed: 0.5, stopOnInteraction: false }),
            AutoPlay({ delay: 0 }),
          ]}
          className={cn(`w-full`)}
        >
          <HorizontalCarouselContent>
            {testimonials &&
              testimonials.map(
                ({ id, name, authorSocialHandle, testimonialText, avatar }) => {
                  return (
                    <HorizontalCarouselItem
                      key={id}
                      className={cn(`max-w-max basis-full`)}
                    >
                      <TestimonialCard>
                        <TestimonialCardHeader>
                          <TestimonialCardImage src={avatar} />
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
        <SectionHeading>FAQs</SectionHeading>

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

export function SectionHeading({ ...props }: ComponentProps<"h2">) {
  return (
    <h2
      {...props}
      data-slot={`hero-section-heading`}
      className={cn(
        `font-brand-secondary text-primary-500 pb-6 text-4xl font-semibold md:text-5xl`,
        props.className,
      )}
    />
  );
}
