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
| `src/components/ProjectPhoneHero.tsx`, `ProjectBrowserHero.tsx` | Case-study heroes (iPhone / browser mockups) |
| `src/components/ProjectKeyScreens.tsx` | Key screens section (grid on desktop, swipeable row on phones) |
| `src/components/MobileNav.tsx` | Phone navigation (below 640px) |
| `src/lib/bezier.ts` | Cubic Bézier evaluation and x→t inversion for anchor points |
| `src/lib/projects.ts` | All project content |
| `src/lib/site.ts` | Contact email |
| `public/projects/` | Project images (cleaned/cropped screens live in each project's `screens/` folder) |

## Updating content

All project content lives in `src/lib/projects.ts`. Nothing is invented: a project without images falls
back to a clearly labelled placeholder.

- **Case-study screens:** add images to `public/projects/` and list them under the project's `showcase`
  (`screens`, colours, and `device: "browser"` for websites) with their real `width`/`height`.
  They are served through `next/image`.
- **Header metadata:** `details` (category, platform, role, year, status).
- **Case-study copy:** `caseStudy.challenge` / `process` / `outcome`, one string per paragraph.
- **Contact:** the email in `src/lib/site.ts`.

## How the hanging cable works

The cable is a cubic Bézier `B(t)` whose end points sit at the same height and whose two inner control
points share a lower y. With that setup the midpoint drops by `0.75·h`, which sets the sag. The control
points run left to right, so `B_x(t)` is monotonic. Each card's anchor x is therefore inverted to `t` by
bisection, and the connector starts at `B(t)`, exactly on the curve. Geometry is recomputed from a
`ResizeObserver`. Each card sways by rotating around that anchor point, so the connector stays attached
while it moves.
