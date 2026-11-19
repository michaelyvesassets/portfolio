import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectBrowserHero } from "@/components/ProjectBrowserHero";
import { ProjectKeyScreens } from "@/components/ProjectKeyScreens";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ProjectPhoneHero } from "@/components/ProjectPhoneHero";
import { getNextProject, getProject, projects, type Project } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

/** Small status indicator in the header metadata. */
const STATUS = {
  launched: { label: "Launched", colour: "#22c55e" },
  "in-development": { label: "In development", colour: "#f59e0b" },
  concept: { label: "Concept / In development", colour: "#7b86ff" },
} as const;

/** Map the showcase's hero order (indices into `screens`) to the three phones. */
function heroPhones({ screens, heroOrder: [l, c, r] = [2, 0, 1] }: NonNullable<Project["showcase"]>) {
  return { left: screens[l], centre: screens[c], right: screens[r] };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const isConcept = project.status === "concept";

  const number = String(projects.findIndex((p) => p.slug === project.slug) + 1).padStart(2, "0");
  const { details } = project;
  const facts = [
    { label: "Category", value: details.category },
    { label: "Platform", value: details.platform },
    { label: "Role", value: details.role },
    { label: "Year", value: details.year },
  ];
  const status = STATUS[details.status];

  const sections = [
    { title: "Challenge", paragraphs: project.caseStudy.challenge },
    { title: "Process", paragraphs: project.caseStudy.process },
    { title: "Outcome", paragraphs: project.caseStudy.outcome },
  ];

  return (
    <article className="mx-auto w-full max-w-[1440px] px-5 pt-10 sm:px-8 md:pt-14 lg:px-14">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-[14px] tracking-[-0.01em] text-mute transition-colors hover:text-ink"
      >
        <span aria-hidden>←</span> All work
      </Link>

      <header className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-14">
        <div>
          <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-mute">
            <span aria-hidden className="size-2 rounded-full" style={{ background: project.accent }} />
            Case study <span aria-hidden>/</span> <span className="tabular-nums">{number}</span>
          </p>
          <h1 className="mt-3 text-[clamp(36px,9vw,52px)] font-medium leading-[1.02] tracking-[-0.06em] text-headline-strong md:text-[clamp(48px,5vw,76px)]">
            {project.name}
            <span aria-hidden className="ml-[0.06em] inline-block size-[0.14em] rounded-full bg-accent" />
          </h1>
          <p className="mt-3 max-w-xl text-[clamp(1.0625rem,1.6vw,1.375rem)] font-light leading-snug tracking-[-0.03em] text-ink-soft">
            {project.summary}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 text-[14px]">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-mute">{f.label}</dt>
              <dd className="mt-1 tracking-[-0.01em] text-ink">{f.value}</dd>
            </div>
          ))}
          <div className="col-span-2">
            <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-mute">Status</dt>
            <dd className="mt-1.5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-ink">
              <span aria-hidden className="size-1.5 rounded-full" style={{ background: status.colour }} />
              {status.label}
            </dd>
          </div>
        </dl>
      </header>

      {isConcept && (
        <p
          className="mt-8 rounded-2xl px-5 py-4 text-[15px] leading-relaxed"
          style={{ background: `${project.accent}14`, color: "#2b2f6b" }}
        >
          <strong className="font-semibold">Concept / in development.</strong> The Flora companion app has not been
          released. Everything on this page describes planned work.
        </p>
      )}

      {project.showcase?.device === "browser" && project.showcase.heroScreens ? (
        <ProjectBrowserHero
          windows={{ main: project.showcase.heroScreens[0], secondary: project.showcase.heroScreens[1] }}
          background={project.showcase.heroBackground}
          glow={project.showcase.heroGlow}
          className="mt-12 aspect-[4/5] w-full rounded-[28px] border border-line sm:aspect-[16/10] md:mt-16 lg:aspect-[16/9]"
        />
      ) : project.showcase ? (
        <ProjectPhoneHero
          phones={heroPhones(project.showcase)}
          background={project.showcase.heroBackground}
          glow={project.showcase.heroGlow}
          island={project.showcase.island}
          className="mt-12 aspect-[4/5] w-full rounded-[28px] border border-line sm:aspect-[16/10] md:mt-16 lg:aspect-[16/9]"
        />
      ) : (
        <ProjectMedia
          image={project.cover}
          accent={project.accent}
          label="Hero image"
          sizes="(min-width: 1440px) 1340px, 100vw"
          priority
          fit="intrinsic"
          className={`mt-12 w-full rounded-[28px] border border-line md:mt-16 ${project.cover ? "" : "aspect-[16/9]"}`}
        />
      )}

      <div className="mt-20 grid gap-16 md:mt-28">
        {sections.map((s, i) => (
          <section key={s.title} className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <h2 className="flex items-baseline gap-4 text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[-0.05em] text-ink">
              <span className="text-[13px] tabular-nums tracking-normal text-mute">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </h2>
            <div className="max-w-[62ch] space-y-5 text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.7] tracking-[-0.01em] text-ink-soft">
              {s.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <ProjectKeyScreens
        heading={isConcept ? "Explorations" : "Key screens"}
        screens={project.showcase?.screens.map((image) => ({ image }))}
        tileBackground={project.showcase?.tileBackground}
        island={project.showcase?.island}
        device={project.showcase?.device}
        gallery={project.gallery}
        accent={project.accent}
        placeholderLabel={(i) => (isConcept ? `Concept ${i + 1}` : `Screen ${i + 1}`)}
      />

      <nav aria-label="Next project" className="mt-28 border-t border-line pt-10">
        <Link href={`/work/${next.slug}`} className="group flex flex-col gap-2">
          <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-mute">Next project</span>
          <span className="flex items-center gap-4 text-[clamp(2rem,6vw,5rem)] font-bold italic tracking-[-0.07em] text-ink">
            {next.name}
            <span
              aria-hidden
              className="inline-block text-[0.5em] font-light not-italic transition-transform duration-300 group-hover:translate-x-3"
              style={{ color: next.accent }}
            >
              →
            </span>
          </span>
        </Link>
      </nav>
    </article>
  );
}
