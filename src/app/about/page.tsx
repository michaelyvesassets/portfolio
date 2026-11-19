import type { Metadata } from "next";
import Link from "next/link";
import { getProject, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "Michael Crowther — AI-native full-stack product developer. Design, development, AI integration, backends, testing and deployment.",
};

/* ------------------------------------------------------------------ */
/* Content (supplied by Michael — keep claims to what is listed here)   */
/* ------------------------------------------------------------------ */

const intro =
  "From interface design to backend architecture, AI integration, and production deployment — I build complete digital products.";

const aboutParagraphs = [
  "I’m Michael, an independent full-stack product developer focused on turning ideas into functional digital products.",
  "I work across the entire development lifecycle — from product strategy, interface design, and frontend engineering to backend architecture, databases, AI integration, testing, and deployment.",
  "I’ve independently developed and published iOS applications, built interactive web platforms, implemented AI-powered features, and managed production releases through Apple’s App Store Connect.",
  "My approach to engineering is AI-native. I work with Claude Code, OpenAI Codex, Qwen models, and other AI development tools to accelerate implementation, debug complex issues, prototype ideas, and improve development workflows.",
  "I combine AI-assisted coding with hands-on product direction, technical decision-making, testing, and iterative development.",
  "I particularly enjoy working across the boundaries of product design, software engineering, and artificial intelligence — building products that are both technically functional and thoughtfully designed.",
  "I’m currently interested in remote opportunities in full-stack development, AI product engineering, and AI-native application development.",
];

const capabilities = [
  {
    title: "Full-Stack Development",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Frontend Engineering", "Backend Development", "REST API Integration"],
  },
  {
    title: "Backend & Databases",
    skills: ["Supabase", "PostgreSQL", "Database Architecture", "Authentication", "Row-Level Security", "Backend Logic", "Data Management"],
  },
  {
    title: "AI Integration",
    skills: ["OpenAI APIs", "Anthropic / Claude APIs", "LLM Integration", "AI-Powered Features", "Prompt Engineering", "AI-Based Verification", "Structured AI Outputs"],
  },
  {
    title: "AI-Native Engineering",
    skills: ["Claude Code", "OpenAI Codex", "Qwen Models", "Agent-Assisted Coding", "AI Development Workflows", "Rapid Prototyping", "Code Debugging", "Technical Documentation"],
  },
  {
    title: "iOS & Mobile Development",
    skills: ["iOS Applications", "Mobile UI/UX", "App Store Connect", "TestFlight", "App Store Submissions", "Subscription Integration", "In-App Purchases", "App Testing & Release Management"],
  },
  {
    title: "Product Design & Deployment",
    skills: ["UI/UX Design", "Figma", "Responsive Design", "Interactive Interfaces", "Git & GitHub", "Vercel", "Product Deployment", "Testing & Iteration"],
  },
];

const experience = [
  {
    slug: "meza",
    project: "Meza",
    title: "Full-Stack Application Development",
    paragraphs: [
      "Designed, developed, and published a social travel application combining real-world dining experiences, social discovery, and location-based quests.",
      "Worked across interface design, backend integration, user accounts, subscription functionality, content management, and iOS deployment.",
      "Built and maintained an expanding system of location-specific quests and supporting content.",
    ],
    highlights: ["iOS Application Development", "Backend & Database Integration", "Subscription Systems", "Product Architecture", "App Store Release"],
  },
  {
    slug: "ufaild",
    project: "UFAILD",
    title: "AI-Powered Task Verification",
    paragraphs: [
      "Developed and published an accountability application that integrates AI APIs to evaluate screenshot evidence and assess task completion.",
      "Built features around verifiable progress, structured self-reflection, recurring schedules, and behavioural accountability.",
      "The project demonstrates practical integration of AI services into consumer-facing software.",
    ],
    highlights: ["AI API Integration", "Screenshot-Based Verification", "Application Logic", "iOS Development", "App Store Release"],
  },
  {
    slug: "flora-website",
    project: "Flora",
    title: "Full-Stack Web Development & Interactive UX",
    paragraphs: [
      "Designed and developed Flora’s digital experience, combining consumer branding, responsive interfaces, interactive components, and product education.",
      "Built with modern web technologies and designed to support future e-commerce functionality and connected digital products.",
    ],
    highlights: ["Next.js", "React", "TypeScript", "Responsive Design", "Interactive UI", "Web Deployment"],
  },
];

