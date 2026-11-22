import type { Metadata } from "next";
import { CopyEmailButton } from "@/components/CopyEmailButton";
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

      <p className="mt-6 max-w-md text-[clamp(1rem,1.3vw,1.125rem)] leading-relaxed tracking-[-0.01em] text-mute">
        Open to remote opportunities, collaborations, and interesting projects.
      </p>

      <section aria-labelledby="email-heading" className="mt-16 border-t border-line pt-10 md:mt-20 md:pt-12">
        <h2 id="email-heading" className="text-[12px] font-medium uppercase tracking-[0.12em] text-mute">
          Get in touch
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a
            href={`mailto:${contact.email}`}
            className="group inline-flex max-w-full items-start gap-[0.2em] text-[clamp(1.25rem,5.6vw,3.5rem)] font-light leading-[1.15] tracking-[-0.045em] text-ink [overflow-wrap:anywhere]"
          >
            <span className="min-w-0 underline decoration-line decoration-1 underline-offset-[0.18em] transition-colors duration-[250ms] group-hover:decoration-accent">
              {contact.email}
            </span>
            <span
              aria-hidden
              className="inline-block text-[0.6em] leading-none transition-[transform,color] duration-[250ms] group-hover:translate-x-[0.12em] group-hover:-translate-y-[0.12em] group-hover:text-accent"
            >
              ↗
            </span>
          </a>
          <CopyEmailButton email={contact.email} />
        </div>
      </section>
    </div>
  );
}
