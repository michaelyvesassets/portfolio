/**
 * Cubic Bézier helpers for the hanging-cable showcase.
 *
 * B(t) = (1-t)³·P0 + 3(1-t)²t·P1 + 3(1-t)t²·P2 + t³·P3,  t ∈ [0, 1]
 *
 * The cable's control points are ordered left-to-right (P0.x < P1.x < P2.x < P3.x),
 * so B_x(t) is strictly increasing. That lets us invert x → t with bisection and
 * find the exact point on the curve where a vertical connector at x meets it.
 */

export type Point = { x: number; y: number };
export type CubicBezier = readonly [Point, Point, Point, Point];

function cubic(a: number, b: number, c: number, d: number, t: number) {
  const mt = 1 - t;
  return mt * mt * mt * a + 3 * mt * mt * t * b + 3 * mt * t * t * c + t * t * t * d;
}

export function pointAt([p0, p1, p2, p3]: CubicBezier, t: number): Point {
  return {
    x: cubic(p0.x, p1.x, p2.x, p3.x, t),
    y: cubic(p0.y, p1.y, p2.y, p3.y, t),
  };
}

/** Solve B_x(t) = x for t by bisection (x-monotonic curves only). */
export function tForX(curve: CubicBezier, x: number, iterations = 40): number {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < iterations; i++) {
    const mid = (lo + hi) / 2;
    if (pointAt(curve, mid).x < x) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** The point on the curve directly above/below a given x. */
export function pointAtX(curve: CubicBezier, x: number): Point {
  return pointAt(curve, tForX(curve, x));
}

export function toPathD([p0, p1, p2, p3]: CubicBezier): string {
  const f = (n: number) => n.toFixed(2);
  return `M ${f(p0.x)} ${f(p0.y)} C ${f(p1.x)} ${f(p1.y)}, ${f(p2.x)} ${f(p2.y)}, ${f(p3.x)} ${f(p3.y)}`;
}

/**
 * A symmetric "sagging cable" between two end points at the same height.
 * For a cubic whose inner control points both sit at y0 + h, the midpoint
 * drops by 0.75·h, so h = sag / 0.75 gives exactly `sag` px at the centre.
 */
export function saggingCable(x0: number, x1: number, y0: number, sag: number): CubicBezier {
  const span = x1 - x0;
  const h = sag / 0.75;
  return [
    { x: x0, y: y0 },
    { x: x0 + span / 3, y: y0 + h },
    { x: x1 - span / 3, y: y0 + h },
    { x: x1, y: y0 },
  ];
}
