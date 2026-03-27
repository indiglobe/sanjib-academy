import { Main } from "@/components/main/public/main";
import { SlSocialFacebook } from "react-icons/sl";
import ConatctForm from "./contact-form";
import { cn } from "@/utils/cn";
import { LuPhoneCall } from "react-icons/lu";
import { LuMail } from "react-icons/lu";

export default function ContactUs() {
  return (
    <Main>
      <div className={cn(`mb-10 flex flex-col gap-4 lg:flex-row`)}>
        <div
          data-slot={`into-section`}
          className={cn(
            `bg-primary-500 text-background dark:text-foreground flex flex-col gap-6 rounded-md px-4 py-10 max-xl:pb-30 lg:w-1/2 xl:w-1/3`,
          )}
        >
          <div>
            <h2 className={cn(`text-2xl`)}>Get in touch</h2>
          </div>

          <div className={cn(`flex flex-col gap-6`)}>
            <div>
              <h3 className={cn(`text-xl`)}>Chat to us</h3>
              <p>Our friendly team is here to help.</p>
              <p>
                <a
                  className={cn(`flex items-center gap-2`)}
                  href="mailto:gangulysanjibkumar@gmail.com"
                >
                  <span>
                    <LuMail />
                  </span>{" "}
                  <span>gangulysanjibkumar@gmail.com</span>
                </a>
              </p>
            </div>

            <div>
              <h3 className={cn(`text-xl`)}>Call us</h3>
              <p>Monday - Friday, from 8 A.M to 5 P.M .</p>
              <p>
                <a
                  className={cn(`flex items-center gap-2`)}
                  href="tel:+918389893225"
                >
                  <span>
                    <LuPhoneCall />
                  </span>{" "}
                  <span>+91 83898 93225</span>
                </a>
              </p>
            </div>

            <div>
              <h3 className={cn(`text-xl`)}>Social media</h3>
              <div className={cn(`flex gap-2`)}>
                <a href="http://facebook.com">
                  <SlSocialFacebook />
                </a>
                <a href="http://facebook.com">
                  <SlSocialFacebook />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={cn(`lg:w-1/2 xl:ml-auto xl:w-2/3 xl:max-w-140`)}>
          {/* As this form contains complex logic with validation so 
          it is defined in another file */}
          <ConatctForm />
        </div>
      </div>
    </Main>
  );
}
