"use client";

import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
  type PanInfo,
} from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProjectMedia } from "@/components/ProjectMedia";
import { pointAtX, saggingCable, toPathD, type CubicBezier, type Point } from "@/lib/bezier";
import type { Project } from "@/lib/projects";

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

/** Connector length per card as a fraction of card width — the staggered drop from the Figma. */
const DROP_RATIO = [0.6, 0.26, 0.66, 0.44];
/** Sway amplitude (deg) and period (s) per card, deliberately out of phase. */
const SWAY = [
  { amp: 1.1, period: 6.4, delay: 0 },
  { amp: 0.8, period: 7.3, delay: 0.9 },
  { amp: 1.2, period: 5.8, delay: 0.4 },
  { amp: 0.9, period: 6.9, delay: 1.3 },
];
/**
 * Scroll response per card.
 * - swing: multiplier on the shared scroll-velocity swing (deg), so cards don't move in lockstep.
 * - drift: px the connector lengthens (entering) / shortens (leaving) as the section scrolls past.
 */
const SCROLL = [
  { swing: 1, drift: 16 },
  { swing: 0.8, drift: 26 },
  { swing: 1.15, drift: 20 },
  { swing: 0.9, drift: 30 },
];
/** Max swing from scrolling, in degrees — enough to feel physical, never wild. */
const MAX_SCROLL_SWING = 3.5;
const CABLE_TOP = 22;
const FALLBACK_WIDTH = 1280;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

type Layout = {
  width: number;
  trackWidth: number;
  cardW: number;
  cardH: number;
  curve: CubicBezier;
  anchors: Point[];
  drops: number[];
  height: number;
  maxOffset: number;
};

function computeLayout(width: number, count: number): Layout {
  const perView = width >= 1120 ? 4 : width >= 820 ? 3 : width >= 540 ? 2 : 1.18;
  const step = width / perView;
  const cardW = Math.round(Math.min(step * 0.84, 312));
  const cardH = Math.round(cardW * 1.24);
  const trackWidth = step * count;

  // Hanging points are evenly spaced along x…
  const xs = Array.from({ length: count }, (_, i) => step * (i + 0.5));
  // …the cable runs a little past the outer cards and sags with its length…
  const overhang = Math.min(step * 0.32, 96);
  const sag = clamp(trackWidth * 0.028, 12, 46);
  const curve = saggingCable(xs[0] - overhang, xs[count - 1] + overhang, CABLE_TOP, sag);
  // …and each connector starts exactly on the curve: solve B_x(t) = x, then take B_y(t).
  const anchors = xs.map((x) => pointAtX(curve, x));

  // Shorter drops on small screens keep the section compact.
  const dropScale = perView < 2 ? 0.55 : 1;
  const drops = anchors.map((_, i) => Math.round(cardW * DROP_RATIO[i % DROP_RATIO.length] * dropScale) + 18);
  const height = Math.ceil(Math.max(...anchors.map((a, i) => a.y + drops[i] + cardH)) + 56);

  return {
    width,
    trackWidth,
    cardW,
    cardH,
    curve,
    anchors,
    drops,
    height,
    maxOffset: Math.max(0, trackWidth - width),
  };
}

/** Track offset that brings card i into view (centred where possible). */
function offsetFor(layout: Layout, i: number) {
  return clamp(layout.anchors[i].x - layout.width / 2, 0, layout.maxOffset);
}

/* ------------------------------------------------------------------ */
/* Showcase                                                            */
/* ------------------------------------------------------------------ */

