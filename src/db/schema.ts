import {
  mysqlTable,
  int,
  varchar,
  mysqlEnum,
  boolean,
  datetime,
} from "drizzle-orm/mysql-core";

export const metricSuffixEnums = mysqlEnum("metric_suffix", ["+", "%"]);
export const roleEnums = mysqlEnum("user_role", ["admin", "student", "basic"]);

export const UserTable = mysqlTable("users", {
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().primaryKey(),
  oauthProviderAvatarImageUrl: varchar("oauth_avatar", {
    length: 255,
  }).notNull(),
  uploadedAvatarImageUrl: varchar("custom_avatar", { length: 255 }),
});

export const ProfileTable = mysqlTable("profile", {
  profileOf: varchar("profile_of", { length: 255 })
    .notNull()
    .primaryKey()
    .references(() => UserTable.email, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  role: roleEnums.notNull().$default(() => "basic"),
});

export const BenefitedUserTable = mysqlTable("benefited_users", {
  userEmail: varchar("email", { length: 255 })
    .primaryKey()
    .references(() => UserTable.email, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const MetricsTable = mysqlTable("metrics", {
  metricsContent: varchar("metric_content", { length: 255 })
    .notNull()
    .primaryKey(),
  metricsHeading: int("metric_heading").notNull(),
  metricsSuffix: metricSuffixEnums.notNull(),
  isVisible: boolean("is_visible_to_users")
    .$default(() => false)
    .notNull(),
});

export const FaqTable = mysqlTable("faq", {
  faqAnswer: varchar("faq_answer", { length: 511 }).notNull(),
  faqQuestion: varchar("faq_question", { length: 255 }).notNull().primaryKey(),
  isVisible: boolean("is_visible_to_users")
    .$default(() => false)
    .notNull(),
});

export const WebinarDetailsTable = mysqlTable("webinar_details", {
  id: int("id").primaryKey().autoincrement(),
  scheduledDate: datetime("webinar_scheduled_date", { mode: "date" }).notNull(),
  webinarTopic: varchar("webinar_topic", { length: 255 }).notNull(),
  approxDuration: int("webinar_duration"),
  actualPrice: int("actual_price").notNull(),
  discountedPrice: int("discounted_price"),
});
