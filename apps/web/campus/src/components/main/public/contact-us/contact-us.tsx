import { Main } from "@/components/main/public/main";
import { SlSocialFacebook } from "react-icons/sl";
import ConatctForm from "./contact-form";
import { cn } from "@/utils/cn";
import { LuPhoneCall, LuMail } from "react-icons/lu";

export default function ContactUs() {
  return (
    <Main>
      <div className={cn(`flex flex-col gap-8 pb-10 lg:flex-row lg:gap-12`)}>
        {/* Contact Info */}
        <div
          data-slot={`into-section`}
          className={cn(
            `from-primary-500 via-primary-600 to-primary-500 dark:text-primary-100 relative flex flex-col gap-8 overflow-hidden bg-linear-to-br px-6 py-12 text-white lg:w-1/2 xl:w-1/3`,
          )}
        >
          {/* Background Glow */}
          <div
            className={cn(
              `from-accent-500/40 via-secondary-500/30 to-primary-500/40 absolute inset-0 -z-10 bg-linear-to-br opacity-40 blur-2xl`,
            )}
          />

          <h2
            className={cn(
              `text-primary-100 dark:text-primary-900 text-3xl font-semibold tracking-tight`,
            )}
          >
            Get in touch
          </h2>

          <div className={cn(`flex flex-col gap-6`)}>
            {/* Chat */}
            <div
              className={cn(
                `flex flex-col gap-2 border border-white/10 bg-white/5 p-4 backdrop-blur-sm`,
              )}
            >
              <div className={cn(`flex items-center gap-3`)}>
                <span
                  className={cn(
                    `flex size-8 items-center justify-center bg-white/10 text-white`,
                  )}
                >
                  <LuMail />
                </span>
                <h3 className={cn(`text-lg font-medium`)}>Chat to us</h3>
              </div>
              <p className={cn(`text-sm text-white/80`)}>
                Our friendly team is here to help.
              </p>
              <a
                className={cn(
                  `flex items-center gap-2 font-medium text-white hover:underline`,
                )}
                href="mailto:gangulysanjibkumar@gmail.com"
              >
                gangulysanjibkumar@gmail.com
              </a>
            </div>

            {/* Call */}
            <div
              className={cn(
                `flex flex-col gap-2 border border-white/10 bg-white/5 p-4 backdrop-blur-sm`,
              )}
            >
              <div className={cn(`flex items-center gap-3`)}>
                <span
                  className={cn(
                    `flex size-8 items-center justify-center bg-white/10 text-white`,
                  )}
                >
                  <LuPhoneCall />
                </span>
                <h3 className={cn(`text-lg font-medium`)}>Call us</h3>
              </div>
              <p className={cn(`text-sm text-white/80`)}>
                Monday - Friday, 8 A.M to 5 P.M
              </p>
              <a
                className={cn(
                  `flex items-center gap-2 font-medium text-white hover:underline`,
                )}
                href="tel:+918389893225"
              >
                +91 83898 93225
              </a>
            </div>

            {/* Social */}
            <div
              className={cn(
                `flex flex-col gap-3 border border-white/10 bg-white/5 p-4 backdrop-blur-sm`,
              )}
            >
              <h3 className={cn(`text-lg font-medium`)}>Social media</h3>
              <div className={cn(`flex gap-4 text-xl`)}>
                <a
                  href="http://facebook.com"
                  className={cn(
                    `flex size-10 items-center justify-center bg-white/10 text-white transition hover:bg-white/20`,
                  )}
                >
                  <SlSocialFacebook />
                </a>
                <a
                  href="http://facebook.com"
                  className={cn(
                    `flex size-10 items-center justify-center bg-white/10 text-white transition hover:bg-white/20`,
                  )}
                >
                  <SlSocialFacebook />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={cn(`flex items-center lg:w-1/2 xl:w-2/3`)}>
          <div
            className={cn(
              `bg-background dark:bg-primary-950/40 border-primary-200/40 dark:border-primary-800/40 w-full rounded-4xl border p-6 sm:p-8`,
            )}
          >
            <ConatctForm />
          </div>
        </div>
      </div>
    </Main>
  );
}
