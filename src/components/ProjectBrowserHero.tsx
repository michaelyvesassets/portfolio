import type { CSSProperties } from "react";
import type { ProjectImage } from "@/lib/projects";
import { BrowserWindow } from "./BrowserWindow";
import { SHADOW_BACK, SHADOW_FRONT } from "./ProjectPhoneHero";

type Props = {
  /** The large primary window and the smaller overlapping one. */
  windows: { main: ProjectImage; secondary: ProjectImage };
  background: string;
  /** Colour of the soft glow behind the windows. */
  glow: string;
  className?: string;
};

/**
 * Website counterpart to ProjectPhoneHero: one large browser window with a
 * smaller window overlapping its lower-right corner. Same box, glow, shadows
 * and staggered `.rise-in` entrance as the phone heroes.
 *
 * The box is a size container: widths and horizontal offsets are in cqw,
 * vertical offsets in cqh, set per breakpoint through CSS variables. On mobile
 * the main window spans the width and the secondary sits mostly underneath it.
 */
export function ProjectBrowserHero({ windows: { main, secondary }, background, glow, className = "" }: Props) {
  return (
    <div
      className={`relative overflow-hidden [container-type:size] [--mw:88cqw] [--mx:6cqw] [--my:12cqh] [--sw:66cqw] [--sx:5cqw] [--sy:12.8cqh] sm:[--mw:62cqw] sm:[--mx:9cqw] sm:[--my:10cqh] sm:[--sw:38cqw] sm:[--sx:7cqw] sm:[--sy:9cqh] ${className}`}
      style={{ background }}
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[110cqh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: `radial-gradient(closest-side, ${glow}, transparent)` }}
      />
      <BrowserWindow
        image={main}
        sizes="(min-width: 1024px) 840px, (min-width: 640px) 62vw, 88vw"
        priority
        className="rise-in absolute z-10"
        style={
          {
            width: "var(--mw)",
            left: "var(--mx)",
            top: "var(--my)",
            boxShadow: SHADOW_BACK,
            "--delay": "0ms",
          } as CSSProperties
        }
      />
      <BrowserWindow
        image={secondary}
        sizes="(min-width: 1024px) 520px, (min-width: 640px) 38vw, 66vw"
        className="rise-in absolute z-20"
        style={
          {
            width: "var(--sw)",
            right: "var(--sx)",
            bottom: "var(--sy)",
            boxShadow: SHADOW_FRONT,
            "--delay": "100ms",
          } as CSSProperties
        }
      />
    </div>
  );
}
