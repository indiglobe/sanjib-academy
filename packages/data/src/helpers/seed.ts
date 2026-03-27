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
  CourseAdvantagesTable,
  OfferedCoursesTable,
  TestimonialsTable,
  ContactMessageTable,
  CourseBuyingProfilesTable,
} from "../schema";

async function seed() {
  console.log("__________ SEEDING STARTED __________");

  /**
   * Clear tables (child → parent order)
   */
  await db.delete(TestimonialsTable);
  await db.delete(CourseAdvantagesTable);
  await db.delete(OfferedCoursesTable);
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

  const users: InsertUser[] = [
    {
      email: "Aaron.Mills84@hotmail.com",
      name: "Dr. Dianna Streich",
      oauthProviderAvatarImageUrl:
        "https://avatars.githubusercontent.com/u/35384604",
      uploadedAvatarImageUrl: null,
    },
    {
      email: "Andy49@hotmail.com",
      name: "Jerry Prosacco",
      oauthProviderAvatarImageUrl:
        "https://avatars.githubusercontent.com/u/52535046",
      uploadedAvatarImageUrl:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/73.jpg",
    },
    {
      email: "Anita.Cormier@yahoo.com",
      name: "Ross Watsica",
      oauthProviderAvatarImageUrl:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/2.jpg",
      uploadedAvatarImageUrl:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/21.jpg",
    },
    {
      email: "Adrian.Reynolds40@gmail.com",
      name: "Dr. Alexander Gislason",
      oauthProviderAvatarImageUrl:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/34.jpg",
      uploadedAvatarImageUrl: null,
    },
  ] as InsertUser[];

  // THIS IS EXTRA USERS DELETE IT LATER
  const __dummyUsers = Array.from({ length: 2000 }, (_, idx) => {
    const name = faker.person.fullName();
    return {
      email: `${name.split(" ").join(`_${idx}_`)}@email.com`,
      name: name,
      oauthProviderAvatarImageUrl: faker.image.avatar(),
    } satisfies InsertUser;
  });
  // THIS IS EXTRA USERS DELETE IT LATER

  async function insertUserTable() {
    console.log(`---INSERTING USERS---`);
    await db.insert(UserTable).values([...users, ...__dummyUsers]);
    console.log(`---INSERTED USERS---`);
  }

  /**
   * PROFILES
   */
  type InsertProfile = InferInsertModel<typeof ProfileTable>;

  const profiles: InsertProfile[] = [
    { profileOf: "Aaron.Mills84@hotmail.com", role: "admin" },
    { profileOf: "Adrian.Reynolds40@gmail.com", role: "basic" },
    { profileOf: "Andy49@hotmail.com", role: "student" },
    { profileOf: "Anita.Cormier@yahoo.com", role: "student" },
  ] as InsertProfile[];

  // THIS IS EXTRA PROFILES DELETE IT LATER
  const __dummyProfiles = __dummyUsers.map<InsertProfile>(({ email }) => {
    return {
      profileOf: email,
      age: randomInt(18, 100),
      role:
        Math.random() > 0.8
          ? "admin"
          : Math.random() > 0.6
            ? "basic"
            : "student",
    };
  });
  // THIS IS EXTRA PROFILES DELETE IT LATER

  async function insertProfileTable() {
    console.log(`---INSERTING PROFILES---`);
    await db.insert(ProfileTable).values([...profiles, ...__dummyProfiles]);
    console.log(`---INSERTED PROFILES---`);
  }

  /**
   * BENEFITED USERS
   */
  type InsertBenefitedUser = InferInsertModel<typeof BenefitedUserTable>;

  const benefitedUsers: InsertBenefitedUser[] = users
    .filter(({}) => Math.random() < 0.7)
    .map((u) => ({
      userEmail: u.email,
    }));

  // THIS IS EXTRA BENEFITED USERS DELETE IT LATER
  const __dummyBenefitedUser = __dummyProfiles
    .filter(({ profileOf, role }) => {
      if (role === "admin" || Math.random() > 0.5)
        return { userEmail: profileOf };
    })
    .map<InsertBenefitedUser>(({ profileOf }) => {
      return { userEmail: profileOf };
    });
  // THIS IS EXTRA BENEFITED USERS DELETE IT LATER

  async function insertBenefitedUserTable() {
    console.log(`---INSERTING BENEFITED USERS---`);
    await db
      .insert(BenefitedUserTable)
      .values([...benefitedUsers, ...__dummyBenefitedUser]);
    console.log(`---INSERTED BENEFITED USERS---`);
  }

  /**
   * METRICS
   */
  type InsertMetric = InferInsertModel<typeof MetricsTable>;

  const metrics: InsertMetric[] = (
    [
      {
        isVisible: true,
        metricsContent: "students trained & became successful traders",
        metricsHeading: "18k",
        metricsSuffix: "+",
      },
      {
        isVisible: true,
        metricsContent: "learners attended live masterclasses",
        metricsHeading: "50k",
        metricsSuffix: "+",
      },
      {
        isVisible: true,
        metricsContent: "hours of LIVE learning",
        metricsHeading: "200",
        metricsSuffix: "+",
      },
      {
        isVisible: true,
        metricsContent: "years of building community",
        metricsHeading: "3.5",
        metricsSuffix: "+",
      },
      {
        isVisible: true,
        metricsContent: "years of success",
        metricsHeading: "6",
        metricsSuffix: "+",
      },
    ] as InsertMetric[]
  ).map((el, idx) => {
    return { ...el, isVisible: idx > 3 ? false : true };
  });

  async function insertMetricsTable() {
    console.log(`---INSERTING METRICS---`);
    await db.insert(MetricsTable).values(metrics);
    console.log(`---INSERTED METRICS---`);
  }

  /**
   * FAQ
   */
  type InsertFaq = InferInsertModel<typeof FaqTable>;

  const faq: InsertFaq[] = [
    {
      faqQuestion: "What is Institutional Trading?",
      faqAnswer:
        "Institutional trading refers to the strategies used by large market participants such as hedge funds, banks, and institutions to trade in the financial markets using liquidity, order flow, and smart money concepts.",
      isVisible: true,
    },
    {
      faqQuestion: "What is F&O Hedging?",
      faqAnswer:
        "F&O hedging is a risk management strategy used in the Futures and Options market to protect trading capital from large losses.",
      isVisible: true,
    },
    {
      faqQuestion: "What is Fundamental Analysis?",
      faqAnswer:
        "Fundamental analysis is the process of evaluating a company's financial health to determine its true value before investing.",
      isVisible: true,
    },

    {
      faqQuestion: "Who should join this course?",
      faqAnswer: `This course is ideal for:

- Beginner traders
- Intermediate traders
- Option traders
- Intraday & swing traders
- Anyone who wants to understand Smart Money Concepts (SMC).
`,
      isVisible: true,
    },
    {
      faqQuestion: "Is this course suitable for beginners?",
      faqAnswer:
        "Yes. The course starts from basic concepts and gradually moves to advanced institutional trading strategies.",
      isVisible: true,
    },
    {
      faqQuestion: "Will I get real chart examples?",
      faqAnswer:
        "Yes. You will learn using real Nifty, Bank Nifty, and stock market chart examples.",
      isVisible: true,
    },
    {
      faqQuestion: "How long is the course?",
      faqAnswer:
        "The course duration is 2 Months with structured modules and practice sessions.",
      isVisible: true,
    },
    {
      faqQuestion: "Will I receive course materials?",
      faqAnswer: `Yes. You will receive:

- Study notes
- Strategy PDFs
- Chart examples
`,
      isVisible: true,
    },
    {
      faqQuestion: "Will I get support after completing the course?",
      faqAnswer: `Yes. Students receive access to the trading community for discussion and doubt solving.
`,
      isVisible: true,
    },
  ];

  async function insertFaqTable() {
    console.log(`---INSERTING FAQ---`);
    await db.insert(FaqTable).values(faq);
    console.log(`---INSERTED FAQ---`);
  }

  /**
   * WEBINARS
   */
  type InsertWebinar = InferInsertModel<typeof WebinarDetailsTable>;

  const webinars: InsertWebinar[] = [
    {
      actualPrice: 399,
      discountedPrice: 19,
      webinarTopic: "Learn smart money concept",
      approxDuration: 1000 * 60 * 60,
      scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      webinarJoiningLink: "",
    },
  ] satisfies InsertWebinar[];

  async function insertWebinarDetailsTable() {
    console.log(`---INSERTING WEBINAR---`);
    await db.insert(WebinarDetailsTable).values(webinars);
    console.log(`---INSERTED WEBINAR---`);
  }

  /**
   * OFFERED COURSES
   */
  type InsertOfferedCourses = InferInsertModel<typeof OfferedCoursesTable>;

  const offeredcourses: InsertOfferedCourses[] = [
    {
      id: "institutional-trading",
      courseTopic: "Institutional Trading",
      brochureLink: "",
      courseHeading:
        "Learn how big institutions and banks move the market—and how you can trade with them.",
      imageLink:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/73.jpg",
      originalEnrlomentFee: 14999,
      discountedEnrlomentFee: 4999,
    },
    {
      id: "fno-hedging",
      courseTopic: "FNO Hedging",
      brochureLink: "",
      courseHeading:
        "Master Futures & Options strategies to protect capital and earn consistently.",
      imageLink:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/73.jpg",
      originalEnrlomentFee: 14999,
      discountedEnrlomentFee: 4999,
    },
    {
      id: "fundamental-analysis",
      courseTopic: "Fundamental Analysis",
      brochureLink: "",
      courseHeading:
        "Learn how to find strong companies and invest like professionals.",
      imageLink:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/73.jpg",
      originalEnrlomentFee: 14999,
      discountedEnrlomentFee: 4999,
    },
  ] satisfies InsertOfferedCourses[];

  async function insertOfferedCoursesTable() {
    console.log(`---INSERTING OFFERED COURSES---`);

    await db.insert(OfferedCoursesTable).values(offeredcourses);
    console.log(`---INSERTED OFFERED COURSES---`);
  }

  /**
   * OFFERED COURSES ADVANTAGES
   */
  type InsertOfferedCoursesAdvantages = InferInsertModel<
    typeof CourseAdvantagesTable
  >;
  const offeredCoursesAdvantages: InsertOfferedCoursesAdvantages[] = [
    {
      details: "Smart Money Concepts (SMC)",
      relatedTo: "institutional-trading",
    },
    {
      details: "Order Blocks & Liquidity Zones",
      relatedTo: "institutional-trading",
    },
    {
      details: "Supply & Demand Mapping",
      relatedTo: "institutional-trading",
    },
    {
      details: "Market Structure (BOS & CHoCH)",
      relatedTo: "institutional-trading",
    },
    {
      details: "Wyckoff Accumulation & Distribution",
      relatedTo: "institutional-trading",
    },
    {
      details: "Institutional Stop-Hunting Techniques",
      relatedTo: "institutional-trading",
    },
    {
      details: "Options Basics & Advanced Greeks",
      relatedTo: "fno-hedging",
    },
    {
      details: "Hedging with Spreads & Combos",
      relatedTo: "fno-hedging",
    },
    {
      details: "Iron Condor, Butterfly & Ratio Strategies",
      relatedTo: "fno-hedging",
    },
    {
      details: "Positional & Intraday Hedging",
      relatedTo: "fno-hedging",
    },
    {
      details: "Volatility-Based Trading",
      relatedTo: "fno-hedging",
    },
    {
      details: "Portfolio Risk Protection",
      relatedTo: "fno-hedging",
    },
    {
      details: "Financial Statement Analysis",
      relatedTo: "fundamental-analysis",
    },
    {
      details: "Balance Sheet, P&L & Cash Flow Reading",
      relatedTo: "fundamental-analysis",
    },
    {
      details: "Valuation Models (PE, PB, DCF)",
      relatedTo: "fundamental-analysis",
    },
    {
      details: "Sector & Industry Analysis",
      relatedTo: "fundamental-analysis",
    },
    {
      details: "Economic & Policy Impact",
      relatedTo: "fundamental-analysis",
    },
    {
      details: "Management Quality Assessment",
      relatedTo: "fundamental-analysis",
    },
  ] satisfies InsertOfferedCoursesAdvantages[];

  async function insertOfferedCoursesAdvantages() {
    console.log(`---INSERTING OFFERED COURSES ADVANTAGES---`);
    await db.insert(CourseAdvantagesTable).values(offeredCoursesAdvantages);
    console.log(`---INSERTED OFFERED COURSES ADVANTAGES---`);
  }

  /**
   * TESTIMONIALS
   */
  type InsertTestimonials = InferInsertModel<typeof TestimonialsTable>;

  const testimonials: InsertTestimonials[] =
    benefitedUsers.map<InsertTestimonials>((e) => {
      return {
        authorEmail: e.userEmail,
        authorSocialHandle: faker.word.interjection({
          length: { min: 5, max: 7 },
          strategy: "fail",
        }),
        testimonialText: faker.lorem.paragraph({ min: 1, max: 3 }),
      };
    });

  // THIS IS EXTRA TESTIMONIALS DELETE IT LATER
  const __dummyTestimonials = __dummyBenefitedUser.reduce<InsertTestimonials[]>(
    (acc, { userEmail }) => {
      if (Math.random() > 0.5) {
        acc.push({
          authorEmail: userEmail,
          authorSocialHandle: faker.word.interjection({
            length: { min: 5, max: 7 },
            strategy: faker.helpers.arrayElements(
              [
                "fail",
                "closest",
                "shortest",
                "longest",
                "any-length",
                undefined,
              ],
              1,
            )[0],
          }),
          testimonialText: faker.lorem.paragraph({ min: 1, max: 3 }),
        });
      }
      return acc;
    },
    [],
  );
  // THIS IS EXTRA TESTIMONIALS DELETE IT LATER

  async function insertTestimonialTable() {
    console.log(`---INSERTING TESTIMONIALS---`);

    await db
      .insert(TestimonialsTable)
      .values([...testimonials, ...__dummyTestimonials]);
    console.log(`---INSERTED TESTIMONIALS---`);
  }

  /**
   * CONTACT
   */
  type InsertContact = InferInsertModel<typeof ContactMessageTable>;

  const contactMessage: InsertContact[] = [
    {
      email: "jhondoe@email.com",
      firstName: "Jhon",
      lastName: "Doe",
      message: "Lorem ipsum dolor sit amet.",
      phoneNo: "9876543210",
      updatedAt: new Date(Date.now()),
      isVerified: true,
    },
    {
      email: "janesmith@email.com",
      firstName: "Jane",
      lastName: "Smith",
      message: "Lorem ipsum dolor sit amet.",
      phoneNo: "9867534210",
      updatedAt: new Date(Date.now()),
      isVerified: false,
    },
  ] satisfies InsertContact[];

  async function insertContactMessage() {
    console.log(`---INSERTING CONTACT---`);

    await db.insert(ContactMessageTable).values(contactMessage);
    console.log(`---INSERTED CONTACT---`);
  }

  /**
   * COURSE BUYING PROFILES
   */
  type InsertCourseBuyingProfiles = InferInsertModel<
    typeof CourseBuyingProfilesTable
  >;

  const insertCourseBuyingProfiles: InsertCourseBuyingProfiles[] =
    [] satisfies InsertCourseBuyingProfiles[];

  async function insertInsertCourseBuyingProfiles() {
    console.log(`---INSERTING COURSE BUYING PROFILES---`);

    // await db
    //   .insert(CourseBuyingProfilesTable)
    //   .values(insertCourseBuyingProfiles);
    insertCourseBuyingProfiles;
    console.log(`---INSERTED COURSE BUYING PROFILES---`);
  }

  await insertUserTable();
  await insertProfileTable();
  await insertBenefitedUserTable();
  await insertMetricsTable();
  await insertWebinarDetailsTable();
  await insertFaqTable();
  await insertOfferedCoursesTable();
  await insertOfferedCoursesAdvantages();
  await insertTestimonialTable();
  await insertContactMessage();
  await insertInsertCourseBuyingProfiles();

  console.log("__________ SEEDING COMPLETED __________");
  process.exit(0);
}

/**
 * Random Integer Helper
 */
// @ts-ignore
function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

seed().catch((err) => {
  console.error("SEED FAILED", err);
  process.exit(1);
});
