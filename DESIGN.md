# Design Tokens

Direction: clean, modern, content-first — closer to a personal engineering
notebook than a template. Typography and whitespace carry the design; color
is used sparingly as an accent, not as decoration.

## Color

| Token | Light | Dark | Usage |
|---|---|---|---|
| `background` | `zinc-50` | `black` | Page background |
| `surface` | `white` | `zinc-950` | Cards, section panels |
| `foreground` | `zinc-950` | `zinc-50` | Primary text |
| `muted` | `zinc-600` | `zinc-400` | Secondary text, captions |
| `border` | `zinc-200` | `zinc-800` | Dividers, card borders |
| `accent` | `emerald-600` | `emerald-400` | Links, CTAs, active nav state |

Accent is a single hue used consistently for interactive elements only
(links, buttons, focus rings) — not for decoration, so it stays meaningful.

## Typography

| Token | Value | Usage |
|---|---|---|
| `font-sans` | Geist (already wired via `next/font`) | Body copy, UI |
| `font-mono` | Geist Mono (already wired) | Code snippets, tech-stack tags |
| `text-scale` | `sm 0.875rem / base 1rem / lg 1.125rem / xl 1.25rem / 2xl 1.5rem / 3xl 1.875rem / 4xl 2.25rem` | Tailwind defaults, used as-is — no custom scale needed |
| `leading` | `snug` for headings, `relaxed` for body copy | Readability at content-heavy sections (Experience, Projects) |

## Spacing & Layout

| Token | Value | Usage |
|---|---|---|
| `content-max-width` | `max-w-3xl` (prose sections), `max-w-5xl` (page shell) | Keeps line length readable |
| `section-spacing` | `py-24` between major sections | Clear visual separation without dividers |
| `card-padding` | `p-6` | Project cards, experience entries |
| `radius` | `rounded-lg` | Cards, buttons — soft, not sharp, not pill-shaped |

## Motion

Minimal. Opacity/translate fade-in on scroll for section entrances only
(no parallax, no decorative animation) — keeps focus on content and keeps
Lighthouse performance scores high, which matters for the Sprint 2 perf gate.

## Notes

- Dark mode uses `next-themes` (to be added in Sprint 1) driven by
  `prefers-color-scheme`, with a manual toggle.
- No component library (no MUI/Chakra) — hand-built components on Tailwind
  utilities, matching the "not template-y" brief.
