---
name: cinematic-portfolio
description: Design and build (or refine) a personal developer portfolio site so it reads as cinematic, premium, and hand-crafted — not a plain template or an "AI made this" default. Use whenever the user is building, redesigning, or adding polish/motion/animation to a personal portfolio, resume site, or landing page, or says the current site looks "plain," "basic," "template-y," or that they want it to feel "cinematic," "premium," or "alive." Always run the design package step BEFORE writing code, and run the quality-gate checklist BEFORE showing the result.
---

# Cinematic Portfolio

A workflow for taking a portfolio site from "functional but plain" to "cinematic and custom." It borrows its design discipline and animation engineering standard from a proven scroll-cinematic marketing-site skill, adapted for a personal developer portfolio built with standard web tooling (React/Next.js/Tailwind/Framer Motion, or plain HTML/CSS/JS) — no AI video generation pipeline required. An optional path to a full AI-generated scroll-video hero is included at the end for later, if the user wants to go further.

**The core discipline, in one line:** plan every design decision in writing before generating anything, then hold the build to a strict engineering and accessibility floor, then adversarially test it before the user ever sees it. Skipping straight to code is the single biggest cause of a portfolio looking generic.

## When this skill applies

- Building a new portfolio from scratch.
- Refining an existing portfolio that currently reads as plain, template-driven, or default-feeling.
- Adding scroll animation, entrance motion, or a "signature moment" to an existing site.
- Any request that mentions the site looking cinematic, premium, alive, polished, custom, or "not plain."

## Phase 0 — Gather the real inputs

Before any design decisions, collect:

1. **Content source of truth.** The user's resume/CV, existing site copy, and project list. Never invent experience, projects, or metrics. If a `BACKLOG.md` or sprint plan already exists in the repo, read it first — this skill produces the design/build artifacts that plan expects.
2. **Current state.** If a site already exists, read it (fetch the live URL or read the repo) and note specifically what makes it feel plain: is it a stock template layout? No motion at all? Generic palette? Same section skeleton repeated? Name the actual problem, don't guess.
3. **Stack.** Confirm what the user is building with (Next.js/React/Tailwind/Framer Motion is the common case for a dev portfolio). This skill's animation rules are framework-agnostic — CSS transforms/opacity plus an IntersectionObserver work anywhere — but examples below assume Framer Motion where relevant.
4. **Any personal photo(s)** the user wants used. Only ever use a photo of the user themselves, or someone who has explicitly agreed to appear on the site. Never generate a likeness of anyone else without asking first.

## Phase 1 — The Design Package (write this before generating anything)

One short document, agreed with the user before any code or asset is produced. See `references/design-package-template.md` for the fillable structure. It covers:

