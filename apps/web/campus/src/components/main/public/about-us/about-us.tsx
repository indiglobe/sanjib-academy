import { Main } from "@/components/main/public/main";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import ownerPortrait from "@/assets/owner-portrait.png";
import { Image } from "@unpic/react";

export default function AboutUs() {
  return (
    <Main>
      <AboutUsContent />
    </Main>
  );
}

export function AboutUsContent({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      {...props}
      className={cn(`w-full`, className)}
      data-slot={`about-us`}
    >
      <div
        className={cn(`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24`)}
      >
        {/* ---------------- HERO ---------------- */}
        <div
          className={cn(
            `flex flex-col items-center gap-6 text-center lg:items-start lg:text-left`,
          )}
        >
          <h1
            className={cn(
              `text-foreground text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl`,
            )}
          >
            About SANJIB ACADEMY
          </h1>

          <p
            className={cn(`text-foreground/70 max-w-3xl text-sm sm:text-base`)}
          >
            SANJIB ACADEMY is built with a single goal — to help traders move
            from confusion to clarity by understanding how markets actually
            work. No shortcuts, no signals — just structured thinking and real
            skill.
          </p>
        </div>

        {/* ---------------- INSTRUCTOR ---------------- */}
        <div
          className={cn(
            `mt-16 flex flex-col gap-10 lg:flex-row lg:items-center`,
          )}
        >
          {/* Image */}
          <div className={cn(`relative w-full max-w-sm lg:max-w-md`)}>
            {/* controlled glow (works in both modes) */}
            <div
              className={cn(
                `from-primary-500/20 via-accent-500/10 to-secondary-500/20 absolute inset-0 -z-10 bg-linear-to-br opacity-60 blur-2xl`,
              )}
            />

            <div
              className={cn(
                `border-primary-300/40 dark:border-primary-700/40 bg-background aspect-3/4 w-full overflow-hidden border`,
              )}
            >
              <Image
                src={ownerPortrait}
                layout="fullWidth"
                alt="Sanjib Kumar Gangully"
                className={cn(`h-full w-full object-cover`)}
              />
            </div>
          </div>

          {/* Content */}
          <div className={cn(`mt-10 mb-auto flex max-w-2xl flex-col gap-5`)}>
            <h2
              className={cn(
                `text-foreground text-2xl font-semibold sm:text-3xl`,
              )}
            >
              SANJIB KUMAR GANGULLY
            </h2>

            <p className={cn(`text-foreground/70 text-sm sm:text-base`)}>
              A professional trader and mentor focused on building traders who
              understand market behavior — not just strategies.
            </p>

            <p className={cn(`text-foreground/70 text-sm sm:text-base`)}>
              His approach combines price action, liquidity, and institutional
              thinking to help traders develop clarity and independent
              decision-making.
            </p>

            <p className={cn(`text-foreground/70 text-sm sm:text-base`)}>
              This is not about guessing trades — it's about understanding how
              and why the market moves.
            </p>
          </div>
        </div>

        {/* ---------------- VALUE SECTION ---------------- */}
        <div
          className={cn(
            `mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`,
          )}
        >
          {[
            {
              title: "Structured Learning",
              desc: "Step-by-step progression without confusion or overload.",
            },
            {
              title: "Institutional Mindset",
              desc: "Understand how real capital moves in the market.",
            },
            {
              title: "Execution Focus",
              desc: "Improve timing, discipline, and decision-making.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={cn(
                `group border-primary-300/40 dark:border-primary-700/40 bg-background relative border p-5 transition`,
              )}
            >
              {/* subtle hover effect (not overpowering) */}
              <div
                className={cn(
                  `from-primary-500/10 via-accent-500/5 to-secondary-500/10 absolute inset-0 -z-10 bg-linear-to-br opacity-0 transition group-hover:opacity-100`,
                )}
              />

              <h3 className={cn(`text-foreground text-base font-semibold`)}>
                {item.title}
              </h3>

              <p className={cn(`text-foreground/70 mt-2 text-sm`)}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ---------------- CTA ---------------- */}
        <div
          className={cn(`mt-20 flex flex-col items-center gap-4 text-center`)}
        >
          <h3
            className={cn(`text-foreground text-xl font-semibold sm:text-2xl`)}
          >
            Start Learning the Right Way
          </h3>

          <p className={cn(`text-foreground/70 max-w-xl text-sm`)}>
            Build a structured approach to trading with SANJIB ACADEMY.
          </p>

          <button
            className={cn(
              `bg-primary-500 hover:bg-primary-600 px-6 py-3 text-sm font-medium text-white transition`,
            )}
          >
            Explore Courses
          </button>
        </div>
      </div>
    </section>
  );
}
