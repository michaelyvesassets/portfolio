# Michael — Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion for React.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Structure

| Path | What |
| --- | --- |
| `src/app/page.tsx` | Home: hero, hanging project showcase, project index |
| `src/app/work/[slug]/page.tsx` | Case-study template (Meza, Flora Website, UFAILD, Flora App concept) |
| `src/app/about`, `src/app/contact` | About and Contact |
| `src/components/HangingShowcase.tsx` | Bézier cable, hanging cards, sway, carousel, controls |
| `src/lib/bezier.ts` | Cubic Bézier evaluation and x→t inversion for anchor points |
| `src/lib/projects.ts` | All project content |
| `src/lib/site.ts` | Contact email and social links |
| `public/references/` | Figma and Pinterest design references |

## Adding real content

Anything not yet confirmed renders as a labelled **placeholder**. Nothing is invented.

- **Screenshots:** put files in `public/projects/<slug>/` and set `cover` / `gallery` on the project in
  `src/lib/projects.ts` with the image's real `width`/`height`. They are served through `next/image`.
- **Role / year:** set `role` and `year` on the project.
- **Case-study copy:** replace the placeholder sections in `src/app/work/[slug]/page.tsx`.
- **Contact:** set `email` and link `href`s in `src/lib/site.ts`.

## How the hanging cable works

The cable is a cubic Bézier `B(t)` whose end points sit at the same height and whose two inner control
points share a lower y. With that setup the midpoint drops by `0.75·h`, which sets the sag. The control
points run left to right, so `B_x(t)` is monotonic. Each card's anchor x is therefore inverted to `t` by
bisection, and the connector starts at `B(t)`, exactly on the curve. Geometry is recomputed from a
`ResizeObserver`. Each card sways by rotating around that anchor point, so the connector stays attached
while it moves.
