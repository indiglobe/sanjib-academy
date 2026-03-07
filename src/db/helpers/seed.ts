import { InferInsertModel } from "drizzle-orm";
import { faker } from "@faker-js/faker";
import { db } from "..";

import {
  BenefitedUserTable,
  FaqTable,
  MetricsTable,
  ProfileTable,
  UserTable,
  WebinarDetailsTable,
} from "../schema";

async function seed() {
  console.log("__________ SEEDING STARTED __________");

  /**
   * Clear tables (child → parent order)
   */
  await db.delete(WebinarDetailsTable);
  await db.delete(FaqTable);
  await db.delete(MetricsTable);
  await db.delete(BenefitedUserTable);
  await db.delete(ProfileTable);
  await db.delete(UserTable);

  /**
   * USERS
   */
  type InsertUser = InferInsertModel<typeof UserTable>;

  const users: InsertUser[] = Array.from({ length: 40 }, () => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    oauthProviderAvatarImageUrl: faker.image.avatar(),
    uploadedAvatarImageUrl:
      Math.random() > 0.8 ? faker.image.avatar() : undefined,
  }));

  async function insertUserTable() {
    await db.insert(UserTable).values(users);
  }

  /**
   * PROFILES
   */
  type InsertProfile = InferInsertModel<typeof ProfileTable>;

  const profiles: InsertProfile[] = users.map((user) => ({
    profileOf: user.email,
    role:
      Math.random() < 0.2 ? "admin" : Math.random() > 0.5 ? "basic" : "student",
  }));

  async function insertProfileTable() {
    await db.insert(ProfileTable).values(profiles);
  }

  /**
   * BENEFITED USERS
   */
  type InsertBenefitedUser = InferInsertModel<typeof BenefitedUserTable>;

  const benefitedUsers: InsertBenefitedUser[] = users
    .filter(() => Math.random() > 0.7)
    .map((u) => ({
      userEmail: u.email,
    }));

  async function insertBenefitedUserTable() {
    await db.insert(BenefitedUserTable).values(benefitedUsers);
  }

  /**
   * METRICS
   */
  type InsertMetric = InferInsertModel<typeof MetricsTable>;

  const metrics: InsertMetric[] = Array.from({ length: 7 }, (_, idx) => ({
    metricsContent: faker.lorem.sentence(5),
    metricsHeading: randomInt(100, 500),
    metricsSuffix: Math.random() > 0.5 ? "%" : "+",
    isVisible: idx < 4,
  }));

  async function insertMetricsTable() {
    await db.insert(MetricsTable).values(metrics);
  }

  /**
   * FAQ
   */
  type InsertFaq = InferInsertModel<typeof FaqTable>;

  const faq: InsertFaq[] = [
    {
      faqQuestion: "How to Start Trading in the Stock Market as a Beginner?",
      faqAnswer:
        "Beginners should start by learning market basics, technical analysis, and risk management.",
      isVisible: true,
    },
    {
      faqQuestion: "How to Minimize Risks in Stock Market Trading?",
      faqAnswer:
        "Use stop losses, diversify positions, and follow disciplined risk management.",
      isVisible: true,
    },
    {
      faqQuestion: "What Are the Benefits of Stock Market Education?",
      faqAnswer:
        "Education helps you make informed decisions, reduce risks, and trade confidently.",
      isVisible: true,
    },
    {
      faqQuestion: "What Is the Importance of Risk Management in Trading?",
      faqAnswer: "Never risk more than 2% of your capital in a single trade.",
      isVisible: true,
    },
  ];

  async function insertFaqTable() {
    await db.insert(FaqTable).values(faq);
  }

  /**
   * WEBINARS
   */
  type InsertWebinar = InferInsertModel<typeof WebinarDetailsTable>;

  const webinars: InsertWebinar[] = Array.from({ length: 20 }, () => ({
    webinarTopic: faker.lorem.sentence({ min: 3, max: 5 }),
    scheduledDate: faker.date.between({
      from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      to: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    }),
    actualPrice: randomInt(1, 4) * 2000 - 1,
    discountedPrice:
      Math.random() > 0.5 ? randomInt(1, 4) * 1000 - 1 : undefined,
    approxDuration:
      Math.random() > 0.5 ? randomInt(1, 4) * 3600 * 1000 : undefined,
  }));

  async function insertWebinarDetailsTable() {
    await db.insert(WebinarDetailsTable).values(webinars);
  }

  await insertUserTable();
  await insertProfileTable();
  await insertBenefitedUserTable();
  await insertMetricsTable();
  await insertWebinarDetailsTable();
  await insertFaqTable();

  console.log("__________ SEEDING COMPLETED __________");
  process.exit(0);
}

/**
 * Random Integer Helper
 */
function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

seed().catch((err) => {
  console.error("SEED FAILED", err);
  process.exit(1);
});
