"use client";

import { useEffect, useRef, useState } from "react";

/** Copies the email to the clipboard and confirms with "Copied!" for ~2s. */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API unavailable (e.g. insecure context): fall back to a hidden textarea.
      const el = document.createElement("textarea");
      el.value = email;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-9 items-center rounded-full border border-line px-4 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-soft transition-colors duration-[250ms] hover:border-ink hover:text-ink"
    >
      <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
    </button>
  );
}
