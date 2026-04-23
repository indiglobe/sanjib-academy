import {
  mysqlTable,
  int,
  varchar,
  mysqlEnum,
  boolean,
  datetime,
  char,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

/**
 * This is used to identify which table the data is from,
 * and if there is any querry we have to do we can understand
 * in which table we have to do the query.
 */
export type TableIdentifierToken =
  /**
   * UserTable
   */
  | "USER"
  /**
   * BenefitedUserTable
   */
  | "BUSR"
  /**
   * MetricsTable
   */
  | "MTRC"
  /**
   * FaqTable
   */
  | "FAQS"
  /**
   * WebinarDetailsTable
   */
  | "WBNR"
  /**
   * OfferedCoursesTable
   */
  | "OFFC"
  /**
   * CourseAdvantagesTable
   */
  | "CADV"
  /**
   * TestimonialsTable
   */
  | "TMNL"
  /**
   * ContactMessageTable
   */
  | "CONT"
  /**
   * CourseBuyingProfilesTable
   */
  | "CBPR"
  /**
   * CourseModulesTable
   */
  | "CMOD"
  /**
   * CourseVideoTable
   */
  | "CVID"
  /**
   * CourseDocumentTable
   */
  | "CDOC";

export const metricSuffixEnums = mysqlEnum("metric_suffix", ["+", "%"]);
export const roleEnums = mysqlEnum("user_role", ["admin", "student", "basic"]);
export const tableIdentifierToken = mysqlEnum("table_identifier_token", [
  "BUSR",
  "CADV",
  "CBPR",
  "CONT",
  "FAQS",
  "MTRC",
  "OFFC",
  "TMNL",
  "USER",
  "WBNR",
  "CMOD",
  "CVID",
  "CDOC",
] as [TableIdentifierToken, ...TableIdentifierToken[]]);

// -------------------------
// UserTable
// -------------------------
export const UserTable = mysqlTable("user", {
  email: varchar("email", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  uploadedAvatarImageUrl: varchar("custom_avatar", { length: 255 }).notNull(),
  age: int().notNull(),
  role: roleEnums.notNull().$default(() => "basic"),
  phoneNo: char({ length: 10 }).notNull(),

  tableIdentifierToken: tableIdentifierToken.notNull().default("USER"),
});

// -------------------------
// BenefitedUserTable
// -------------------------
export const BenefitedUserTable = mysqlTable("benefited_user", {
  userEmail: varchar("email", { length: 255 })
    .primaryKey()
    .references(() => UserTable.email, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  benefitedSince: datetime("benefited_since", { mode: "date" }),

  tableIdentifierToken: tableIdentifierToken.notNull().default("BUSR"),
});

// -------------------------
// MetricsTable
// -------------------------
export const MetricsTable = mysqlTable("metric", {
  id: int("id").primaryKey().autoincrement(),
  metricsContent: varchar("metric_content", { length: 255 }).notNull(),
  metricsHeading: varchar("metric_heading", { length: 100 }).notNull(),
  metricsSuffix: metricSuffixEnums.notNull(),
  isVisible: boolean("is_visible_to_users")
    .$default(() => false)
    .notNull(),

  tableIdentifierToken: tableIdentifierToken.notNull().default("MTRC"),
});

// -------------------------
// FaqTable
// -------------------------
export const FaqTable = mysqlTable("faq", {
  id: int("id").primaryKey().autoincrement(),
  faqAnswer: varchar("faq_answer", { length: 511 }).notNull(),
  faqQuestion: varchar("faq_question", { length: 255 }).notNull(),
  isVisible: boolean("is_visible_to_users")
    .$default(() => false)
    .notNull(),

  tableIdentifierToken: tableIdentifierToken.notNull().default("FAQS"),
});

// -------------------------
// WebinarDetailsTable
// -------------------------
export const WebinarDetailsTable = mysqlTable("webinar_detail", {
  id: int("id").primaryKey().autoincrement(),
  scheduledDate: datetime("webinar_scheduled_date", { mode: "date" }).notNull(),
  webinarTopic: varchar("webinar_topic", { length: 255 }).notNull(),
  approxDuration: int("webinar_duration"),
  actualPrice: int("actual_price").notNull(),
  discountedPrice: int("discounted_price"),
  webinarJoiningLink: varchar("webinar_joining_link", {
    length: 255,
  }).notNull(),

  tableIdentifierToken: tableIdentifierToken.notNull().default("WBNR"),
});

// -------------------------
// OfferedCoursesTable
// -------------------------
export const OfferedCoursesTable = mysqlTable("offered_course", {
  id: varchar("id", { length: 127 }).primaryKey(),
  courseTopic: varchar("course_topic", { length: 255 }).notNull(),
  courseHeading: varchar("course_heading", { length: 255 }).notNull(),
  brochureLink: varchar("brochure_link", { length: 255 }).notNull(),
  originalEnrlomentFee: int("original_enrloment_fee").notNull(),
  discountedEnrlomentFee: int("dicounted_enrloment_fee"),
  imageLink: varchar("image_link", { length: 255 }).notNull(),
  imageBase64Data: varchar("image_base64_data", { length: 1000 }),

  tableIdentifierToken: tableIdentifierToken.notNull().default("OFFC"),
});

// -------------------------
// CourseAdvantagesTable
// -------------------------
export const CourseAdvantagesTable = mysqlTable("course_advantage", {
  id: int("id").primaryKey().autoincrement(),
  details: varchar("details", { length: 127 }).notNull(),
  isVisible: boolean("is_visible_to_users")
    .notNull()
    .$default(() => true),
  relatedTo: varchar("related_to", { length: 127 })
    .notNull()
    .references(() => OfferedCoursesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  tableIdentifierToken: tableIdentifierToken.notNull().default("CADV"),
});

// -------------------------
// TestimonialsTable
// -------------------------
export const TestimonialsTable = mysqlTable("testimonial", {
  id: int("id").primaryKey().autoincrement(),
  testimonialText: varchar("testimonial_text", { length: 512 }).notNull(),
  authorEmail: varchar("author_email", { length: 255 })
    .notNull()
    .references(() => UserTable.email, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  authorSocialHandle: varchar("social_handle", { length: 127 }).notNull(),

  tableIdentifierToken: tableIdentifierToken.notNull().default("TMNL"),
});

// -------------------------
// ContactMessageTable
// -------------------------
export const ContactMessageTable = mysqlTable("contact_message", {
  id: int("id").primaryKey().autoincrement(),
  firstName: varchar({ length: 127 }).notNull(),
  lastName: varchar({ length: 127 }).notNull(),
  email: varchar({ length: 127 }).notNull(),
  phoneNo: char({ length: 10 }).notNull(),
  message: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date", fsp: 6 })
    .$defaultFn(() => new Date(Date.now()))
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", fsp: 6 })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
  isVerified: boolean("is_verified_user")
    .notNull()
    .$defaultFn(() => false),

  tableIdentifierToken: tableIdentifierToken.notNull().default("CONT"),
});

// -------------------------
// CourseBuyingProfilesTable
// -------------------------
export const CourseBuyingProfilesTable = mysqlTable(
  "course_buying_profiles",
  {
    id: int("id").primaryKey().autoincrement(),
    userEmail: varchar("user_email", { length: 255 })
      .notNull()
      .references(() => UserTable.email, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    courseId: varchar("course_id", { length: 127 })
      .notNull()
      .references(() => OfferedCoursesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    amountPaid: int("amount_paid").notNull(),
    isCompleted: boolean("is_completed")
      .$default(() => false)
      .notNull(),
    purchasedAt: timestamp("purchased_at", { mode: "date", fsp: 6 })
      .$defaultFn(() => new Date())
      .notNull(),
    orderId: varchar("order_id", { length: 10 }).notNull(),

    tableIdentifierToken: tableIdentifierToken.notNull().default("CBPR"),
  },
  (table) => [
    uniqueIndex("unique_user_course").on(table.userEmail, table.courseId),
  ],
);

// -------------------------
// CourseModulesTable
// -------------------------
export const CourseModulesTable = mysqlTable("course_modules", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 127 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  appearingOrder: int("appearing_order").notNull(),
  courseId: varchar("course_id", { length: 127 })
    .notNull()
    .references(() => OfferedCoursesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  tableIdentifierToken: tableIdentifierToken.notNull().default("CMOD"),
});

// -------------------------
// CourseVideoTable
// -------------------------
export const CourseVideoTable = mysqlTable("course_video", {
  id: int("id").primaryKey().autoincrement(),
  videoURL: varchar("video_url", { length: 127 }).notNull(),
  thumbnailImage: varchar("video_thumbnail_url", { length: 127 }).notNull(),
  videoTitle: varchar("video_title", { length: 127 }).notNull(),
  videoDescription: varchar("video_description", { length: 127 }),
  moduleId: int("module_id")
    .notNull()
    .references(() => CourseModulesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  tableIdentifierToken: tableIdentifierToken.notNull().default("CVID"),
});

// -------------------------
// CourseDocumentTable
// -------------------------
export const CourseDocumentTable = mysqlTable("course_document", {
  id: int("id").primaryKey().autoincrement(),
  documentURL: varchar("document_url", { length: 127 }).notNull(),
  thumbnailImage: varchar("document_thumbnail_url", { length: 127 }).notNull(),
  documentTitle: varchar("document_title", { length: 127 }).notNull(),
  documentDescription: varchar("document_description", { length: 127 }),
  moduleId: int("module_id")
    .notNull()
    .references(() => CourseModulesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  tableIdentifierToken: tableIdentifierToken.notNull().default("CDOC"),
});

/**
 * This is used to identify which table the data is from,
 * and if there is any querry we have to do we can understand
 * in which table we have to do the query.
 */
export function identifyTable(tableIdentifierToken: string) {
  const prefix = tableIdentifierToken as TableIdentifierToken;

  switch (prefix) {
    case "BUSR":
      return "BenefitedUserTable" as const;
    case "FAQS":
      return "FaqTable" as const;
    case "MTRC":
      return "MetricsTable" as const;
    case "USER":
      return "UserTable" as const;
    case "WBNR":
      return "WebinarDetailsTable" as const;
    case "OFFC":
      return "OfferedCoursesTable" as const;
    case "CADV":
      return "CourseAdvantagesTable" as const;
    case "TMNL":
      return "TestimonialsTable" as const;
    case "CONT":
      return "ContactMessageTable" as const;
    case "CBPR":
      return "CourseBuyingProfilesTable" as const;
    case "CMOD":
      return "CourseModulesTable" as const;
    case "CVID":
      return "CourseVideoTable" as const;
    case "CDOC":
      return "CourseDocumentTable" as const;

    default:
      throw new Error("Provide a valid prefix to identify table name.");
  }
}
