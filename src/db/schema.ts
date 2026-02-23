import {
  mysqlTable,
  int,
  varchar,
  mysqlEnum,
  boolean,
} from "drizzle-orm/mysql-core";

export const metricSuffixEnums = mysqlEnum("metric_suffix", ["+", "%"]);

export const UserTable = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  oauthProviderAvatarImageUrl: varchar("oauth_avatar", {
    length: 255,
  }).notNull(),
  uploadedAvatarImageUrl: varchar("custom_avatar", { length: 255 }),
});

export const BenefitedUserTable = mysqlTable("benefited_users", {
  userEmail: varchar("email", { length: 255 })
    .primaryKey()
    .references(() => UserTable.email),
});

export const MetricsTable = mysqlTable("metrics", {
  metricsHeading: int("metric_heading").notNull(),
  metricsContent: varchar("metric_content", { length: 255 })
    .notNull()
    .primaryKey(),
  metricsSuffix: metricSuffixEnums.notNull(),
  isVisible: boolean("is_visible_to_users")
    .$default(() => false)
    .notNull(),
});
