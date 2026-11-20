"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const items = [
  { href: "/#work", label: "Selected Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Phone navigation (below the `sm` breakpoint): the brand plus a hamburger
 * button that opens a simple panel of links. Closes on link tap, route change,
 * Escape or a tap outside. Desktop navigation is untouched.
 */
export function MobileNav() {
  const pathname = usePathname();
  // The menu remembers the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((prev) => ((typeof next === "function" ? next(prev === pathname) : next) ? pathname : null));
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="sm:hidden">
      <nav aria-label="Primary" className="flex items-center justify-between">
        <Link href="/" aria-label="Michael — home" className="text-[24px] font-semibold tracking-[-0.06em] text-ink-soft">
          Michael.
        </Link>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          // 44px touch target; the negative margin keeps the icon flush with the page edge.
          className="-mr-[11px] flex size-11 items-center justify-center rounded-full text-ink"
        >
          {/* Two thin 22px lines that cross into an X when open. */}
          <span aria-hidden className="relative block h-[9px] w-[22px]">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-[280ms] ease-out motion-reduce:transition-none ${open ? "translate-y-[3.75px] rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-[280ms] ease-out motion-reduce:transition-none ${open ? "-translate-y-[3.75px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-30 border-b border-line bg-white px-5 pb-6 shadow-[0_24px_40px_-28px_rgba(20,22,60,0.25)] motion-safe:animate-[menu-in_220ms_ease-out]"
      >
        <ul className="border-t border-line">
          {items.map((item, i) => (
            <li key={item.href} className="border-b border-line">
              <Link
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
                className="flex items-center justify-between py-[11px] text-[clamp(28px,7vw,32px)] font-medium leading-[1.1] tracking-[-0.04em] text-ink"
              >
                {item.label}
                <span aria-hidden className="text-[18px] text-mute">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
