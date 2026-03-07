import {
  mysqlTable,
  int,
  varchar,
  mysqlEnum,
  boolean,
  datetime,
  char,
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

  prefixedId: char("prefix_id", { length: 42 })
    .notNull()
    .$defaultFn(() => prefixId("USER")),
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

  prefixedId: char("prefix_id", { length: 42 })
    .notNull()
    .$defaultFn(() => prefixId("PROF")),
});

export const BenefitedUserTable = mysqlTable("benefited_users", {
  userEmail: varchar("email", { length: 255 })
    .primaryKey()
    .references(() => UserTable.email, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  prefixedId: char("prefix_id", { length: 42 })
    .notNull()
    .$defaultFn(() => prefixId("BUSR")),
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

  prefixedId: char("prefix_id", { length: 42 })
    .notNull()
    .$defaultFn(() => prefixId("MTRC")),
});

export const FaqTable = mysqlTable("faq", {
  faqAnswer: varchar("faq_answer", { length: 511 }).notNull(),
  faqQuestion: varchar("faq_question", { length: 255 }).notNull().primaryKey(),
  isVisible: boolean("is_visible_to_users")
    .$default(() => false)
    .notNull(),

  prefixedId: char("prefix_id", { length: 42 })
    .notNull()
    .$defaultFn(() => prefixId("FAQS")),
});

export const WebinarDetailsTable = mysqlTable("webinar_details", {
  id: int("id").primaryKey().autoincrement(),
  scheduledDate: datetime("webinar_scheduled_date", { mode: "date" }).notNull(),
  webinarTopic: varchar("webinar_topic", { length: 255 }).notNull(),
  approxDuration: int("webinar_duration"),
  actualPrice: int("actual_price").notNull(),
  discountedPrice: int("discounted_price"),

  prefixedId: char("prefix_id", { length: 42 })
    .notNull()
    .$defaultFn(() => prefixId("WBNR")),
});

/**
 * This is used to identify which table the data is from,
 * and if there is any querry we have to do we can understand
 * in which table we have to do the query.
 */
export function prefixId(
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
    | "WBNR",
) {
  const uuid = crypto.randomUUID();

  return `${prefix}__${uuid}`;
}
/**
 * This is used to identify which table the data is from,
 * and if there is any querry we have to do we can understand
 * in which table we have to do the query.
 */
export function identifyTable(prefixedId: string) {
  const prefix = prefixedId.split("__")[0] as Parameters<typeof prefixId>[0];

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

    default:
      throw new Error("Provide a valid prefix to identify table name.");
  }
}
