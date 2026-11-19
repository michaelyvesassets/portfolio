import type { ProjectImage } from "@/lib/projects";
import { IPhone } from "./IPhone";

type Props = {
  image: ProjectImage;
  /** Soft backdrop behind the device. */
  background: string;
  sizes: string;
  /** Draw the CSS Dynamic Island (off when the screenshot already has one). */
  island?: boolean;
  className?: string;
};

/**
 * One screenshot in an iPhone, centred in a gallery tile. The tile is a size
 * container, so the phone is a fixed fraction of the tile's height (cqh) and
 * phones stay identical in size across a row.
 */
export function PhoneFrame({ image, background, sizes, island, className = "" }: Props) {
  return (
    <div
      className={`group relative flex items-center justify-center overflow-hidden [container-type:size] ${className}`}
      style={{ background }}
    >
      <IPhone
        image={image}
        screenHeight="78cqh"
        sizes={sizes}
        island={island}
        className="shadow-[0_1px_2px_rgba(20,22,60,0.10),0_22px_44px_-18px_rgba(43,47,107,0.38)] transition-transform duration-300 ease-out group-hover:-translate-y-[5px]"
      />
    </div>
  );
}
