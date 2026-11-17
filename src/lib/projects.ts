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
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
