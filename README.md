# Cue Kit

A production-ready marketing site and interactive tool for **Cue Kit**, a mental performance system for college volleyball athletes.

## What it is

Cue Kit helps athletes convert post-match reflections into color-coded focus cues they can wear on court via colored shoe straps. The site includes a fully interactive Cue Plan Builder that generates a personalized mental performance plan from journal scores—no backend or login required.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, problem framing, 3-step explainer, cue color overview, persona snippet, CTA |
| `/about` | About — research basis, three insight pillars, technique reference with `#techniques` anchor |
| `/cue-plan` | Cue Plan Builder — interactive multi-step form that generates a personalized cue plan |

## Tech stack

- **Framework**: TanStack Start (React 19, TanStack Router v1)
- **Build**: Vite 7
- **Styling**: Tailwind CSS 4 with custom brand design tokens
- **Icons**: Lucide React
- **Language**: TypeScript 5.7 (strict mode)
- **Deployment**: Netlify

## Running locally

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`. If using the Netlify CLI for full platform emulation:

```bash
netlify dev
```

This runs at `http://localhost:8888`.

## Brand colors

| Token | Hex | Use |
|-------|-----|-----|
| Deep Blue | `#1E6FD8` | Primary brand, links, step indicators |
| Dark Navy | `#0C1B3A` | Headings, dark sections |
| Orange | `#F4A328` | Primary buttons, Self-Talk cue |
| Yellow | `#F5C842` | Imagery cue |
| Purple | `#5B3BAE` | Focus Cues |
| Black | `#222222` | Muscle Relaxation cue |
| Light Gray | `#F5F7FB` | Section backgrounds |
