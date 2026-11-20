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
 * Phone navigation (below the `sm` breakpoint): the brand plus a Menu button
 * that opens a simple panel of large links. Closes on link tap, route change,
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
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-10 items-center gap-2.5 rounded-full bg-wash pl-4 pr-3.5 text-[15px] tracking-[-0.02em] text-ink"
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden className="relative block h-2.5 w-3.5">
            <span
              className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${open ? "top-1/2 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`}
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
                className="flex items-center justify-between py-4 text-[26px] font-light tracking-[-0.04em] text-ink"
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
