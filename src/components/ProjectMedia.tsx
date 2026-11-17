import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";

type Props = {
  image?: ProjectImage;
  accent: string;
  /** What should eventually go here, e.g. "Home screen". */
  label: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Compact placeholder label for small surfaces like cards. */
  compact?: boolean;
};

/**
 * Renders a real, optimised image when one is provided; otherwise a clearly
 * labelled placeholder tinted with the project accent. Never fakes a screenshot.
 */
export function ProjectMedia({ image, accent, label, sizes, className = "", priority, compact }: Props) {
  if (image) {
    return (
      <div className={`relative overflow-hidden bg-wash ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Placeholder — ${label} not yet added`}
      className={`relative flex items-end overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${accent}33 0%, transparent 60%), linear-gradient(160deg, ${accent}24 0%, ${accent}0d 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `linear-gradient(${accent}1f 1px, transparent 1px), linear-gradient(90deg, ${accent}1f 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />
      <span
        aria-hidden
        className={`relative m-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 font-medium uppercase tracking-[0.08em] text-ink-soft backdrop-blur ${
          compact ? "px-2 py-1 text-[9px]" : "px-3 py-1.5 text-[11px]"
        }`}
      >
        <span className="size-1.5 rounded-full" style={{ background: accent }} />
        Placeholder · {label}
      </span>
    </div>
  );
}