const approach = [
  { title: "Think", text: "Understand the problem, define requirements, and establish the product direction." },
  { title: "Design", text: "Create intuitive interfaces, user flows, and responsive experiences." },
  {
    title: "Build",
    text: "Develop frontend and backend systems, integrate APIs, and use AI-native tools to accelerate implementation.",
  },
  { title: "Ship", text: "Test functionality, resolve issues, deploy releases, and improve products through iteration." },
];

/** About-page one-liners. Flora App is a concept and must never read as released. */
const projectBlurbs: Record<string, string> = {
  meza: "Social travel, dining, and real-world experiences.",
  ufaild: "AI-powered accountability and discipline application.",
  "flora-website": "Interactive consumer wellness e-commerce platform.",
  "flora-app": "Concept for a connected sexual wellness application.",
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

const pad = (n: number) => String(n).padStart(2, "0");

/** Subtle grey section label, e.g. "02 — About". */
function Label({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-mute">
      <span className="tabular-nums">{pad(n)}</span> — {children}
    </p>
  );
}

/** Section heading with the pink brand full stop. */
function Heading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="mt-3 text-[clamp(1.6rem,2.8vw,2.5rem)] font-light uppercase leading-[1.05] tracking-[-0.035em] text-ink"
    >
      {children}
      <span className="text-accent">.</span>
    </h2>
  );
}

