# BloomCam

Premium landing page for BloomCam — a cinematic smart plant timelapse companion.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — UI motion & scroll reveals
- **GSAP** — ScrollTrigger text reveals
- **Lenis** — smooth scrolling
- **Radix UI** — accessible dialogs (shadcn-style)
- **Lucide** — icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/              # Layout, globals, home page
├── components/
│   ├── effects/      # Gradients, particles, grain
│   ├── layout/       # Navbar, footer
│   ├── product/      # Device SVG, phone mockups
│   ├── sections/     # Page sections (hero, gallery, etc.)
│   ├── shared/       # Reusable UI primitives
│   └── ui/           # shadcn-style base components
├── hooks/
└── lib/
```

## Design tokens

| Token     | Value     |
|-----------|-----------|
| Background| `#0F1720` |
| Surface   | `#1B2530` |
| Primary   | `#5E8B7E` |
| Accent    | `#A7C4A0` |
| Highlight | `#E7B66B` |

## Build

```bash
npm run build
npm start
```
