import type { ProjectImage } from "@/lib/projects";
import { BrowserFrame } from "./BrowserWindow";
import { PhoneFrame } from "./PhoneFrame";
import { ProjectMedia } from "./ProjectMedia";

export type KeyScreen = {
  image: ProjectImage;
  /** Optional caption shown under the tile. */
  title?: string;
  description?: string;
};

type Props = {
  heading: string;
  /** Screens shown in iPhones. Without them the section shows the gallery or labelled placeholders. */
  screens?: KeyScreen[];
  /** Tile backdrop behind each phone. */
  tileBackground?: string;
  /** Draw the CSS Dynamic Island (off when the screenshots already include one). */
  island?: boolean;
  /** Frame each screen in an iPhone (default) or a desktop browser window. */
  device?: "iphone" | "browser";
  /** Fallback for projects without phone screens. */
  gallery?: ProjectImage[];
  accent: string;
  placeholderLabel: (index: number) => string;
};

const TILE = "aspect-[4/5] w-full rounded-[22px]";
/** Browser tiles are landscape to suit desktop screenshots; same width, radius and gap. */
const BROWSER_TILE = "aspect-[4/3] w-full rounded-[22px]";

/**
 * Shared "Key screens" section: three equal tiles (3 columns desktop, 2 tablet,
 * 1 mobile). Each screen sits in an iPhone that lifts on hover and fades in on
 * scroll. Only the images and tile colour vary between projects.
 */
export function ProjectKeyScreens({
  heading,
  screens,
  tileBackground,
  island,
  device = "iphone",
  gallery,
  accent,
  placeholderLabel,
}: Props) {
  return (
    <section aria-labelledby="screens" className="mt-24">
      <h2 id="screens" className="text-[12px] font-medium uppercase tracking-[0.12em] text-mute">
        {heading}
      </h2>
      {/* Phones: a native swipeable row (scroll-snap) bleeding to the screen edges,
          with the next screen peeking in. From `sm` up: the original grid. */}
      <div
        tabIndex={screens ? 0 : undefined}
        role={screens ? "region" : undefined}
        aria-label={screens ? `${heading}, swipe for more` : undefined}
        className="-mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] max-sm:*:w-[78%] max-sm:*:shrink-0 max-sm:*:snap-start max-sm:*:snap-always sm:mx-0 sm:grid sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: 3 }, (_, i) => {
          const screen = screens?.[i];
          if (screen && tileBackground) {
            const tile = (key?: number) =>
              device === "browser" ? (
                <BrowserFrame
                  key={key}
                  image={screen.image}
                  background={tileBackground}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 44vw, 88vw"
                  className={`reveal ${BROWSER_TILE}`}
                />
              ) : (
                <PhoneFrame
                  key={key}
                  image={screen.image}
                  background={tileBackground}
                  sizes="(min-width: 1024px) 200px, 180px"
                  island={island}
                  className={`reveal ${TILE}`}
                />
              );
            if (!screen.title && !screen.description) return tile(i);
            return (
              <figure key={i}>
                {tile()}
                <figcaption className="mt-4 text-[14px] leading-snug tracking-[-0.01em]">
                  {screen.title && <span className="block font-medium text-ink">{screen.title}</span>}
                  {screen.description && <span className="mt-1 block text-mute">{screen.description}</span>}
                </figcaption>
              </figure>
            );
          }
          return (
            <ProjectMedia
              key={i}
              image={gallery?.[i]}
              accent={accent}
              label={placeholderLabel(i)}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              fit="contain"
              className={TILE}
            />
          );
        })}
      </div>
    </section>
  );
}
