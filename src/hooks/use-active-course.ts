import { create } from "zustand";

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
