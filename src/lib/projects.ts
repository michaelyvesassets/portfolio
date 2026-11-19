/**
 * Project content.
 *
 * Only facts supplied by Michael are written here. Anything not yet confirmed
 * is `undefined` and renders as a clearly labelled placeholder — never invent
 * metrics, screenshots, roles, dates or shipped features.
 *
 * To add a real screenshot: drop the file in /public/projects/<slug>/ and set
 * `cover` (and/or `gallery`) below with its real pixel dimensions.
 */

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional CSS object-position focal point when cropped (default: centred). */
  position?: string;
  /** Optional fill behind letterboxed ("contain") images; match the artwork's edge colour. */
  background?: string;
};

export type ProjectStatus = "case-study" | "concept";

export type Project = {
  slug: string;
  name: string;
  /** Short title shown on the hanging card. */
  cardTitle: string;
  /** One-line description (supplied). */
  summary: string;
  category: string;
  platform: string;
  status: ProjectStatus;
  /** Badge text for non-standard status, e.g. concept work. */
  statusLabel?: string;
  /** Outline accent, from the Figma design. */
  accent: string;
  /** Case-study header metadata (supplied). Separate from `category`/`platform`, which the homepage uses. */
  details: {
    category: string;
    platform: string;
    role: string;
    year: string;
    status: "launched" | "in-development" | "concept";
  };
  cover?: ProjectImage;
  /** Image for the hanging card only; falls back to `cover`. */
  cardImage?: ProjectImage;
  /** Case-study copy: one string per paragraph, supplied by Michael. */
  caseStudy: {
    challenge: string[];
    process: string[];
    outcome: string[];
  };
  /**
   * Back of the hanging card (revealed by the flip). Written only from the supplied
   * brief and the real screens shown on each card — no invented metrics or features.
   */
  back: {
    blurb: string;
    tags: string[];
    /** CSS background, a soft wash of the project's accent fading to white. */
    gradient: string;
  };
  gallery?: ProjectImage[];
  /**
   * Phone presentation shared by every project that has app screenshots: the
   * hero shows three floating iPhones and Key screens shows one iPhone per tile.
   * Only images and colours vary; layout, sizes and motion live in the
   * ProjectPhoneHero and ProjectKeyScreens components.
   */
  showcase?: {
    /** Screenshots at the device's screen ratio, in Key screens order. */
    screens: ProjectImage[];
    /** Hero phones as [left, centre, right] indices into `screens` (default [2, 0, 1]). */
    heroOrder?: [number, number, number];
    /** "browser" presents desktop website screenshots in browser windows instead of iPhones. */
    device?: "iphone" | "browser";
    /** Browser hero only: [main window, overlapping secondary window]. */
    heroScreens?: [ProjectImage, ProjectImage];
    heroBackground: string;
    /** Soft glow behind the hero's centre phone. */
    heroGlow: string;
    tileBackground: string;
    /** False when the screenshots already include the Dynamic Island. */
    island?: boolean;
  };
};