export function HangingShowcase({ projects }: { projects: Project[] }) {
  const count = projects.length;
  const reduce = useReducedMotion() ?? false;

  const viewportRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dragged = useRef(false);

  const [measured, setMeasured] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);

  const layout = useMemo(() => computeLayout(measured ?? FALLBACK_WIDTH, count), [measured, count]);
  const x = useMotionValue(0);

  /* Scroll physics (all motion values: no React re-renders while scrolling). */
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Scroll speed → swing angle. Scrolling down tilts cards back, like a hanging sign
  // that lags behind the movement; the under-damped spring lets it settle with a small sway.
  const scrollVelocity = useVelocity(scrollY);
  const swingTarget = useTransform(scrollVelocity, [-2600, 0, 2600], [MAX_SCROLL_SWING, 0, -MAX_SCROLL_SWING], {
    clamp: true,
  });
  const swing = useSpring(swingTarget, { stiffness: 110, damping: 9, mass: 0.9 });
  // Section position in the viewport: -1 entering at the bottom, 0 centred, 1 leaving at the top.
  const progress = useTransform(scrollYProgress, [0, 1], [-1, 1]);

  // Recompute geometry whenever the available width changes.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setMeasured(Math.round(entry.contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const slideTo = useCallback(
    (i: number) => {
      const target = -offsetFor(layout, i);
      if (reduce) x.set(target);
      else animate(x, target, { type: "spring", stiffness: 260, damping: 34, mass: 0.9 });
    },
    [layout, reduce, x],
  );

  // Keep the track aligned with the active card (also re-snaps on resize).
  useEffect(() => {
    slideTo(active);
  }, [active, slideTo]);

  const goTo = useCallback(
    (i: number, focus = false) => {
      const next = clamp(i, 0, count - 1);
      setInteracted(true);
      setActive(next);
      if (focus) linkRefs.current[next]?.focus({ preventScroll: true });
    },
    [count],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: count - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      goTo(map[e.key], true);
    }
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const projected = x.get() + info.velocity.x * 0.2;
    const centre = -projected + layout.width / 2;
    let nearest = 0;
    layout.anchors.forEach((a, i) => {
      if (Math.abs(a.x - centre) < Math.abs(layout.anchors[nearest].x - centre)) nearest = i;
    });
    setInteracted(true);
    if (nearest === active) slideTo(nearest);
    else setActive(nearest);
    // Let the click that follows pointerup see the drag, then reset.
    setTimeout(() => (dragged.current = false), 0);
  };

  const canDrag = layout.maxOffset > 0;

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Selected work"
      className="relative"
    >
      <div
        ref={viewportRef}
        onKeyDown={onKeyDown}
        // Always visible: the server-rendered fallback layout shows the cards even
        // if JavaScript never runs; measurement only refines the geometry.
        className="relative"
        style={{ height: layout.height, overflowX: "clip" }}
      >
        <motion.div
          className={`absolute left-0 top-0 h-full ${canDrag ? "cursor-grab active:cursor-grabbing" : ""}`}
          style={{ x, width: layout.trackWidth, touchAction: "pan-y" }}
          drag={canDrag ? "x" : false}
          dragConstraints={{ left: -layout.maxOffset, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragStart={() => (dragged.current = true)}
          onDragEnd={onDragEnd}
        >
          <Cable layout={layout} />

          {projects.map((project, i) => (
            <Hanger
              key={project.slug}
              project={project}
              index={i}
              count={count}
              anchor={layout.anchors[i]}
              drop={layout.drops[i]}
              cardW={layout.cardW}
              cardH={layout.cardH}
              reduce={reduce}
              swing={swing}
              progress={progress}
              highlighted={interacted && i === active}
              linkRef={(el) => {
                linkRefs.current[i] = el;
              }}
              onFocus={() => {
                if (i !== active) setActive(i);
              }}
              onClick={(e) => {
                if (dragged.current) e.preventDefault();
              }}
            />
          ))}
        </motion.div>
      </div>

      <Controls
        projects={projects}
        active={active}
        onSelect={(i) => goTo(i)}
      />

      <p aria-live="polite" className="sr-only">
        {interacted ? `Project ${active + 1} of ${count}: ${projects[active].name}` : ""}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cable                                                               */
/* ------------------------------------------------------------------ */

function Cable({ layout }: { layout: Layout }) {
  const [start, , , end] = layout.curve;
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 overflow-visible"
      width={layout.trackWidth}
      height={layout.height}
      viewBox={`0 0 ${layout.trackWidth} ${layout.height}`}
    >
      <path
        d={toPathD(layout.curve)}
        fill="none"
        stroke="var(--color-cable)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {[start, end].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="var(--color-cable)" />
      ))}
      {layout.anchors.map((a, i) => (
        <circle key={i} cx={a.x} cy={a.y} r={4.5} fill="#d6d6da" stroke="#fff" strokeWidth={1.5} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Hanger: connector + card, swaying around its anchor on the cable    */
/* ------------------------------------------------------------------ */

type HangerProps = {
  project: Project;
  index: number;
  count: number;
  anchor: Point;
  drop: number;
  cardW: number;
  cardH: number;
  reduce: boolean;
  /** Shared scroll-velocity swing in degrees. */
  swing: MotionValue<number>;
  /** Section position in the viewport, -1 (entering) → 1 (leaving). */
  progress: MotionValue<number>;
  highlighted: boolean;
  linkRef: (el: HTMLAnchorElement | null) => void;
  onFocus: () => void;
  onClick: (e: React.MouseEvent) => void;
};

const LIFT = 12;
const MIN_CONNECTOR = 10;

function Hanger({
  project,
  index,
  count,
  anchor,
  drop,
  cardW,
  cardH,
  reduce,
  swing,
  progress,
  highlighted,
  linkRef,
  onFocus,
  onClick,
}: HangerProps) {
  const [hot, setHot] = useState(false);
  const sway = SWAY[index % SWAY.length];
  const scroll = SCROLL[index % SCROLL.length];
  const raised = hot || highlighted;
  const isConcept = project.status === "concept";

  const titleSize = clamp(cardW * 0.068, 15, 21);
  const metaSize = clamp(cardW * 0.046, 12, 14);

  // Connector length = designed drop − scroll drift − hover lift. Every input is a
  // motion value, so scrolling and hovering compose without re-rendering React.
  const dropMV = useMotionValue(drop);
  // Start from the same value as the server render (which can't know the user's
  // motion preference); the effect below zeroes it for reduced motion after hydration.
  const driftAmp = useMotionValue(scroll.drift);
  const lift = useSpring(0, { stiffness: 320, damping: 22 });
  useEffect(() => {
    dropMV.set(drop);
    driftAmp.set(reduce ? 0 : scroll.drift);
    const target = raised ? LIFT : 0;
    if (reduce) lift.jump(target);
    else lift.set(target);
  }, [drop, reduce, raised, scroll.drift, dropMV, driftAmp, lift]);

  const connector = useTransform([dropMV, progress, driftAmp, lift], ([d, p, a, l]: number[]) =>
    Math.max(MIN_CONNECTOR, d - p * a - l),
  );
  const scrollSwing = useTransform(swing, (deg) => (reduce ? 0 : deg * scroll.swing));

  return (
    <motion.div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${count}`}
      className="absolute"
      // Both rotations pivot on the exact point where the connector meets the cable,
      // so the card can swing freely without ever detaching from it.
      style={{
        left: anchor.x - cardW / 2,
        top: anchor.y,
        width: cardW,
        transformOrigin: "50% 0%",
        rotate: scrollSwing,
      }}
    >
      <motion.div
        style={{ transformOrigin: "50% 0%" }}
        animate={reduce ? { rotate: 0 } : { rotate: [0, sway.amp, 0, -sway.amp, 0] }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration: sway.period, delay: sway.delay, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Connector: its length carries the scroll drift and the hover lift. */}
        <motion.div aria-hidden className="mx-auto w-[1.5px] bg-cable" style={{ height: connector }} />

        <motion.div
          initial={false}
          animate={{ rotate: hot && !reduce ? (index % 2 ? 0.9 : -0.9) : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          style={{ transformOrigin: "50% 0%" }}
        >
          <Link
            ref={linkRef}
            href={`/work/${project.slug}`}
            draggable={false}
            onClick={onClick}
            onFocus={() => {
              setHot(true);
              onFocus();
            }}
            onBlur={() => setHot(false)}
            onMouseEnter={() => setHot(true)}
            onMouseLeave={() => setHot(false)}
            className="group relative flex select-none flex-col rounded-[26px] bg-white p-[7%] transition-shadow duration-300 focus-visible:outline-offset-4"
            style={{
              height: cardH,
              border: `1.5px solid ${project.accent}`,
              boxShadow: raised
                ? `0 28px 50px -24px ${project.accent}55, 0 10px 24px -14px rgba(10,10,12,0.18)`
                : "0 14px 30px -26px rgba(10,10,12,0.25)",
            }}
          >
            {/* Pin where the connector clips onto the card */}
            <span
              aria-hidden
              className="absolute left-1/2 top-0 size-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6d6da] ring-[3px] ring-white"
            />

            <ProjectMedia
              image={project.cover}
              accent={project.accent}
              label="Cover image"
              sizes={`${cardW}px`}
              compact
              className="aspect-[1.3] w-full shrink-0 rounded-[20px]"
            />

            <div className="mt-[7%] flex min-h-0 flex-1 flex-col">
              <h3
                className="font-semibold leading-[1.1] tracking-[-0.045em] text-ink"
                style={{ fontSize: titleSize }}
              >
                {project.cardTitle}
              </h3>
              <p
                className="mt-1.5 line-clamp-2 leading-snug tracking-[-0.01em] text-mute"
                style={{ fontSize: metaSize }}
              >
                {project.summary}
              </p>

              <div className="mt-auto flex items-center justify-between pt-2">
                {isConcept ? (
                  <span
                    className="rounded-full px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.08em]"
                    style={{ background: `${project.accent}1a`, color: project.accent }}
                  >
                    {project.statusLabel}
                  </span>
                ) : (
                  <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-mute">
                    Case study
                  </span>
                )}
                <span
                  aria-hidden
                  className="flex size-7 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-transparent group-hover:text-white group-focus-visible:border-transparent group-focus-visible:text-white"
                  style={{ background: hot ? project.accent : "transparent" }}
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Controls: prev / dots / next                                        */
/* ------------------------------------------------------------------ */

function Controls({
  projects,
  active,
  onSelect,
}: {
  projects: Project[];
  active: number;
  onSelect: (i: number) => void;
}) {
  const last = projects.length - 1;
  const arrowClass =
    "flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line";

  return (
    <div className="mt-2 flex items-center justify-center gap-5">
      <button
        type="button"
        onClick={() => onSelect(active - 1)}
        disabled={active === 0}
        aria-label="Previous project"
        className={arrowClass}
      >
        <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M8.5 3L4.5 7l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul className="flex items-center gap-2" aria-label="Choose a project">
        {projects.map((p, i) => {
          const on = i === active;
          return (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`Show project ${i + 1}: ${p.name}`}
                aria-current={on ? "true" : undefined}
                className="group flex h-6 items-center px-1"
              >
                <span
                  className="block h-2 rounded-full transition-all duration-300"
                  style={{
                    width: on ? 28 : 8,
                    background: on ? p.accent : "#d9d9dd",
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => onSelect(active + 1)}
        disabled={active === last}
        aria-label="Next project"
        className={arrowClass}
      >
        <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
