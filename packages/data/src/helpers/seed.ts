import { faker } from "@faker-js/faker";
import { db } from "..";
import {
  BenefitedUserTable,
  FaqTable,
  MetricsTable,
  UserTable,
  WebinarDetailsTable,
  CourseAdvantagesTable,
  OfferedCoursesTable,
  TestimonialsTable,
  ContactMessageTable,
  CourseBuyingProfilesTable,
  CourseModulesTable,
  CourseVideoTable,
  CourseDocumentTable,
} from "../schema";
import manifestJson from "@repo/local-assets/manifest.json";

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
  await db.delete(UserTable);

  /**
   * USERS
   */
  type InsertUser = typeof UserTable.$inferInsert;

  const users = [
    {
      email: "Aaron.Mills84@hotmail.com",
      name: "Dr. Dianna Streich",
      uploadedAvatarImageUrl: faker.helpers.arrayElement(
        manifestJson["images/avatar"],
      ),
      age: 20,
      phoneNo: "9876543210",
    },
    {
      email: "Andy49@hotmail.com",
      name: "Jerry Prosacco",
      uploadedAvatarImageUrl: faker.helpers.arrayElement(
        manifestJson["images/avatar"],
      ),
      age: 60,
      phoneNo: "6936936922",
    },
    {
      email: "Anita.Cormier@yahoo.com",
      name: "Ross Watsica",
      uploadedAvatarImageUrl: faker.helpers.arrayElement(
        manifestJson["images/avatar"],
      ),
      age: 50,
      phoneNo: "2222222222",
      role: "student",
    },
    {
      email: "Adrian.Reynolds40@gmail.com",
      name: "Dr. Alexander Gislason",
      uploadedAvatarImageUrl: faker.helpers.arrayElement(
        manifestJson["images/avatar"],
      ),
      age: 50,
      phoneNo: "8888888888",
      role: "admin",
    },
  ] as InsertUser[];

  // THIS IS EXTRA USERS DELETE IT LATER
  const __dummyUsers = Array.from({ length: 200 }, (_, idx) => {
    const name = faker.person.fullName();
    return {
      email: `${name.split(" ").join(`_${idx}_`)}@email.com`,
      name: name,
      age: randomInt(18, 50),
      phoneNo: Math.floor(Math.random() * 10000000000).toString(),
      uploadedAvatarImageUrl: faker.helpers.arrayElement(
        manifestJson["images/avatar"],
      ),
      role:
        Math.random() > 0.3
          ? "basic"
          : Math.random() > 0.6
            ? "student"
            : "admin",
    } satisfies InsertUser;
  });
  // THIS IS EXTRA USERS DELETE IT LATER

  async function insertUserTable() {
    console.log(`---INSERTING USERS---`);
    await db.insert(UserTable).values([...users, ...__dummyUsers]);
    console.log(`---INSERTED USERS---`);
  }

  /**
   * BENEFITED USERS
   */
  type InsertBenefitedUser = typeof BenefitedUserTable.$inferInsert;

  const benefitedUsers: InsertBenefitedUser[] = users
    .filter(({}) => Math.random() < 0.7)
    .map((u) => ({
      userEmail: u.email,
    }));

  // THIS IS EXTRA BENEFITED USERS DELETE IT LATER
  const __dummyBenefitedUser = __dummyUsers
    .filter(({ email, role }) => {
      if (role === "admin" || Math.random() > 0.5) return { userEmail: email };
    })
    .map<InsertBenefitedUser>(({ email }) => {
      return { userEmail: email };
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
  type InsertMetric = typeof MetricsTable.$inferInsert;

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
  type InsertFaq = typeof FaqTable.$inferInsert;

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
  type InsertWebinar = typeof WebinarDetailsTable.$inferInsert;

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
  type InsertOfferedCourses = typeof OfferedCoursesTable.$inferInsert;

  const offeredcourses: InsertOfferedCourses[] = [
    {
      id: "institutional-trading",
      courseTopic: "Institutional Trading",
      brochureLink: faker.helpers.arrayElement(manifestJson["document/pdf"]),
      courseHeading:
        "Learn how big institutions and banks move the market—and how you can trade with them.",
      imageLink: faker.helpers.arrayElement(manifestJson["images/thumbnail"]),
      originalEnrlomentFee: 14999,
      discountedEnrlomentFee: 4999,
    },
    {
      id: "fno-hedging",
      courseTopic: "FNO Hedging",
      brochureLink: faker.helpers.arrayElement(manifestJson["document/pdf"]),
      courseHeading:
        "Master Futures & Options strategies to protect capital and earn consistently.",
      imageLink: faker.helpers.arrayElement(manifestJson["images/thumbnail"]),
      originalEnrlomentFee: 14999,
      discountedEnrlomentFee: 4999,
    },
    {
      id: "fundamental-analysis",
      courseTopic: "Fundamental Analysis",
      brochureLink: faker.helpers.arrayElement(manifestJson["document/pdf"]),
      courseHeading:
        "Learn how to find strong companies and invest like professionals.",
      imageLink: faker.helpers.arrayElement(manifestJson["images/thumbnail"]),
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
  type InsertOfferedCoursesAdvantages =
    typeof CourseAdvantagesTable.$inferInsert;
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
  type InsertTestimonials = typeof TestimonialsTable.$inferInsert;

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
  type InsertContact = typeof ContactMessageTable.$inferInsert;

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
  // type InsertCourseBuyingProfiles =
  //   typeof CourseBuyingProfilesTable.$inferInsert;

  // const insertCourseBuyingProfiles: InsertCourseBuyingProfiles[] =
  //   [] satisfies InsertCourseBuyingProfiles[];

  async function insertInsertCourseBuyingProfiles() {
    console.log(`---INSERTING COURSE BUYING PROFILES---`);

    // await db
    //   .insert(CourseBuyingProfilesTable)
    //   .values(insertCourseBuyingProfiles);
    console.log(`---INSERTED COURSE BUYING PROFILES---`);
  }

  /**
   * COURSE MODULES
   */

  type InsertCourseModules = typeof CourseModulesTable.$inferInsert;

  const courseModules: InsertCourseModules[] = [
    // Institutional Trading
    {
      courseId: "institutional-trading",
      title: "Introduction to Institutional Trading",
      description: "Basics of how institutions move markets.",
      appearingOrder: 1,
    },
    {
      courseId: "institutional-trading",
      title: "Order Blocks & Liquidity",
      description: "Understanding liquidity zones and smart money traps.",
      appearingOrder: 2,
    },

    // FNO Hedging
    {
      courseId: "fno-hedging",
      title: "F&O Basics",
      description: "Introduction to futures and options.",
      appearingOrder: 1,
    },
    {
      courseId: "fno-hedging",
      title: "Hedging Strategies",
      description: "Protecting capital using options spreads.",
      appearingOrder: 2,
    },

    // Fundamental Analysis
    {
      courseId: "fundamental-analysis",
      title: "Financial Statements",
      description: "Reading balance sheet, P&L and cash flow.",
      appearingOrder: 1,
    },
  ];

  async function insertCourseModulesTable() {
    console.log("---INSERTING COURSE MODULES---");
    await db.insert(CourseModulesTable).values(courseModules);
    console.log("---INSERTED COURSE MODULES---");
  }

  /**
   * MODULE VIDEOS
   */

  type InsertCourseVideo = typeof CourseVideoTable.$inferInsert;

  const courseVideos: InsertCourseVideo[] = [
    ...([
      {
        moduleId: 1,
        videoURL: faker.helpers.arrayElement(manifestJson["videos/course"]),
        thumbnailImage: faker.helpers.arrayElement(
          manifestJson["images/thumbnail"],
        ),
        videoTitle: "Video-Title-1",
      },
      {
        moduleId: 1,
        videoURL: faker.helpers.arrayElement(manifestJson["videos/course"]),
        thumbnailImage: faker.helpers.arrayElement(
          manifestJson["images/thumbnail"],
        ),
        videoTitle: "Video-Title-2",
        videoDescription: "Description-2",
      },
      {
        moduleId: 2,
        videoURL: faker.helpers.arrayElement(manifestJson["videos/course"]),
        thumbnailImage: faker.helpers.arrayElement(
          manifestJson["images/thumbnail"],
        ),
        videoTitle: "Video-Title-3",
      },
    ] satisfies InsertCourseVideo[]),
    ...Array.from({ length: 20 }).map<InsertCourseVideo>((_, idx) => {
      return {
        moduleId: 0,
        videoURL: faker.helpers.arrayElement(manifestJson["videos/course"]),
        thumbnailImage: faker.helpers.arrayElement(
          manifestJson["images/thumbnail"],
        ),
        videoTitle: `Video-Title-${idx + 4}`,
        videoDescription:
          Math.random() > 0.5 ? `Video-Description-${idx + 4}` : undefined,
      };
    }),
  ];

  async function insertCourseVideoTable() {
    const modules = await db.select().from(CourseModulesTable);

    const updatedId = courseVideos.map<InsertCourseVideo>(
      ({ moduleId, ...rest }) => {
        return {
          ...rest,
          moduleId: faker.helpers.arrayElement(modules.map((m) => m.id)),
        };
      },
    );

    console.log("---INSERTING COURSE VIDEOS---");
    await db.insert(CourseVideoTable).values(updatedId);
    console.log("---INSERTED COURSE VIDEOS---");
  }

  /**
   * MODULE DOCUMENT
   */

  type InsertCourseDocument = typeof CourseDocumentTable.$inferInsert;

  const courseDocuments: InsertCourseDocument[] = [
    ...([
      {
        moduleId: 1,
        documentURL: faker.helpers.arrayElement(manifestJson["document/pdf"]),
        thumbnailImage: faker.helpers.arrayElement(
          manifestJson["images/thumbnail"],
        ),
        documentTitle: "Document-Title-1",
        documentDescription: "Document-Description-1",
      },
      {
        moduleId: 2,
        documentURL: faker.helpers.arrayElement(manifestJson["document/pdf"]),
        thumbnailImage: faker.helpers.arrayElement(
          manifestJson["images/thumbnail"],
        ),
        documentTitle: "Document-Title-2",
      },
    ] satisfies InsertCourseDocument[]),
    ...Array.from({ length: 20 }).map<InsertCourseDocument>((_, idx) => {
      return {
        moduleId: 0,
        documentURL: faker.helpers.arrayElement(manifestJson["document/pdf"]),
        thumbnailImage: faker.helpers.arrayElement(
          manifestJson["images/thumbnail"],
        ),
        documentTitle: `Document-Title-${idx + 4}`,
        documentDescription:
          Math.random() > 0.5 ? `Document-Description-${idx + 4}` : undefined,
      };
    }),
  ];

  async function insertCourseDocumentTable() {
    const modules = await db.select().from(CourseModulesTable);

    const updatedId = courseDocuments.map<InsertCourseDocument>(
      ({ moduleId, ...rest }) => {
        return {
          ...rest,
          moduleId: faker.helpers.arrayElement(modules.map((m) => m.id)),
        };
      },
    );

    console.log("---INSERTING COURSE DOCUMENTS---");
    await db.insert(CourseDocumentTable).values(updatedId);
    console.log("---INSERTED COURSE DOCUMENTS---");
  }

  await insertUserTable();
  await insertBenefitedUserTable();
  await insertMetricsTable();
  await insertWebinarDetailsTable();
  await insertFaqTable();
  await insertOfferedCoursesTable();
  await insertOfferedCoursesAdvantages();
  await insertTestimonialTable();
  await insertContactMessage();
  await insertInsertCourseBuyingProfiles();
  await insertCourseModulesTable();
  await insertCourseVideoTable();
  await insertCourseDocumentTable();

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
