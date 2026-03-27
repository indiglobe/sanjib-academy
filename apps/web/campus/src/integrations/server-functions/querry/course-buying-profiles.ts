import { readCoursesBoughtByEmail } from "@repo/data/querries/course-buying-profiles";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

export const readCoursesBoughtByEmailServerFn = createServerFn()
  .inputValidator(
    zodValidator(
      z.object({
        courseId: z.enum([
          "fno-hedging",
          "fundamental-analysis",
          "institutional-trading",
        ]),
        email: z.string(),
      }),
    ),
  )
  .handler(async ({ data }) => {
    const { courseId, email } = data;

    return await readCoursesBoughtByEmail({ courseName: courseId, email });
  });
