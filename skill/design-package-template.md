# Design Package Template (fill this in with the user, before any code)

Write this out completely and get the user's agreement before generating anything. It's the single reference the build phase needs — nothing should get decided ad hoc mid-build that isn't already settled here.

**Two rules:**

- Every line of copy written here ships verbatim in the build. This document is where the writing happens; the build is where the wiring happens.
- Numbers (palette values, spacing, animation timings) are starting points — refine them once real content and assets are in place, but don't skip naming a starting point.

## 1. The personal brand premise

One short paragraph, built on one real, specific idea pulled from the person's actual work — not a generic "passionate developer" line. Every section, the signature interactive moment, and the closing call-to-action should serve this one idea. If a section doesn't serve it, cut it or reshape it.

_Example direction for a security/QA-minded engineer: precision, resilience under scrutiny, "breaking things safely to make them stronger."_

## 2. The palette as CSS tokens

```css
:root {
  --canvas: #___; /* page background — never pure black or white */
  --panel: #___; /* cards and raised surfaces */
  --accent: #___; /* CTA and rare emphasis only */
  --accent-hover: #___;
  --accent-muted: #___; /* accent at whisper level: borders, subtle glows */
  --text-primary: #___;
  --text-secondary: #___;
}
```

## 3. The type trio

- **Display:** ___ (weights used: ___) — never Inter or Roboto here.
- **Body:** ___ (weights used: ___)
- **Mono** (for labels, tech stack tags, code snippets): ___

## 4. The section map

One row per section, in page order:

| Section                 | Role in the story | Layout shape | Entrance treatment |
| ----------------------- | ----------------- | ------------ | ------------------ |
| Hero                    | ...               | ...          | ...                |
| About                   | ...               | ...          | ...                |
| Experience              | ...               | ...          | ...                |
| Projects                | ...               | ...          | ...                |
| Skills                  | ...               | ...          | ...                |
| Leadership/Volunteering | ...               | ...          | ...                |
| Contact                 | ...               | ...          | ...                |

Check explicitly: no two adjacent rows share the same layout shape.

## 5. The one signature element

Name it, and describe exactly how it behaves and where it lives on the page. Then answer: if this were removed, would the page meaningfully change? If not, pick something bolder.

## 6. Section-by-section copy (verbatim)

For each section in the map above, the exact final copy: headlines, sublines, project descriptions, CTA labels, contact form microcopy (labels, placeholder text, button label, success/error states). Pull factual content (roles, dates, project details, metrics) directly from the resume/CV — never invent or embellish.

## 7. The interaction/animation notes

- Entrance style per section (fade+rise, mask reveal, stagger, etc.) and the approximate distance/duration.
- Any scroll-linked effects beyond simple entrances (parallax, progress indicators, etc.), and confirmation each one degrades cleanly under reduced motion.

## 8. The copy gate

End the package with this line, restated so the build phase inherits it: every viewer-facing line above ships verbatim, and the finished build must pass the quality gate in `animation-and-quality-standards.md` before the user sees it.
