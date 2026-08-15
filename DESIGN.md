# Design Tokens

Direction: clean, modern, content-first — closer to a personal engineering
notebook than a template. Typography and whitespace carry the design; color
is used sparingly as an accent, not as decoration.

## Color

| Token          | Light         | Dark          | Usage                                     |
| -------------- | ------------- | ------------- | ----------------------------------------- |
| `background`   | `zinc-50`     | `#050807`     | Page background                           |
| `surface`      | `white`       | `zinc-950`    | Cards, section panels                     |
| `foreground`   | `zinc-950`    | `zinc-50`     | Primary text                              |
| `muted`        | `zinc-600`    | `zinc-400`    | Secondary text, captions, control borders |
| `border`       | `zinc-200`    | `zinc-800`    | Decorative dividers, card borders         |
| `accent`       | `emerald-600` | `emerald-400` | Links, CTAs, active nav state             |
| `accent-hover` | `emerald-700` | `emerald-300` | Hover state on solid accent buttons       |

Accent is a single hue used consistently for interactive elements only
(links, buttons, focus rings) — not for decoration, so it stays meaningful.

Dark-mode `background` is a tinted near-black (`#050807`), never pure `#000`
— a deliberate choice, not an oversight. `border` (zinc-200/800) is for
decorative dividers and card outlines only; interactive controls (buttons,
inputs, toggles) use `muted` for their resting-state border, since `border`
alone doesn't reliably clear the 3:1 non-text contrast floor for UI
components against the canvas.

## Typography

| Token        | Value                                                                                          | Usage                                                        |
| ------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `font-sans`  | Geist (already wired via `next/font`)                                                          | Body copy, UI                                                |
| `font-mono`  | Geist Mono (already wired)                                                                     | Code snippets, tech-stack tags                               |
| `text-scale` | `sm 0.875rem / base 1rem / lg 1.125rem / xl 1.25rem / 2xl 1.5rem / 3xl 1.875rem / 4xl 2.25rem` | Tailwind defaults, used as-is — no custom scale needed       |
| `leading`    | `snug` for headings, `relaxed` for body copy                                                   | Readability at content-heavy sections (Experience, Projects) |

## Spacing & Layout

| Token               | Value                                                  | Usage                                             |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------- |
| `content-max-width` | `max-w-3xl` (prose sections), `max-w-5xl` (page shell) | Keeps line length readable                        |
| `section-spacing`   | `py-24` between major sections                         | Clear visual separation without dividers          |
| `card-padding`      | `p-6`                                                  | Project cards, experience entries                 |
| `radius`            | `rounded-lg`                                           | Cards, buttons — soft, not sharp, not pill-shaped |

## Motion

Opacity/translate fade-in on scroll for section entrances, implemented via
a small `Reveal` component (`src/components/reveal.tsx`) wrapping an
`IntersectionObserver` hook (`src/hooks/use-in-view.ts`) — plain CSS
transitions, no animation library. Each section's entrance is staggered
(text before supporting content, cards cascading in sequence) rather than
firing all at once. No parallax, no decorative animation — keeps focus on
content and keeps Lighthouse performance scores high, which matters for the
Sprint 2 perf gate.

`prefers-reduced-motion: reduce` is handled entirely in CSS (`globals.css`),
so it responds live if the visitor toggles the OS setting mid-session, with
no JavaScript media-query listener required.

**The one signature element:** a vertical accent-colored line beside the
Experience list (`src/components/timeline-rail.tsx`) that draws downward
once, on scroll into view — a "verification track" running down the career
timeline. Ties to the site's underlying premise: precision and verification
(QA/Xray/Gherkin discipline, OWASP/API-security work, DevSecOps automation),
not decoration for its own sake.

## Section rhythm

No two adjacent sections share the same layout skeleton: Hero (photo +
text), About (2-col prose/card), Experience (timeline list), Projects (2-col
card grid), Skills (single-column divider list, not boxed cards — the
deliberate break from the card-grid pattern either side of it), Volunteer
(3-col card grid), Activity (live data widget — contribution heatmap with
month labels in the site's accent palette, plus a recent-activity feed and a
PR/review overview card, fetched server-side from GitHub's API), Contact
(2-col info/form).

## Notes

- Dark mode uses `next-themes`, driven by `prefers-color-scheme` with a
  manual toggle in the nav.
- No component library (no MUI/Chakra) — hand-built components on Tailwind
  utilities, matching the "not template-y" brief.
