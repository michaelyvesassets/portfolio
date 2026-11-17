import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-14">
      <div className="flex flex-col gap-6 border-t border-line pt-8 text-[14px] tracking-[-0.01em] text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-semibold tracking-[-0.04em] text-ink-soft">Michael.</span> Designing &amp;
          building digital products.
        </p>
        <ul className="flex gap-6">
          <li>
            <Link href="/#work" className="hover:text-ink">
              Work
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-ink">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-ink">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
