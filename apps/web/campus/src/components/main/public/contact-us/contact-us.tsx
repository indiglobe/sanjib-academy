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
            `bg-primary-500 text-background dark:text-foreground flex flex-col gap-6 rounded-md px-6 py-12 lg:w-1/2 xl:w-1/3`,
          )}
        >
          <h2 className={cn(`text-3xl font-semibold`)}>Get in touch</h2>

          <div className={cn(`flex flex-col gap-6`)}>
            {/* Chat */}
            <div>
              <h3 className={cn(`mb-1 text-xl font-medium`)}>Chat to us</h3>
              <p className="mb-2">Our friendly team is here to help.</p>
              <a
                className={cn(
                  `flex items-center gap-2 font-medium hover:underline`,
                )}
                href="mailto:gangulysanjibkumar@gmail.com"
              >
                <LuMail /> gangulysanjibkumar@gmail.com
              </a>
            </div>

            {/* Call */}
            <div>
              <h3 className={cn(`mb-1 text-xl font-medium`)}>Call us</h3>
              <p className="mb-2">Monday - Friday, 8 A.M to 5 P.M</p>
              <a
                className={cn(
                  `flex items-center gap-2 font-medium hover:underline`,
                )}
                href="tel:+918389893225"
              >
                <LuPhoneCall /> +91 83898 93225
              </a>
            </div>

            {/* Social */}
            <div>
              <h3 className={cn(`mb-2 text-xl font-medium`)}>Social media</h3>
              <div className="flex gap-4 text-2xl">
                <a
                  href="http://facebook.com"
                  className="hover:text-accent-500 transition-colors"
                >
                  <SlSocialFacebook />
                </a>
                <a
                  href="http://facebook.com"
                  className="hover:text-accent-500 transition-colors"
                >
                  <SlSocialFacebook />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={cn(`lg:w-1/2 xl:w-2/3`)}>
          <ConatctForm />
        </div>
      </div>
    </Main>
  );
}
