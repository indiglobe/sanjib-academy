import { cn } from "@/utils/cn";
import { Link, useLoaderData } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ComponentProps } from "react";
import heroSection from "@/assets/hero-section.png";
import ownerPortrait from "@/assets/owner-portrait.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Main } from "../main";
import {
  MetricsCard,
  MetricsCardContent,
  MetricsCardHeading,
} from "@/ui/metrics-card";

export default function HomePage() {
  return (
    <Main>
      <HeroSection />

      <Metrics />
    </Main>
  );
}

function HeroSection({ ...props }: ComponentProps<"section">) {
  const { benefitedUsers } = useLoaderData({ from: "/(public)/" });
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
          <Image src={heroSection} layout="fullWidth" alt="owner image" />
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
          <div
            className={cn(
              `bg-foreground/10 mb-4 flex max-w-max items-center gap-2 rounded-full p-2 pr-8 sm:gap-4 md:mb-8`,
            )}
          >
            <div className={cn(`group flex`)}>
              {benefitedUsers.map(({ email, name, imageUrl }, idx) => {
                if (idx >= 4) return null;
                return (
                  <Avatar className={cn(`size-10 md:size-12`)} key={email}>
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

          <div
            className={cn(
              `text-background dark:text-foreground bg-primary-500 flex max-w-max rounded-full px-4 py-2 text-base font-semibold md:text-lg lg:text-xl`,
            )}
          >
            7+ Years Experience
          </div>

          <div
            className={cn(
              `font-brand-secondary flex flex-col gap-1 py-10 md:gap-2 lg:gap-4`,
            )}
          >
            <span className={cn(`text-2xl md:text-3xl lg:text-4xl`)}>
              India's Best Channel to{" "}
            </span>
            <span
              className={cn(
                `text-primary-500 text-4xl font-semibold md:text-5xl lg:text-6xl lg:leading-16`,
              )}
            >
              Learn and Trade Everyday{" "}
            </span>
            <span className={cn(`text-2xl md:text-3xl lg:text-4xl`)}>
              with Experienced Traders.
            </span>
          </div>

          <div className={cn(`flex flex-wrap gap-x-4 gap-y-4`)}>
            <Link to="/courses" tabIndex={-1}>
              <button
                className={cn(
                  `focus-visible:ring-offset-background text-background dark:text-foreground bg-primary-500 hover:bg-primary-500 focus-visible:bg-primary-500 focus-visible:ring-primary-500 focus-visible:textp rounded-full px-4 py-2 text-base font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-lg lg:text-xl`,
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
        </div>
        {/* hero section texts */}
        {/* hero section images */}
        <div className={cn(`flex items-center justify-center lg:basis-1/3`)}>
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

function Metrics({ ...props }: ComponentProps<"section">) {
  const { metrics } = useLoaderData({ from: "/(public)/" });
  return (
    <section {...props} className={cn(`py-10`, props.className)}>
      <div
        className={cn(
          `m-auto grid max-w-max grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4`,
        )}
      >
        {metrics.map(({ content, heading }) => {
          return (
            <MetricsCard key={content}>
              <MetricsCardHeading>{heading}</MetricsCardHeading>
              <MetricsCardContent>{content}</MetricsCardContent>
            </MetricsCard>
          );
        })}
      </div>
    </section>
  );
}
