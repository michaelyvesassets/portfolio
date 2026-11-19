import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMedia } from "@/components/ProjectMedia";
import { getNextProject, getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const isConcept = project.status === "concept";

  const facts: { label: string; value?: string }[] = [
    { label: "Category", value: project.category },
    { label: "Platform", value: project.platform },
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
  ];

  const sections = [
    { title: "Challenge", paragraphs: project.caseStudy.challenge },
    { title: "Process", paragraphs: project.caseStudy.process },
    { title: "Outcome", paragraphs: project.caseStudy.outcome },
  ];

  return (
    <article className="mx-auto w-full max-w-[1440px] px-5 pt-14 sm:px-8 md:pt-20 lg:px-14">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-[14px] tracking-[-0.01em] text-mute transition-colors hover:text-ink"
      >
        <span aria-hidden>←</span> All work
      </Link>

      <header className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-mute">
            <span aria-hidden className="size-2 rounded-full" style={{ background: project.accent }} />
            {isConcept ? project.statusLabel : "Case study"}
          </p>
          <h1 className="mt-4 text-[clamp(3rem,9vw,8.5rem)] font-bold italic leading-[0.92] tracking-[-0.075em] text-ink">
            {project.name}
            <span aria-hidden className="ml-[0.04em] inline-block size-[0.12em] rounded-full bg-accent" />
          </h1>
          <p className="mt-6 max-w-xl text-[clamp(1.25rem,2.2vw,1.75rem)] font-light leading-snug tracking-[-0.03em] text-ink-soft">
            {project.summary}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 text-[14px]">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-mute">{f.label}</dt>
              <dd className={`mt-1 tracking-[-0.01em] ${f.value ? "text-ink" : "italic text-mute"}`}>
                {f.value ?? "To be confirmed"}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {isConcept && (
        <p
          className="mt-10 rounded-2xl px-5 py-4 text-[15px] leading-relaxed"
          style={{ background: `${project.accent}14`, color: "#2b2f6b" }}
        >
          <strong className="font-semibold">Concept / in development.</strong> The Flora companion app has not been
          released. Everything on this page describes planned work.
        </p>
      )}

      <ProjectMedia
        image={project.cover}
        accent={project.accent}
        label="Hero image"
        sizes="(min-width: 1440px) 1340px, 100vw"
        priority
        fit="intrinsic"
        className={`mt-12 w-full rounded-[28px] border border-line md:mt-16 ${project.cover ? "" : "aspect-[16/9]"}`}
      />

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

      <section aria-labelledby="screens" className="mt-24">
        <h2 id="screens" className="text-[12px] font-medium uppercase tracking-[0.12em] text-mute">
          {isConcept ? "Explorations" : "Key screens"}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => project.gallery?.[i]).map((img, i) => (
            <ProjectMedia
              key={i}
              image={img}
              accent={project.accent}
              label={isConcept ? `Concept ${i + 1}` : `Screen ${i + 1}`}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              fit="contain"
              className="aspect-[4/5] w-full rounded-[22px]"
            />
          ))}
        </div>
      </section>

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
