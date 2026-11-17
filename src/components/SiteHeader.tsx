import Link from "next/link";

const linkClass =
  "text-[15px] font-normal tracking-[-0.02em] text-ink transition-colors hover:text-mute md:text-[17px]";

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto w-full max-w-[1440px] px-5 pt-6 sm:px-8 md:pt-9 lg:px-14">
      <nav aria-label="Primary" className="grid grid-cols-[1fr_auto_1fr] items-center">
        <ul className="flex items-center gap-5 md:gap-14">
          <li>
            <Link href="/#work" className={linkClass}>
              <span className="hidden sm:inline">Selected </span>Work
            </Link>
          </li>
          <li>
            <Link href="/about" className={linkClass}>
              About
            </Link>
          </li>
        </ul>

        <Link
          href="/"
          aria-label="Michael — home"
          className="text-[24px] font-semibold tracking-[-0.06em] text-ink-soft md:text-[32px]"
        >
          Michael.
        </Link>

        <div className="flex justify-end">
          <Link
            href="/contact"
            className="rounded-full bg-wash px-4 py-1.5 text-[15px] tracking-[-0.02em] text-ink transition-colors hover:bg-ink hover:text-white md:px-5 md:py-2 md:text-[17px]"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
