/**
 * the schemas are generated from `https://rapidtoolset.com/en/tool/ts-to-zod-converter`. Just provide a type and it will generate a schema.
 */

import z from "zod";
// -----------------------------------
// BenefitedUserSchema
// -----------------------------------

export const read__OneBenefitedUserSchema = z.object({
  identifier: z.object({
    email: z.string(),
  }),
});

export const update__BenefitedUserSchema = z.object({
  identifier: z.object({
    email: z.string(),
  }),
  dataToUpdate: z.object({
    benefitedSince: z.date().nullish(),
  }),
});

export const delete__BenefitedUserSchema = z.object({
  identifier: z.object({
    email: z.string(),
  }),
});

export const create__BenefitedUserSchema = z.intersection(
  z.object({
    benefitedSince: z.date().nullish(),
  }),
  z.object({
    email: z.string(),
  }),
);

// -----------------------------------
// ContactMessage
// -----------------------------------

export const create__ContactMessageSchema = z.object({
  email: z.string(),
  phoneNo: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  message: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isVerified: z.boolean().optional(),
});

export const read__OneContactMessageSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
});

export const update__ContactMessageSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
  dataToUpdate: z.object({
    email: z.string().optional(),
    phoneNo: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    message: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    isVerified: z.boolean().optional(),
  }),
});

export const delete__ContactMessageSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
});

// -----------------------------------
// CourseBuyingProfile
// -----------------------------------

export const create__CourseBuyingProfileSchema = z.object({
  userEmail: z.string(),
  courseId: z.string(),
  amountPaid: z.number(),
  isCompleted: z.boolean().optional(),
  purchasedAt: z.date().optional(),
  orderId: z.string(),
});

export const read__AllCourseBuyingProfilesSchema = z
  .object({
    identifier: z.union([
      z.object({
        userEmail: z.string(),
      }),
      z.object({
        courseId: z.string(),
      }),
    ]),
  })
  .optional();

export const read__OneCourseBuyingProfileSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.number(),
    }),
    z.object({
      email: z.string(),
      courseId: z.string(),
    }),
  ]),
});

export const update__CourseBuyingProfileSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.number(),
    }),
    z.object({
      email: z.string(),
      courseId: z.string(),
    }),
  ]),
  dataToUpdate: z.object({
    amountPaid: z.number().optional(),
    isCompleted: z.boolean().optional(),
    purchasedAt: z.date().optional(),
    orderId: z.string().optional(),
  }),
});

export const delete__CourseBuyingProfileSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.number(),
    }),
    z.object({
      email: z.string(),
      courseId: z.string(),
    }),
  ]),
});

// -----------------------------------
// CourseAdvantage
// -----------------------------------

export const create__CourseAdvantageSchema = z.object({
  isVisible: z.boolean().optional(),
  details: z.string(),
  relatedTo: z.string(),
});

export const read__OneCourseAdvantageSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.number(),
    }),
    z.object({
      relatedTo: z.string(),
    }),
  ]),
});

export const read__AllCourseAdvantagesSchema = z.object({
  identifier: z
    .object({
      relatedTo: z.string(),
    })
    .optional(),
});

export const update__CourseAdvantageSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
  dataToUpdate: z.object({
    isVisible: z.boolean().optional(),
    details: z.string().optional(),
    relatedTo: z.string().optional(),
  }),
});

export const delete__CourseAdvantageSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
});

// -----------------------------------
// Faq
// -----------------------------------

export const create__FaqSchema = z.object({
  isVisible: z.boolean().optional(),
  faqAnswer: z.string(),
  faqQuestion: z.string(),
});

export const read__OneFaqSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
});

export const update__FaqSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
  dataToUpdate: z.object({
    isVisible: z.boolean().optional(),
    faqAnswer: z.string().optional(),
    faqQuestion: z.string().optional(),
  }),
});

export const delete__FaqSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
});

// -----------------------------------
// Metric
// -----------------------------------

export const create__MetricSchema = z.object({
  metricsContent: z.string(),
  metricsHeading: z.string(),
  metricsSuffix: z.enum(["+", "%"]),
  isVisible: z.boolean().optional(),
});

export const read__OneMetricSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
});

export const update__MetricSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
  dataToUpdate: z.object({
    id: z.number().optional(),
    metricsContent: z.string().optional(),
    metricsHeading: z.string().optional(),
    metricsSuffix: z.union([z.literal("+"), z.literal("%")]).optional(),
    isVisible: z.boolean().optional(),
  }),
});

export const delete__MetricSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
});

// -----------------------------------
// OfferedCourse
// -----------------------------------

export const create__OfferedCourseSchema = z.object({
  id: z.string(),
  courseTopic: z.string(),
  courseHeading: z.string(),
  brochureLink: z.string(),
  originalEnrlomentFee: z.number(),
  discountedEnrlomentFee: z.number().nullish(),
  imageLink: z.string(),
  imageBase64Data: z.string().nullish(),
});

export const read__OneOfferedCourseSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
});

export const update__OfferedCourseSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
  dataToUpdate: z.object({
    courseTopic: z.string().optional(),
    courseHeading: z.string().optional(),
    brochureLink: z.string().optional(),
    originalEnrlomentFee: z.number().optional(),
    discountedEnrlomentFee: z.number().nullish(),
    imageLink: z.string().optional(),
    imageBase64Data: z.string().nullish(),
  }),
});

export const delete__OfferedCourseSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
});

// -----------------------------------
// Testimonial
// -----------------------------------

export const create__TestimonialSchema = z.object({
  testimonialText: z.string(),
  authorEmail: z.string(),
  authorSocialHandle: z.string(),
});

export const read__OneTestimonialSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
});

export const update__TestimonialSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
  dataToUpdate: z.object({
    testimonialText: z.string().optional(),
    authorSocialHandle: z.string().optional(),
  }),
});

export const delete__TestimonialSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
});

// -----------------------------------
// User
// -----------------------------------

export const create__UserSchema = z.object({
  email: z.string(),
  name: z.string(),
  uploadedAvatarImageUrl: z.string(),
  age: z.number(),
  role: z.enum(["admin", "student", "basic"]).optional(),
  phoneNo: z.string(),
});

export const read__OneUserSchema = z.object({
  identifier: z.object({
    email: z.string(),
  }),
});

export const update__UserSchema = z.object({
  identifier: z.object({
    email: z.string(),
  }),
  dataToUpdate: z.object({
    email: z.string().optional(),
    name: z.string().optional(),
    uploadedAvatarImageUrl: z.string().optional(),
    age: z.number().optional(),
    role: z.enum(["admin", "student", "basic"]).optional(),
    phoneNo: z.string().optional(),
  }),
});

export const delete__UserSchema = z.object({
  identifier: z.object({
    email: z.string(),
  }),
});

// -----------------------------------
// Webinar
// -----------------------------------

export const create__WebinarSchema = z.object({
  scheduledDate: z.date(),
  webinarTopic: z.string(),
  approxDuration: z.number().nullish(),
  actualPrice: z.number(),
  discountedPrice: z.number().nullish(),
  webinarJoiningLink: z.string(),
});

export const read__OneWebinarSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
});

export const update__WebinarSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
  dataToUpdate: z.object({
    scheduledDate: z.date().optional(),
    webinarTopic: z.string().optional(),
    approxDuration: z.number().nullish(),
    actualPrice: z.number().optional(),
    discountedPrice: z.number().nullish(),
    webinarJoiningLink: z.string().optional(),
  }),
});

export const delete__WebinarSchema = z.object({
  identifier: z.object({
    id: z.number(),
  }),
});
