import { cn } from "@/utils/cn";
import {
  ComponentProps,
  createContext,
  RefObject,
  useContext,
  useRef,
} from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { create } from "zustand";
import { Check } from "lucide-react";
import { Button } from "@/ui/button";

gsap.registerPlugin(Flip);

export type AllCourses =
  | "institutional-trading"
  | "fno-trading"
  | "option-hedging";

interface ActiveCourseSectionState {
  courseName: AllCourses;
  setCourseName: (changingCourse: AllCourses) => void;
}

export const useActiveCourseSectionState = create<ActiveCourseSectionState>()(
  (set) => ({
    courseName: "institutional-trading",
    setCourseName: (courseName) => set({ courseName }),
  }),
);

export type TCourseContext = {
  courseContentRef: RefObject<HTMLDivElement>;
  togglingButtonHighlightRef: RefObject<HTMLDivElement>;
  buttonContainerRef: RefObject<HTMLDivElement>;
  initialActiveElement: AllCourses;
};

export const CourseContext = createContext<TCourseContext>(
  null as unknown as TCourseContext,
);

export function useCourseContext() {
  const courseContext = useContext(CourseContext);

  if (!courseContext)
    throw new Error("`useCourseContext` shoule be uesd inside `CourseContext");

  return courseContext;
}

const COURSE_ORDER: AllCourses[] = [
  "institutional-trading",
  "fno-trading",
  "option-hedging",
];

export function Courses({ ...props }: ComponentProps<"div">) {
  const { courseName } = useActiveCourseSectionState();
  const courseContentRef = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement,
  );
  const togglingButtonHighlightRef = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement,
  );
  const buttonContainerRef = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement,
  );
  const initialActiveElement: AllCourses = "institutional-trading";

  // animation for button section
  useGSAP(
    () => {
      const buttons = buttonContainerRef.current?.querySelectorAll("button");
      if (!buttons) return;

      const activeBtn = Array.from(buttons).find((btn) => {
        return btn.getAttribute("data-buton-panel") === courseName;
      });

      if (!activeBtn || !togglingButtonHighlightRef.current) return;

      const state = Flip.getState(togglingButtonHighlightRef.current);

      activeBtn.appendChild(togglingButtonHighlightRef.current);

      Flip.from(state, {
        duration: 0.4,
        ease: "power2.out",
        absolute: true,
      });
    },
    { dependencies: [courseName] },
  );
  // animation for button section

  // animation for contect section
  useGSAP(
    () => {
      if (!courseContentRef.current) return;

      const panels = Array.from(
        courseContentRef.current.children,
      ) as HTMLDivElement[];

      const activeIndex = COURSE_ORDER.indexOf(courseName);

      panels.forEach((panel, index) => {
        gsap.to(panel, {
          left: `${(index - activeIndex) * 100}%`,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    },
    { dependencies: [courseName] },
  );
  // animation for contect section

  return (
    <CourseContext
      value={{
        togglingButtonHighlightRef,
        courseContentRef,
        buttonContainerRef,
        initialActiveElement,
      }}
    >
      <div {...props} className={cn(``, props.className)} />
    </CourseContext>
  );
}

export function TogglingButtonContainer({ ...props }: ComponentProps<"div">) {
  const { buttonContainerRef } = useCourseContext();
  return (
    <div
      {...props}
      className={cn(
        `bg-primary-500 relative m-auto flex max-w-100 flex-col gap-1 rounded-[calc(var(--spacing)*7)] p-1.5 text-white md:max-w-max md:flex-row`,
        props.className,
      )}
      ref={buttonContainerRef}
    />
  );
}

export function TogglingButton({
  buttonPanel,
  ...props
}: { buttonPanel: AllCourses } & ComponentProps<"button">) {
  const { courseName, setCourseName } = useActiveCourseSectionState();
  const { togglingButtonHighlightRef, initialActiveElement } =
    useCourseContext();

  return (
    <button
      {...props}
      data-buton-panel={buttonPanel}
      className={cn(
        "relative z-10 rounded-[calc(var(--spacing)*8)] px-3 py-2 text-lg transition-all outline-none",
        {
          "focus-visible:ring-background focus-visible:ring-offset-primary-500 focus-visible:ring-2 focus-visible:ring-offset-2":
            courseName === buttonPanel,
          "text-primary-500": courseName === buttonPanel,
          "focus-visible:ring-primary-500 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2":
            courseName !== buttonPanel,
        },
        props.className,
      )}
      onClick={() => setCourseName(buttonPanel)}
    >
      {props.children}
      {initialActiveElement === buttonPanel && (
        <div
          ref={togglingButtonHighlightRef}
          className={cn(
            `absolute inset-0 rounded-[calc(var(--spacing)*8)] bg-white`,
          )}
          style={{ zIndex: -1 }}
        />
      )}
    </button>
  );
}

export function CourseContentContainer({ ...props }: ComponentProps<"div">) {
  const { courseContentRef } = useCourseContext();
  return (
    <div
      {...props}
      ref={courseContentRef}
      className={cn(
        `relative m-auto mt-6 h-140 max-w-140 overflow-clip md:h-120`,
        props.className,
      )}
    />
  );
}

export function CourseContent({
  contentPanel,
  ...props
}: { contentPanel: AllCourses } & ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `border-primary-500 absolute top-0 left-0 flex h-full w-full flex-col gap-6 rounded-2xl border px-4 py-6`,
        props.className,
      )}
      data-content-panel={contentPanel}
      style={{ left: `${COURSE_ORDER.indexOf(contentPanel) * 100}%` }}
    />
  );
}

export function CourseContentHeading({ ...props }: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className={cn(`text-primary-500 text-2xl font-semibold`, props.className)}
    />
  );
}

export function LearningTopicList({ ...props }: ComponentProps<"ul">) {
  return <ul {...props} className={cn(`space-y-4`, props.className)} />;
}

export function LearningTopicItem({ ...props }: ComponentProps<"li">) {
  return (
    <li {...props} className={cn(`flex items-center gap-2`, props.className)}>
      <span className={cn(`rounded-full bg-green-500`)}>
        <Check className={cn(`size-5 p-0.5 text-white`)} />
      </span>
      {props.children}
    </li>
  );
}

export function CourseContentFooter({ ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        `mt-auto flex w-full flex-wrap items-center justify-between gap-4`,
        props.className,
      )}
    />
  );
}

export function CourseEnrollNow({ ...props }: ComponentProps<typeof Button>) {
  return (
    <Button {...props} className={cn(`uppercase`, props.className)}>
      Enroll Now
    </Button>
  );
}

export function DownloadCourseBrochure({
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      variant={"outline"}
      className={cn(
        `border-primary-500 text-primary-500 uppercase dark:text-white`,
        props.className,
      )}
    >
      Download Brochure
    </Button>
  );
}
