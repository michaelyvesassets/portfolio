import Image from "next/image";
import type { CSSProperties } from "react";
import type { ProjectImage } from "@/lib/projects";

type Props = {
  image: ProjectImage;
  /** Height of the display as any CSS length (e.g. "78cqh"); everything else scales from it. */
  screenHeight: string;
  sizes: string;
  priority?: boolean;
  /** Draw the CSS Dynamic Island. Turn off when the screenshot already includes one. */
  island?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Minimal CSS iPhone: a thin black bezel, rounded display corners and a Dynamic
 * Island. The display keeps the screenshot's own aspect ratio, so the image is
 * never stretched or cropped (beyond the display's rounded corners, as on the
 * device). Proportions are fixed fractions of `screenHeight`.
 */
export function IPhone({ image, screenHeight, sizes, priority, island = true, className = "", style }: Props) {
  return (
    <div
      className={`bg-[#0b0b0c] ${className}`}
      style={{
        ["--screen-h" as string]: screenHeight,
        padding: "calc(var(--screen-h) * 0.0141)",
        borderRadius: "calc(var(--screen-h) * 0.0731)",
        ...style,
      }}
    >
      <div
        className="relative overflow-hidden bg-white"
        style={{
          height: "var(--screen-h)",
          aspectRatio: `${image.width} / ${image.height}`,
          borderRadius: "calc(var(--screen-h) * 0.059)",
        }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className="object-cover"
        />
        {/* Dynamic Island: sits in the status bar's empty centre, as on the device. */}
        {island && (
          <span
            aria-hidden
            className="absolute left-1/2 top-[1.2%] h-[3.9%] w-[29%] -translate-x-1/2 rounded-full bg-[#0b0b0c]"
          />
        )}
      </div>
    </div>
  );
}
