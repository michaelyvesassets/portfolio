import type { CSSProperties } from "react";
import type { ProjectImage } from "@/lib/projects";
import { IPhone } from "./IPhone";

type Props = {
  /** The three hero phones. The centre one is larger and in front. */
  phones: { left: ProjectImage; centre: ProjectImage; right: ProjectImage };
  background: string;
  /** Colour of the soft glow behind the centre phone. */
  glow: string;
  /** Draw the CSS Dynamic Island (off when the screenshots already include one). */
  island?: boolean;
  className?: string;
};

export const SHADOW_FRONT =
  "0 2px 4px rgba(20,22,60,0.10), 0 30px 60px -20px rgba(43,47,107,0.45), 0 60px 90px -40px rgba(43,47,107,0.30)";
export const SHADOW_BACK = "0 1px 3px rgba(20,22,60,0.10), 0 24px 48px -20px rgba(43,47,107,0.38)";

/**
 * Shared case-study hero: three floating iPhones. The centre phone is larger and
 * in front; the side phones sit behind it, rotated ∓12°. Only the images and the
 * colours (background, glow) vary between projects; everything else is fixed
 * here so every project that uses it stays visually identical.
 *
 * The box is a size container, so every measurement is in cqh (a fraction of
 * its height) and the composition scales as a whole. The per-breakpoint values
 * live in CSS variables: --c centre height, --s side height, --dx side offset.
 *
 * Positioning uses `transform`; the entrance animation (`.rise-in` in
 * globals.css) animates the separate `translate` and `opacity` properties, so
 * the two never fight and the phones end exactly where they're placed.
 */
export function ProjectPhoneHero({ phones: { left, centre, right }, background, glow, island, className = "" }: Props) {
  const side = (x: string, rotate: number, delay: number, image: ProjectImage) => (
    <IPhone
      image={image}
      screenHeight="var(--s)"
      sizes="(min-width: 1024px) 260px, (min-width: 640px) 200px, 140px"
      island={island}
      className="rise-in absolute left-1/2 top-1/2 z-10"
      style={
        {
          transform: `translate(-50%, -50%) translate(${x}, 3cqh) rotate(${rotate}deg)`,
          boxShadow: SHADOW_BACK,
          "--delay": `${delay}ms`,
        } as CSSProperties
      }
    />
  );

  return (
    <div
      className={`relative overflow-hidden [container-type:size] [--c:74cqh] [--dx:21cqh] [--s:62cqh] sm:[--c:80cqh] sm:[--dx:29cqh] sm:[--s:68cqh] ${className}`}
      style={{ background }}
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[110cqh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: `radial-gradient(closest-side, ${glow}, transparent)` }}
      />
      {side("calc(var(--dx) * -1)", -12, 100, left)}
      {side("var(--dx)", 12, 200, right)}
      <IPhone
        image={centre}
        screenHeight="var(--c)"
        sizes="(min-width: 1024px) 300px, (min-width: 640px) 240px, 170px"
        priority
        island={island}
        className="rise-in absolute left-1/2 top-1/2 z-20"
        style={
          {
            transform: "translate(-50%, -50%) translateY(-1.5cqh)",
            boxShadow: SHADOW_FRONT,
            "--delay": "0ms",
          } as CSSProperties
        }
      />
    </div>
  );
}