const arrow = (
  <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 pt-14 sm:px-8 md:pt-20 lg:px-14">
      {/* 01 — Introduction */}
      <section aria-labelledby="intro-heading" className="max-w-6xl">
        <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-ink-soft">Michael Crowther</p>
        <h1
          id="intro-heading"
          className="mt-5 text-[clamp(2rem,4.6vw,4.25rem)] uppercase leading-[0.98] tracking-[-0.045em]"
        >
          <span className="block font-extralight text-headline-soft">AI-Native</span>
          <span className="block font-medium text-headline-strong">
            Full-Stack Product Developer<span className="text-accent">.</span>
          </span>
        </h1>
        <p className="mt-7 max-w-2xl text-[clamp(1.05rem,1.5vw,1.3rem)] font-light leading-[1.55] tracking-[-0.015em] text-ink-soft">
          {intro}
        </p>
      </section>

      {/* 02 — About me */}
      <section aria-labelledby="about-heading" className="reveal mt-20 grid gap-8 border-t border-line pt-10 md:mt-28 md:grid-cols-[1fr_2fr] md:gap-12">
        <div>
          <Label n={2}>About</Label>
          <Heading id="about-heading">A little about me</Heading>
        </div>
        <div className="max-w-[64ch] space-y-5 text-[clamp(1rem,1.2vw,1.0625rem)] leading-[1.75] tracking-[-0.01em] text-ink-soft">
          {aboutParagraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </section>

      {/* 03 — What I do */}
      <section aria-labelledby="skills-heading" className="mt-20 border-t border-line pt-10 md:mt-28">
        <div className="reveal">
          <Label n={3}>Capabilities</Label>
          <Heading id="skills-heading">What I do</Heading>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <li
              key={c.title}
              className="reveal rounded-[22px] border border-line p-6 transition-colors duration-300 hover:border-accent/45"
            >
              <p className="text-[12px] font-medium tabular-nums text-mute">{pad(i + 1)}</p>
              <h3 className="mt-3 text-[15px] font-medium uppercase tracking-[0.04em] text-ink">{c.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${c.title} skills`}>
                {c.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line px-2.5 py-1 text-[12.5px] tracking-[-0.005em] text-ink-soft"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* 04 — Beyond the interface */}
      <section aria-labelledby="systems-heading" className="mt-20 border-t border-line pt-10 md:mt-28">
        <div className="reveal grid gap-4 md:grid-cols-[1fr_2fr] md:gap-12">
          <div>
            <Label n={4}>Technical experience</Label>
            <Heading id="systems-heading">Beyond the interface</Heading>
          </div>
          <p className="max-w-[52ch] self-end text-[clamp(1rem,1.3vw,1.15rem)] font-light leading-[1.6] tracking-[-0.01em] text-ink-soft">
            Design is only one part of building a product. Here’s how I approach the systems behind it.
          </p>
        </div>

        <ol className="mt-10 border-b border-line">
          {experience.map((e, i) => {
            const accent = getProject(e.slug)?.accent ?? "#8d8d93";
            return (
              <li
                key={e.slug}
                className="reveal grid gap-5 border-t border-line py-8 md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.35fr)_2.75rem] md:gap-8 md:py-10"
              >
                <span className="text-[13px] font-medium tabular-nums" style={{ color: accent }}>
                  {pad(i + 1)}
                </span>

                <div>
                  <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-mute">
                    <span aria-hidden className="size-2 rounded-full" style={{ background: accent }} />
                    {e.project}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.35rem,2.2vw,1.9rem)] font-light leading-[1.12] tracking-[-0.04em] text-ink">
                    {e.title}
                  </h3>
                </div>

                <div>
                  <div className="space-y-3 text-[15.5px] leading-[1.7] tracking-[-0.01em] text-ink-soft">
                    {e.paragraphs.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${e.project} technical highlights`}>
                    {e.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full px-2.5 py-1 text-[12px] tracking-[-0.005em] text-ink-soft"
                        style={{ boxShadow: `inset 0 0 0 1px ${accent}55` }}
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/work/${e.slug}`}
                  aria-label={`Read the ${e.project} case study`}
                  className="flex size-11 items-center justify-center self-start justify-self-start rounded-full border border-line text-ink transition-colors duration-300 hover:border-transparent hover:bg-(--hover-bg) hover:text-white md:justify-self-end"
                  style={{ ["--hover-bg" as string]: accent }}
                >
                  {arrow}
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* 05 — How I work */}
      <section aria-labelledby="approach-heading" className="mt-20 border-t border-line pt-10 md:mt-28">
        <div className="reveal">
          <Label n={5}>How I work</Label>
          <Heading id="approach-heading">My development approach</Heading>
        </div>
        <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((s, i) => (
            <li key={s.title} className="reveal border-t border-ink/80 pt-5">
              <p className="flex items-baseline gap-3">
                <span className="text-[12px] font-medium tabular-nums text-mute">{pad(i + 1)}</span>
                <span className="text-[15px] font-medium uppercase tracking-[0.06em] text-ink">{s.title}</span>
              </p>
              <p className="mt-3 text-[15px] leading-[1.65] tracking-[-0.01em] text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 06 — Projects */}
      <section aria-labelledby="projects-heading" className="reveal mt-20 border-t border-line pt-10 md:mt-28">
        <Label n={6}>Work</Label>
        <Heading id="projects-heading">Projects</Heading>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 sm:grid-cols-[minmax(10rem,1fr)_2fr_auto]"
              >
                <span className="flex items-center gap-2.5 text-[clamp(1.15rem,1.8vw,1.4rem)] font-light tracking-[-0.035em] text-ink transition-colors group-hover:text-mute">
                  <span aria-hidden className="size-2 rounded-full" style={{ background: p.accent }} />
                  {p.name}
                  {p.status === "concept" && (
                    <span className="rounded-full bg-wash px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.08em] text-mute">
                      Concept
                    </span>
                  )}
                </span>
                <span className="col-span-2 row-start-2 text-[14.5px] tracking-[-0.01em] text-mute sm:col-span-1 sm:row-start-auto">
                  {projectBlurbs[p.slug] ?? p.summary}
                </span>
                <span
                  aria-hidden
                  className="col-start-2 row-start-1 text-mute transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 sm:col-start-auto sm:row-start-auto"
                >
                  {arrow}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 07 — Availability */}
      <section
        aria-labelledby="availability-heading"
        className="reveal mt-20 flex flex-col gap-8 border-t border-line pt-10 md:mt-28 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-mute">
            <span aria-hidden className="size-2 rounded-full bg-accent" />
            Availability
          </p>
          <h2
            id="availability-heading"
            className="mt-3 max-w-3xl text-[clamp(1.6rem,2.8vw,2.5rem)] font-light uppercase leading-[1.05] tracking-[-0.035em] text-ink"
          >
            Available for remote opportunities<span className="text-accent">.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-[1.65] tracking-[-0.01em] text-ink-soft">
            Open to full-stack development, AI product engineering, and AI-native software development opportunities.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-ink px-6 py-3.5 text-[14px] font-medium uppercase tracking-[0.06em] text-white transition-colors duration-300 hover:bg-accent md:self-auto"
        >
          Get in touch {arrow}
        </Link>
      </section>
    </div>
  );
}
