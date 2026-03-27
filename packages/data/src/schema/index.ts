import {
  mysqlTable,
  int,
  varchar,
  mysqlEnum,
  boolean,
  datetime,
  char,
  foreignKey,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const metricSuffixEnums = mysqlEnum("metric_suffix", ["+", "%"]);
export const roleEnums = mysqlEnum("user_role", ["admin", "student", "basic"]);

export const UserTable = mysqlTable("user", {
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().primaryKey(),
  oauthProviderAvatarImageUrl: varchar("oauth_avatar", {
    length: 255,
  }).notNull(),
  uploadedAvatarImageUrl: varchar("custom_avatar", { length: 255 }),

  tableIdentifierToken: char("table_identifier_token", { length: 4 })
    .notNull()
    .default("USER"),
});

export const ProfileTable = mysqlTable("profile", {
  profileOf: varchar("profile_of", { length: 255 })
    .notNull()
    .primaryKey()
    .references(() => UserTable.email, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  age: int().notNull(),
  role: roleEnums.notNull().$default(() => "basic"),

  tableIdentifierToken: char("table_identifier_token", { length: 4 })
    .notNull()
    .default("PROF"),
});

export const BenefitedUserTable = mysqlTable("benefited_user", {
  userEmail: varchar("email", { length: 255 })
    .primaryKey()
    .references(() => UserTable.email, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  tableIdentifierToken: char("table_identifier_token", { length: 4 })
    .notNull()
    .default("BUSR"),
});

export const MetricsTable = mysqlTable("metric", {
  metricsContent: varchar("metric_content", { length: 255 })
    .notNull()
    .primaryKey(),
  metricsHeading: varchar("metric_heading", { length: 100 }).notNull(),
  metricsSuffix: metricSuffixEnums.notNull(),
  isVisible: boolean("is_visible_to_users")
    .$default(() => false)
    .notNull(),

  tableIdentifierToken: char("table_identifier_token", { length: 4 })
    .notNull()
    .default("MTRC"),
});

export const FaqTable = mysqlTable("faq", {
  id: int("id").primaryKey().autoincrement(),
  faqAnswer: varchar("faq_answer", { length: 511 }).notNull(),
  faqQuestion: varchar("faq_question", { length: 255 }).notNull(),
  isVisible: boolean("is_visible_to_users")
    .$default(() => false)
    .notNull(),

  tableIdentifierToken: char("table_identifier_token", { length: 4 })
    .notNull()
    .default("FAQS"),
});

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

  tableIdentifierToken: char("table_identifier_token", { length: 4 })
    .notNull()
    .default("WBNR"),
});

export const OfferedCoursesTable = mysqlTable("offered_course", {
  id: varchar("id", { length: 127 }).primaryKey(),
  courseTopic: varchar("course_topic", { length: 255 }).notNull(),
  courseHeading: varchar("course_heading", { length: 255 }).notNull(),
  brochureLink: varchar("brochure_link", { length: 255 }).notNull(),
  originalEnrlomentFee: int("original_enrloment_fee").notNull(),
  discountedEnrlomentFee: int("dicounted_enrloment_fee"),
  imageLink: varchar("image_link", { length: 255 }).notNull(),
  imageBase64Data: varchar("image_base64_data", { length: 1000 }),

  tableIdentifierToken: char("table_identifier_token", { length: 4 })
    .notNull()
    .default("OFFC"),
});

export const CourseAdvantagesTable = mysqlTable(
  "course_advantage",
  {
    id: int("id").primaryKey().autoincrement(),
    details: varchar("details", { length: 127 }).notNull(),
    isVisible: boolean("is_visible_to_users")
      .notNull()
      .$default(() => true),
    relatedTo: varchar("related_to", { length: 127 }).notNull(),

    tableIdentifierToken: char("table_identifier_token", { length: 4 })
      .notNull()
      .default("CADV"),
  },

  (table) => [
    foreignKey({
      columns: [table.relatedTo],
      foreignColumns: [OfferedCoursesTable.id],
      name: "offered_course_to_advantage",
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);

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

  tableIdentifierToken: char("table_identifier_token", { length: 4 })
    .notNull()
    .default("TMNL"),
});

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
  updatedAt: timestamp("updated_at", { mode: "date", fsp: 6 }).notNull(),
  isVerified: boolean("is_verified_user")
    .notNull()
    .$defaultFn(() => false),

  tableIdentifierToken: char("table_identifier_token", { length: 4 })
    .notNull()
    .default("CONT"),
});

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

    tableIdentifierToken: char("table_identifier_token", { length: 4 })
      .notNull()
      .default("CBPR"),
  },
  (table) => [
    foreignKey({
      columns: [table.userEmail],
      foreignColumns: [UserTable.email],
      name: "cbp_user_fk",
    }),
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [OfferedCoursesTable.id],
      name: "cbp_course_fk",
    }),
    uniqueIndex("unique_user_course").on(table.userEmail, table.courseId),
  ],
);

/**
 * This is used to identify which table the data is from,
 * and if there is any querry we have to do we can understand
 * in which table we have to do the query.
 */
export function tableIdentifier(
  prefix: /**
     * UserTable
     */
    | "USER"
    /**
     * ProfileTable
     */
    | "PROF"
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
     * CourseBuyingProfiles
     */
    | "CBPR",
) {
  return `${prefix}`;
}
/**
 * This is used to identify which table the data is from,
 * and if there is any querry we have to do we can understand
 * in which table we have to do the query.
 */
export function identifyTable(tableIdentifierToken: string) {
  const prefix = tableIdentifierToken as Parameters<typeof tableIdentifier>[0];

  switch (prefix) {
    case "BUSR":
      return "BenefitedUserTable" as const;
    case "FAQS":
      return "FaqTable" as const;
    case "MTRC":
      return "MetricsTable" as const;
    case "PROF":
      return "ProfileTable" as const;
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
      return "CourseBuyingProfiles" as const;

    default:
      throw new Error("Provide a valid prefix to identify table name.");
  }
}
