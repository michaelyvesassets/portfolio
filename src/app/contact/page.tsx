import type { Metadata } from "next";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Michael about a product, a role or a collaboration.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 pt-16 sm:px-8 md:pt-24 lg:px-14">
      <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-mute">Contact</p>
      <h1 className="mt-4 text-[clamp(2rem,4.45vw,4.25rem)] leading-[0.96]">
        <span className="block font-light tracking-[-0.06em] text-headline-soft">Have something</span>
        <span className="block text-[1.18em] font-semibold italic leading-[0.96] tracking-[-0.06em] text-headline-strong">
          in mind
          <span aria-hidden className="ml-[0.04em] inline-block size-[0.13em] rounded-full bg-accent" />
        </span>
      </h1>

      <div className="mt-20 grid gap-12 border-t border-line pt-10 md:grid-cols-2">
        <div>
          <h2 className="text-[12px] font-medium uppercase tracking-[0.12em] text-mute">Email</h2>
          {contact.email ? (
            <a
              href={`mailto:${contact.email}`}
              className="mt-3 inline-block text-[clamp(1.5rem,3.2vw,2.75rem)] font-light tracking-[-0.05em] text-ink underline decoration-line decoration-1 underline-offset-8 transition-colors hover:decoration-ink"
            >
              {contact.email}
            </a>
          ) : (
            <p className="mt-3 rounded-2xl border border-dashed border-line bg-wash/60 px-5 py-4 text-[15px] text-mute">
              <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
                Placeholder
              </span>
              Add your email in src/lib/site.ts.
            </p>
          )}
        </div>

        <div>
          <h2 className="text-[12px] font-medium uppercase tracking-[0.12em] text-mute">Elsewhere</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {contact.links.map((l) => (
              <li key={l.label} className="flex items-center justify-between py-4 text-[17px] tracking-[-0.02em]">
                {l.href ? (
                  <a href={l.href} target="_blank" rel="noreferrer" className="hover:text-mute">
                    {l.label} <span aria-hidden>↗</span>
                  </a>
                ) : (
                  <>
                    <span className="text-mute">{l.label}</span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-mute">Link placeholder</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
