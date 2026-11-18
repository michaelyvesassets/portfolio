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
  /** Unconfirmed fields stay undefined and show as placeholders. */
  role?: string;
  year?: string;
  cover?: ProjectImage;
  /** Image for the hanging card only; falls back to `cover`. */
  cardImage?: ProjectImage;
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
  },
  {
    slug: "ufaild",
    name: "UFAILD",
    cardTitle: "UFAILD — Habit Tracker",
    summary: "Habit-tracking iOS application.",
    category: "Productivity · Habits",
    platform: "iOS",
    status: "case-study",
    accent: "#ff4d4f",
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
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