export const projects: Project[] = [
  {
    slug: "meza",
    name: "Meza",
    cardTitle: "Meza — Meet Friends",
    summary: "Social travel and experiences application.",
    category: "Social · Travel",
    platform: "Mobile application",
    status: "case-study",
    accent: "#2bb3ef",
    details: {
      category: "Social · Travel",
      platform: "iOS Application",
      role: "Founder · Full-Stack Developer",
      year: "2026",
      status: "launched",
    },
    caseStudy: {
      challenge: [
        "Travelling and meeting new people often relies on fragmented experiences — social platforms, group chats, event listings, and chance encounters. I wanted to create a more intentional way for people to connect through shared activities and real-world experiences.",
      ],
      process: [
        "I designed and developed Meza as an iOS application combining social discovery, hosted dining tables, and location-based quests. I worked across the product lifecycle, from defining the user experience and designing interfaces to implementing core functionality, subscription features, and city-specific content.",
        "I also developed a scalable quest-content system to support expansion into multiple cities, using AI-assisted workflows to accelerate development and iteration.",
      ],
      outcome: [
        "Launched Meza on the Apple App Store, reaching approximately 1,000 downloads through limited organic marketing. The project demonstrates my ability to independently design, build, and release a consumer-facing application with multiple interconnected features.",
      ],
    },
    back: {
      blurb: "Meet travellers nearby, discover local events and plan experiences together, all from one live city map.",
      tags: ["Mobile app", "Social", "Travel"],
      gradient:
        "radial-gradient(120% 80% at 85% 0%, rgba(43,179,239,0.38) 0%, rgba(43,179,239,0) 58%), linear-gradient(165deg, #dcf2ff 0%, #f0f9ff 48%, #ffffff 100%)",
    },
    cardImage: {
      src: "/projects/meza/cover2.png",
      alt: "Meza app screens: a city map of nearby events and a grid of travellers nearby",
      width: 2037,
      height: 1150,
    },
    showcase: {
      // Screen areas cut from the bottommeza*.png artwork (which bakes in its own
      // phone frame and blue backdrop); the originals are untouched.
      screens: [
        {
          src: "/projects/meza/screens/meza-screen-1.png",
          alt: "Meza home screen: a live map of New York with event pins, travellers nearby, a leaderboard and a list of open events",
          width: 515,
          height: 1116,
        },
        {
          src: "/projects/meza/screens/meza-screen-2.png",
          alt: "Meza Nearby screen: a grid of travellers close by, each with their distance and an add or connected button",
          width: 515,
          height: 1116,
        },
        {
          src: "/projects/meza/screens/meza-screen-3.png",
          alt: "Meza quest screen: \"The Ural Blueprint\" clue on a 3D city map with a highlighted walking route",
          width: 515,
          height: 1116,
        },
      ],
      heroBackground: "linear-gradient(180deg, #d5eeff 0%, #e4f5ff 30%, #f7fcff 62%, #ffffff 100%)",
      heroGlow: "rgba(43, 179, 239, 0.16)",
      tileBackground: "linear-gradient(165deg, #e4f5ff 0%, #f7fcff 100%)",
      island: false,
    },
  },
  {
    slug: "ufaild",
    name: "UFAILD",
    cardTitle: "UFAILD — Habit Tracker",
    summary: "AI-Powered Accountability & Discipline App.",
    category: "Productivity · Habits",
    platform: "iOS",
    status: "case-study",
    accent: "#ff4d4f",
    details: {
      category: "AI · Productivity",
      platform: "iOS Application",
      role: "Founder · AI Product Developer",
      year: "2026",
      status: "launched",
    },
    caseStudy: {
      challenge: [
        "Most productivity apps reward users for checking boxes, regardless of whether meaningful work was actually completed. They rely on self-reported progress, positive reinforcement, and streaks that can easily become meaningless.",
        "I wanted to challenge that approach by building something deliberately uncomfortable: an accountability system that confronts procrastination, demands evidence, and forces users to reflect honestly on their actions.",
      ],
      process: [
        "I designed and developed UFAILD as an iOS application built around discipline, self-reflection, and verifiable progress.",
        "I integrated AI APIs to analyse screenshot evidence and assess whether tasks were genuinely completed, moving beyond traditional self-reported habit tracking.",
        "I also developed two core reflection mechanisms: a daily obituary that confronts users with how they spent the previous day, and a pre-mortem that forces them to identify what must be accomplished next.",
        "These features were combined with deliberately confrontational notifications, recurring schedules, streak tracking, and a 28-day habit calendar.",
        "Throughout development, I used AI-assisted workflows to accelerate implementation while maintaining a clear product philosophy: accountability over comfort, and evidence over intention.",
      ],
      outcome: [
        "Successfully developed and published UFAILD on the Apple App Store as a functional iOS accountability application.",
        "The product combines AI-powered task verification, structured self-reflection, and behavioural accountability into an experience intentionally different from conventional habit trackers.",
        "UFAILD demonstrates my ability to integrate AI services into practical product functionality, develop a distinctive product identity, and independently take an unconventional concept from initial design through to release.",
      ],
    },
    back: {
      blurb: "An honest habit tracker for iOS: plan your day, then see exactly what got done and what failed.",
      tags: ["iOS", "Habits", "Productivity"],
      gradient:
        "radial-gradient(120% 80% at 85% 0%, rgba(255,77,79,0.26) 0%, rgba(255,77,79,0) 58%), linear-gradient(165deg, #ffe2de 0%, #fff3f1 48%, #ffffff 100%)",
    },
    cardImage: {
      src: "/projects/ufaild/cover3.png",
      alt: "UFAILD app screens: a daily habit progress grid and a schedule of done and failed tasks",
      width: 1995,
      height: 1158,
    },
    showcase: {
      // Screen areas cut from the ufaild*.png artwork (which bakes in its own
      // phone frame and white backdrop); the originals are untouched.
      screens: [
        {
          src: "/projects/ufaild/screens/ufaild-screen-1.png",
          alt: "UFAILD home screen: Tuesday at 50%, a July calendar of completed and failed days, an 8-day streak and the next task",
          width: 497,
          height: 1077,
        },
        {
          src: "/projects/ufaild/screens/ufaild-screen-2.png",
          alt: "UFAILD schedule: Wednesday's tasks by time, marked failed in red, done in green, or upcoming",
          width: 497,
          height: 1077,
        },
        {
          src: "/projects/ufaild/screens/ufaild-screen-3.png",
          alt: "UFAILD schedule: completed morning tasks, with a treadmill photo verified as proof of a gym cardio session",
          width: 497,
          height: 1077,
        },
      ],
      heroOrder: [0, 1, 2],
      heroBackground: "linear-gradient(180deg, #ffd6d2 0%, #ffe8e5 30%, #fff8f7 62%, #ffffff 100%)",
      heroGlow: "rgba(255, 77, 79, 0.14)",
      tileBackground: "linear-gradient(165deg, #ffe8e5 0%, #fff8f7 100%)",
    },
  },
  {
    slug: "flora-website",
    name: "Flora Website",
    cardTitle: "Flora Website",
    summary: "Consumer wellness e-commerce website.",
    category: "Wellness · E-commerce",
    platform: "Web",
    status: "case-study",
    accent: "#ff2da8",
    details: {
      category: "Wellness · E-commerce",
      platform: "Web Application",
      role: "Founder · Full-Stack Developer & Designer",
      year: "2026",
      status: "in-development",
    },
    caseStudy: {
      challenge: [
        "Sexual wellness products are often presented through either overly clinical branding or outdated visual conventions. I wanted to develop a more contemporary digital experience that makes sexual wellness feel approachable, considered, and visually distinctive.",
      ],
      process: [
        "I established Flora's digital brand direction and designed and developed a responsive e-commerce website using Next.js and React.",
        "The experience combines product storytelling, interactive components, educational content, and a custom sizing interface. I focused on creating cohesive desktop and mobile experiences while balancing visual experimentation with usability.",
        "AI-assisted development helped accelerate implementation, allowing me to concentrate on design decisions, interaction details, and product presentation.",
      ],
      outcome: [
        "Created a responsive, interactive website that establishes Flora's digital identity and provides a foundation for future e-commerce functionality.",
        "The project showcases my ability to combine brand development, UI/UX design, front-end engineering, and interactive product experiences.",
      ],
    },
    back: {
      blurb: "A candid storefront for Flora's sexual-wellness range, introducing its test kits and condoms.",
      tags: ["Web", "E-commerce", "Wellness"],
      gradient:
        "radial-gradient(120% 85% at 80% 0%, rgba(255,45,168,0.44) 0%, rgba(255,45,168,0) 60%), linear-gradient(165deg, #ffd6ec 0%, #ffeef7 48%, #ffffff 100%)",
    },
    cardImage: {
      src: "/projects/flora-website/cover6.png",
      alt: "Flora website homepage: “Sexual Wellness, Unfiltered.” headline above white, pink and black Flora condoms",
      width: 1976,
      height: 1372,
      // Taller than the card slot: bias the crop upward to keep the site nav and headline.
      position: "50% 15%",
    },
    showcase: {
      // Cleaned copies of web1-5.png: the browser scrollbar and the 1px top
      // border are trimmed; the originals are untouched.
      device: "browser",
      heroScreens: [
        {
          src: "/projects/flora-website/screens/web1.png",
          alt: "Flora website home page: the headline \"Sexual Wellness, Unfiltered.\" above a test kit concept held in a hand, with a countdown to Drop 001",
          width: 3330,
          height: 2099,
        },
        {
          src: "/projects/flora-website/screens/web2.png",
          alt: "Flora website collection section: \"Pick your packet.\" with the Intimate condom subscription, 12 condoms a month",
          width: 3330,
          height: 2099,
        },
      ],
      screens: [
        {
          src: "/projects/flora-website/screens/web3.png",
          alt: "Flora website home page with the condoms slide: white, pink and black Flora condom packets",
          width: 3330,
          height: 2099,
        },
        {
          src: "/projects/flora-website/screens/web4.png",
          alt: "Flora website waitlist page: \"Join Waitlist\" with an email field, surrounded by floating condom packets",
          width: 3330,
          height: 2099,
        },
        {
          src: "/projects/flora-website/screens/web5.png",
          alt: "Flora website \"The naked truth\" section: myth-or-fact cards, with \"Are two condoms safer than one?\" answered as a myth",
          width: 3330,
          height: 2099,
        },
      ],
      heroBackground: "linear-gradient(180deg, #ffdcec 0%, #ffeaf5 30%, #fff8fc 62%, #ffffff 100%)",
      heroGlow: "rgba(255, 45, 168, 0.13)",
      tileBackground: "linear-gradient(165deg, #ffeaf5 0%, #fff8fc 100%)",
    },
  },
  {
    slug: "flora-app",
    name: "Flora App",
    cardTitle: "Flora App",
    summary: "Planned companion application to the Flora website.",
    category: "Wellness · Companion app",
    platform: "Mobile application (planned)",
    status: "concept",
    statusLabel: "Concept · In development",
    accent: "#7b86ff",
    details: {
      category: "Wellness · Mobile",
      platform: "iOS App Concept",
      role: "Founder · Product Designer & Developer",
      year: "2026",
      status: "concept",
    },
    caseStudy: {
      challenge: [
        "Sexual health information, product selection, and personal wellness management are often spread across disconnected services. I wanted to explore how a single digital product could make these experiences more accessible and connected.",
      ],
      process: [
        "I developed the product direction for a companion application within the Flora ecosystem.",
        "The concept explores a unified experience for sexual wellness education, product discovery, and future integration with connected at-home STI testing technology.",
        "The design process focuses on accessibility, privacy, intuitive navigation, and creating a visual language consistent with the Flora brand.",
      ],
      outcome: [
        "Established an initial product concept and design direction for a future Flora companion application.",
        "The project demonstrates my ability to think beyond individual interfaces and plan connected digital experiences across hardware, software, and consumer products.",
      ],
    },
    back: {
      blurb: "A planned companion to the Flora website, exploring discreet product subscriptions and guided onboarding.",
      tags: ["Concept", "Mobile app", "Wellness"],
      gradient:
        "radial-gradient(120% 80% at 85% 0%, rgba(123,134,255,0.34) 0%, rgba(123,134,255,0) 58%), linear-gradient(165deg, #e6e8ff 0%, #f3f4ff 48%, #ffffff 100%)",
    },
    cardImage: {
      src: "/projects/flora-app/cover4.png",
      alt: "Flora app concept screens: a monthly subscription plan and an onboarding screen",
      width: 2163,
      height: 1253,
    },
    showcase: {
      heroBackground: "linear-gradient(180deg, #eceeff 0%, #f7f7ff 55%, #ffffff 100%)",
      heroGlow: "rgba(123, 134, 255, 0.22)",
      tileBackground: "linear-gradient(165deg, #eceeff 0%, #f6f7ff 100%)",
      screens: [
        {
          src: "/projects/flora-screen-1.png",
          alt: "Flora App concept: \"Intimate\" subscription screen offering 12 condoms a month with discreet monthly delivery",
          width: 1290,
          height: 2796,
        },
        {
          src: "/projects/flora-screen-2.png",
          alt: "Flora App concept: \"Save a rating for yourself\" screen with a five-step rating shown as Flora condom packets",
          width: 1290,
          height: 2796,
        },
        {
          src: "/projects/flora-screen-3.png",
          alt: "Flora App concept: onboarding screen reading \"Find where you align. And discover what deserves a conversation.\"",
          width: 1290,
          height: 2796,
        },
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
