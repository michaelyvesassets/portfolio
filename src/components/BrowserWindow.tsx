import Image from "next/image";
import type { CSSProperties } from "react";
import type { ProjectImage } from "@/lib/projects";

type Props = {
  image: ProjectImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Minimal desktop browser window: a thin border, rounded corners and a slim
 * title bar with three small dots. The page area keeps the screenshot's own
 * aspect ratio, so it is never stretched or cropped. The window is an
 * inline-size container, so its chrome scales with its width.
 */
export function BrowserWindow({ image, sizes, priority, className = "", style }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-[10px] border border-black/[0.08] bg-white [container-type:inline-size] sm:rounded-[12px] ${className}`}
      style={style}
    >
      <div
        aria-hidden
        className="flex items-center border-b border-black/[0.06] bg-[#fafafa]"
        style={{ height: "clamp(12px, 3.4cqw, 34px)", gap: "clamp(3px, 0.75cqw, 8px)", paddingInline: "clamp(6px, 1.8cqw, 18px)" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="rounded-full bg-black/[0.13]"
            style={{ width: "clamp(4px, 0.9cqw, 10px)", height: "clamp(4px, 0.9cqw, 10px)" }}
          />
        ))}
      </div>
      <div className="relative w-full" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} draggable={false} className="object-cover" />
      </div>
    </div>
  );
}

/** One screenshot in a browser window, centred in a Key screens tile; lifts on hover. */
export function BrowserFrame({
  image,
  background,
  sizes,
  className = "",
}: {
  image: ProjectImage;
  background: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`group relative flex items-center justify-center overflow-hidden ${className}`} style={{ background }}>
      <BrowserWindow
        image={image}
        sizes={sizes}
        className="w-[86%] shadow-[0_1px_2px_rgba(20,22,60,0.08),0_22px_44px_-18px_rgba(43,47,107,0.30)] transition-transform duration-300 ease-out group-hover:-translate-y-[5px]"
      />
    </div>
  );
}
