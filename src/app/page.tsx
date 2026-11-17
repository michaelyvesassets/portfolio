import Link from "next/link";
import { HangingShowcase } from "@/components/HangingShowcase";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1440px] px-5 pt-16 sm:px-8 md:pt-24 lg:px-14 lg:pt-28">
        {/* Line 1: ~80px at 1440px wide (capped at 84px), scaling down on phones.
            Line 2 is 1.18× line 1. Tight line-height pulls the two lines together as in the Figma. */}
        {/* Letter-spacing is set per line: an em value set on the h1 would be inherited as
            fixed px and come out looser on the larger second line. */}
        <h1 className="text-[clamp(2rem,5.6vw,5.25rem)] font-light leading-[0.98]">
          <span className="block tracking-[-0.06em] text-ink">I Design &amp; Build</span>
          <span className="-mt-[0.06em] block text-[1.18em] italic leading-[0.98] tracking-[-0.06em] text-headline-soft">
            Digital Products
            <span
              aria-hidden
              className="ml-[0.05em] inline-block size-[0.12em] rounded-full bg-accent align-baseline"
            />
            <span className="sr-only">.</span>
          </span>
        </h1>
      </section>

      <section
        id="work"
        aria-labelledby="work-heading"
        className="mx-auto mt-14 w-full max-w-[1440px] scroll-mt-8 px-5 sm:px-8 md:mt-20 lg:px-14"
      >
        <div className="mb-2 flex items-baseline justify-between text-[12px] font-medium uppercase tracking-[0.12em] text-mute">
          <h2 id="work-heading">Selected work</h2>
          <span aria-hidden>({String(projects.length).padStart(2, "0")})</span>
        </div>

        <HangingShowcase projects={projects} />

        <div className="mt-8 flex flex-col justify-between gap-2 text-[12px] uppercase tracking-[0.12em] text-mute sm:flex-row">
          <span>Hover to lift · Click to open</span>
          <span className="hidden sm:inline">Drag, swipe or use ← → keys</span>
        </div>
      </section>

      <section
        aria-labelledby="index-heading"
        className="mx-auto mt-28 w-full max-w-[1440px] px-5 sm:px-8 lg:px-14"
      >
        <h2 id="index-heading" className="text-[12px] font-medium uppercase tracking-[0.12em] text-mute">
          Index
        </h2>
        <ul className="mt-6 border-t border-line">
          {projects.map((p, i) => (
            <li key={p.slug} className="border-b border-line">
              <Link
                href={`/work/${p.slug}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 md:grid-cols-[4rem_1fr_1fr_11rem] md:py-8"
              >
                <span className="text-[13px] tabular-nums text-mute">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-light tracking-[-0.05em] text-ink transition-transform duration-300 group-hover:translate-x-2">
                  {p.name}
                </span>
                <span className="hidden text-[15px] tracking-[-0.01em] text-mute md:block">{p.summary}</span>
                <span className="flex items-center justify-end gap-2 text-right text-[12px] uppercase tracking-[0.1em] text-mute">
                  <span className="size-2 rounded-full" style={{ background: p.accent }} aria-hidden />
                  {p.status === "concept" ? "Concept" : p.platform}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
