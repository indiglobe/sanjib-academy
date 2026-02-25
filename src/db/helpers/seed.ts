import { InferInsertModel } from "drizzle-orm";
import { db } from "..";
import {
  BenefitedUserTable,
  FaqTable,
  MetricsTable,
  ProfileTable,
  UserTable,
  WebinarDetailsTable,
} from "../schema";
import { faker } from "@faker-js/faker";

(async () => {
  await db.delete(UserTable);
  await db.delete(ProfileTable);
  await db.delete(BenefitedUserTable);
  await db.delete(MetricsTable);
  await db.delete(FaqTable);
  await db.delete(WebinarDetailsTable);

  type InsertUsers = InferInsertModel<typeof UserTable>;
  const users = Array.from({ length: 40 }).map<InsertUsers>(() => {
    return {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      oauthProviderAvatarImageUrl: faker.image.avatar(),
      uploadedAvatarImageUrl:
        Math.random() > 0.8 ? faker.image.avatar() : undefined,
    };
  });

  type InsertProfiles = InferInsertModel<typeof ProfileTable>;
  const profiles = users.map<InsertProfiles>(({ email }) => {
    return {
      profileOf: email,
      role:
        Math.random() < 0.2
          ? "admin"
          : Math.random() > 0.5
            ? "basic"
            : "student",
    };
  });

  type InsertBenefitedUsers = InferInsertModel<typeof BenefitedUserTable>;
  const benefitedUsers = users
    .filter(() => {
      return Math.random() > 0.7;
    })
    .map<InsertBenefitedUsers>(({ email }) => {
      return { userEmail: email };
    });

  type InsertMetrics = InferInsertModel<typeof MetricsTable>;
  const metricsData = Array.from({ length: 7 }).map<InsertMetrics>((_, idx) => {
    return {
      metricsContent: faker.lorem.sentence(5),
      metricsHeading: Math.floor(Math.random() * 100),
      metricsSuffix: Math.random() > 0.5 ? "%" : "+",
      isVisible: idx <= 3,
    };
  });

  type InsertFaq = InferInsertModel<typeof FaqTable>;
  const faqData = Array.from({ length: 7 }).map<InsertFaq>((_, idx) => {
    return {
      faqQuestion: faker.lorem.sentence({ min: 3, max: 5 }),
      faqAnswer: faker.lorem.sentences(Math.floor(Math.random() * 3) + 1, "\n"),
      isVisible: idx < 5,
    };
  });

  type InsertWebinarDetails = InferInsertModel<typeof WebinarDetailsTable>;
  const webinarDetailsData = Array.from({
    length: 20,
  }).map<InsertWebinarDetails>(() => {
    return {
      webinarTopic: faker.lorem.sentence({ min: 3, max: 5 }),
      scheduledDate: faker.date.between({
        from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
        to: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      }),
      actualPrice: getRandomIntInclusive(1, 4) * 20000 - 1,
      discountedPrice:
        Math.random() > 0.5 ? getRandomIntInclusive(1, 4) * 10 - 1 : undefined,
      approxDuration:
        Math.random() > 0.5
          ? getRandomIntInclusive(1, 4) * 3600 * 1000
          : undefined, // in miliseconds
    };
  });

  console.log(`__________SEEDING STARTED__________`);
  await db.insert(UserTable).values(users);
  await db.insert(ProfileTable).values(profiles);
  await db.insert(BenefitedUserTable).values(benefitedUsers);
  await db.insert(MetricsTable).values(metricsData);
  await db.insert(FaqTable).values(faqData);
  await db.insert(WebinarDetailsTable).values(webinarDetailsData);
  console.log(`__________SEEDING COMPLETED____________`);

  process.exit();
})();

function getRandomIntInclusive(min: number, max: number) {
  // Use Math.ceil to ensure the minimum is an integer
  min = Math.ceil(min);
  // Use Math.floor to ensure the maximum is an integer
  max = Math.floor(max);
  // The formula generates a number from min to max, including both
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
