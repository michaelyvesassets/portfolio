import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "About",
  description: "About Michael — designing and building digital products.",
};

const disciplines = ["Product design", "Interface design", "Front-end development", "iOS & web"];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 pt-16 sm:px-8 md:pt-24 lg:px-14">
      <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-mute">About</p>
      <h1 className="mt-4 max-w-5xl text-[clamp(2.4rem,6vw,5.5rem)] font-extralight leading-[1] tracking-[-0.065em] text-ink-soft">
        I&apos;m Michael — I design <span className="font-bold italic text-ink">&amp; build</span> digital
        products end to end<span className="text-accent">.</span>
      </h1>

      <div className="mt-20 grid gap-16 md:grid-cols-[1fr_2fr]">
        <div
          role="img"
          aria-label="Placeholder — portrait not yet added"
          className="flex aspect-[4/5] items-end rounded-[28px] border border-dashed border-line bg-wash p-4"
        >
          <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-soft">
            Placeholder · Portrait
          </span>
        </div>

        <div className="space-y-10">
          <p className="rounded-2xl border border-dashed border-line bg-wash/60 px-5 py-4 text-[15px] leading-relaxed text-mute">
            <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft">Placeholder</span>
            A short bio: background, how you approach design and engineering together, and what you&apos;re
            looking for next.
          </p>

          <div>
            <h2 className="text-[12px] font-medium uppercase tracking-[0.12em] text-mute">What I do</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {disciplines.map((d) => (
                <li key={d} className="rounded-full border border-line px-4 py-2 text-[15px] tracking-[-0.01em]">
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[13px] italic text-mute">Edit this list in src/app/about/page.tsx.</p>
          </div>

          <div>
            <h2 className="text-[12px] font-medium uppercase tracking-[0.12em] text-mute">Projects</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="flex items-center justify-between gap-4 py-4 text-[17px] tracking-[-0.02em] hover:text-mute"
                  >
                    <span>{p.name}</span>
                    <span className="text-[14px] text-mute">{p.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/contact"
            className="inline-flex rounded-full bg-ink px-6 py-3 text-[15px] tracking-[-0.01em] text-white transition-opacity hover:opacity-80"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