- **The personal brand premise.** One idea pulled from the user's _real_ work — not a generic "passionate developer" line. For a security/QA-minded engineer, the premise might be built around precision, resilience, or "breaking things safely." Everything on the page should serve this one idea; if a section doesn't serve it, cut it or reshape it.
- **Palette as CSS custom properties.** Named roles (`--canvas`, `--panel`, `--accent`, `--accent-hover`, `--accent-muted`, `--text-primary`, `--text-secondary`), never pure `#000`/`#fff` for the canvas.
- **The type trio.** A display face with real character, a quiet body face, a mono for labels/code snippets. **Never Inter or Roboto as the display face** — pick something with personality, or the site defaults to looking like every other AI-assisted build.
- **The section map.** Every section in order, each with: its role in the story, its layout shape, and its entrance treatment. Explicitly check that no two adjacent sections share the same layout skeleton (kicker → headline → grid, repeated back-to-back, is the #1 tell of a templated build).
- **The one signature element.** Pick exactly one thing unique to this build — an interaction, a motif, a piece of custom SVG — and spend the polish budget there. Test it: if you removed it, would the page meaningfully change? If not, it isn't a signature, pick something bolder.
- **The copy gate.** All body copy ships as written in this document, verbatim, in the build phase — the build wires it in, it doesn't paraphrase it.

## Phase 2 — Ban the "AI made this" defaults

Unless the user's actual brand/work genuinely calls for it, avoid reaching for these as defaults — they're the fastest way for a portfolio to look like every other generated site:

- Cream canvas + serif + terracotta accent
- Near-black + acid-green
- Near-black + warm amber accent + high-contrast serif (the reflex choice whenever a brief says "dark" or "cinematic" — deliberately pick something else)
- Hairline-border brutalism as a default reach

If the user explicitly asks for one of these, or it's genuinely native to their subject matter, that's fine — the point is to earn it deliberately, not default to it.

## Phase 3 — Animation engineering standard

Read `references/animation-and-quality-standards.md` before writing any animation code. It covers, in detail: entrance-animation cascade pitfalls, the "animate only transform/opacity" rule, reduced-motion handling (both directions, live), the one-interactive-moment pattern, overflow discipline, and the full accessibility/SEO quality floor (contrast, semantic landmarks, focus states, touch targets, meta tags). These are hard-won rules from real shipped bugs — follow all of them, not just the ones that seem obviously relevant.

Short version of the highest-value rules, if reading the reference file isn't possible right now:

- Animate `transform` and `opacity` only — never `top`/`left`/`width`/`height` — or scroll performance degrades on real devices.
- Every entrance animation needs its cascade-order proven, not assumed: a later CSS rule can silently override an animation's starting state.
- Honor `prefers-reduced-motion` completely, and honor it _live_ (listen for the media query's change event, not just at page load) — someone can toggle it mid-session.
- One signature interactive moment per site, not several competing for attention.
- `overflow-x: clip` on both `html` and `body` so no decoration or anchor link can ever shift the page sideways.

## Phase 4 — Build

With the design package agreed and the engineering standard loaded, build section by section:

1. Scaffold structure and design tokens (palette, type) first.
2. Build sections in story order, wiring in the copy from the design package verbatim.
3. Add entrance animations per the section map, then the one signature interactive moment.
4. Wire reduced-motion handling last, and verify it in both directions before moving on.

Never show the user a build that hasn't passed Phase 5.

## Phase 5 — The quality gate (run before showing the user anything)

Audit adversarially — prove it, don't assume it:

1. Screenshot at desktop (1440×900) and phone (375×812) widths.
2. Exercise every link, button, and the contact form; confirm the form's actual success/failure state.
3. Prove every entrance animation actually plays (cascade order kills these silently — check, don't assume).
4. Run with reduced motion **on**: verify final states show immediately, nothing pinned mid-animation. Then flip it on live while the page is already open, and confirm the page responds without a reload.
5. Check color contrast against the real palette values: 4.5:1 for body text, 3:1 for large text and interactive borders.
6. Check the browser console at both breakpoints: zero errors.
7. Try to force the page to scroll sideways (anchor links, wide decorative elements, narrow viewports).
8. **The fresh-eyes pass, last.** Set the checklist down and look at the page as a first-time visitor with zero context. Does anything float unexplained? Does any section feel like filler, or like the same section repeated with different words? Does it read as built specifically for this one person, or could the same layout be anyone's site with the text swapped? Fix what the fresh eye catches — this is a different check than the audit above and it catches what the audit can't.

Report to the user what you found and fixed. They should never be the one who finds the bugs.

## Optional: going further with a scroll-scrubbed hero video

If the user wants to push past CSS/Framer Motion animation into a genuine AI-generated, scroll-scrubbed cinematic hero (the kind used on high-end product marketing sites), that's a substantially bigger undertaking: it requires an AI video generation connector (with real per-generation cost), `ffmpeg` processing, and a specific JavaScript playback architecture (Blob-fetched video, scroll-mapped `currentTime`, caption-band pacing, a static-image fallback for phones and reduced motion).

Don't reach for this by default for a portfolio — it's built for marketing landing pages, and a personal dev portfolio rarely needs it. If the user specifically asks for a scroll-video hero and understands the cost/complexity tradeoff, the full engineering standard, ffmpeg recipes, prompt-construction laws, and troubleshooting guide for that path are documented separately and can be pulled in as their own reference set at that point — treat it as a distinct, opt-in extension of this skill rather than the default path.
