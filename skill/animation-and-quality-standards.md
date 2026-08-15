# Animation Engineering and Quality Standards

Read this before writing any animation code for the portfolio build. Every rule here traces back to a real bug that shipped and got caught, or a real reason a site read as generic instead of custom. Use all of it, not just the parts that seem obviously relevant to the current task.

## Entrance animations

- **Never put a dynamic style on an element that also has a `forwards`-filling entrance animation.** The animation's final value wins permanently and silently overrides anything set after it. Put the entrance animation on the parent, the dynamic/interactive style on a child.
- **Prove cascade order, don't assume it.** A later, more specific CSS rule (a `:nth-child` selector, a utility class applied after) can silently override an animation's starting state so the element just appears with no entrance at all. When staggering a grid, if a "cleanup" rule zeroes a `transition-delay` after the stagger finishes, that cleanup rule must match or beat the specificity of the delay rules it's retiring, or later items in the grid will silently keep responding late to hover forever.
- **Animate only `transform` and `opacity`.** Anything that touches layout (`width`, `height`, `top`, `left`, `margin`) forces the browser to recalculate layout every frame and will read as janky on real devices, especially mid-range Android/Chrome. For a glow or shadow pulse, put the shadow on a pseudo-element at full strength and animate its opacity instead of animating the shadow value itself.
- **Give looping/ambient animations a negative delay** (e.g. `-1.2s`) so every loop is already mid-cycle at first paint instead of all starting from zero in visible unison.
- **Pause offscreen and hidden-tab animations.** Scope looping animation rules to a class an `IntersectionObserver` toggles when the element leaves the viewport. Separately, pause everything on a hidden browser tab with `visibilitychange`. Note: `animation-play-state` is **not an inherited CSS property** — setting it on a parent container silently never reaches children or pseudo-elements. The pattern that actually works everywhere:

```css
body.paused *,
body.paused *::before,
body.paused *::after {
  animation-play-state: paused !important;
}
```

## Reduced motion — honor it completely, and live

- On initial load with `prefers-reduced-motion: reduce`, show every choreographed element in its final, finished state immediately — no animation plays at all, nothing is "quick but still animated."
- Zero out every `transition-delay` under reduced motion, not just the animation durations.
- Watch out for a blanket `transform: none !important` under reduced motion — it can throw a mobile-positioned element (one that relies on a transform for its layout position, not just its motion) off-screen entirely. Re-apply positional transforms per breakpoint inside the reduced-motion block if any element depends on a transform for layout, not just animation.
- **Honor it live, in both directions**, by listening for the media query's `change` event — a visitor can toggle the OS setting mid-session:

```js
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
  if (e.matches)
    pinToFinalStates() // jump every scroll/entrance element to its end state, stop any JS-driven loops
  else applyMotionMode() // motion is back on: re-arm animations, remove the pinned classes/styles
})
```

Re-arming only the hero or only the top of the page while leaving the rest pinned is the half-fix that looks done in a quick check and isn't — verify the whole page responds, not just the first section.

## One signature interactive moment

Pick exactly one interaction that's designed, not decorative, and that says something about the person or their work — not a generic hover-card tilt copied from a template. Mechanics that make an interaction feel designed rather than gimmicky:

- Progress builds smoothly while the visitor holds/hovers/scrolls into it, rather than snapping instantly.
- Releasing or leaving early eases back down rather than resetting to zero abruptly.
- Completing it reveals or lights up real content in sequence, so the visitor's action earns something.
- Reduced motion gets the instant final state — no interaction required to see the content.

## Overflow and layout discipline

- `overflow-x: clip` on **both** `html` and `body`, with `hidden` declared first as a fallback for older browsers. `hidden` alone still allows script-driven horizontal scroll (e.g. a focused off-screen anchor target), which can leave the whole page shifted sideways.
- Masked or clipped text (an `overflow: hidden` reveal effect) needs em-based padding with a matching negative margin on the mask, or descenders on letters like g, y, p get visibly cut off.
- Never overwrite `element.style.transition` directly from JavaScript — it silently kills whatever transition was declared in CSS. Toggle a class that declares the full combined transition instead.
- Rows of mixed-size text (e.g. a label next to a large number) should align on the text baseline (`align-items: baseline`), not as centered boxes — centering reads as slightly "off" even when nothing is technically wrong.

## The quality floor (accessibility, SEO, correctness — every build, no exceptions)

- **Fonts:** trim to only the weights actually in use, with `<link rel="preconnect">` to the font host. Display face with real character, quiet body face, mono for small labels/code. Never Inter or Roboto as the display face — it's the fastest tell that a site defaulted instead of choosing.
- **Contrast:** compute it, don't eyeball it. 4.5:1 minimum for body text, 3:1 for large text and interactive/focus borders. Hairline border colors usually fail contrast for interactive elements — give those their own stronger color value.
- **Semantic landmarks:** `<nav>`, `<main id="main" tabindex="-1">`, `<footer>`, a skip-to-content link targeting `#main`, a real heading hierarchy (one `<h1>`, logically nested `<h2>`/`<h3>`), and `aria-hidden="true"` on purely decorative elements.
- **Focus states:** `:focus-visible` styled clearly in the accent color — never remove focus outlines without replacing them.
- **Touch targets:** at least 44px under `@media (pointer: coarse)`, added without breaking layout:

```css
@media (pointer: coarse) {
  .btn {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
```

Never swap an element's `display` type (e.g. to `inline-flex`) without re-declaring its alignment — a bare `display: inline-flex` can silently left-align previously centered button text and shrink a full-width row down to its text width.

- **Meta basics:** a real `<title>`, meta description, `theme-color`, and an inline SVG favicon.
- **`og:image` / `og:url`:** these need absolute URLs, which don't exist until the site is actually deployed. Leave a clearly marked `<!-- DEPLOY STEP -->` comment in the source and patch them with the live URL as the final deploy step, not before.
- **Canvas color:** never pure `#000` or `#fff` — tint it toward the palette's actual mood, even subtly.
- **No two adjacent sections share a layout skeleton.** If two neighboring sections both open with kicker → headline → grid over the same column structure, reshape one of them. Repeated skeletons are the single fastest visual tell of a templated build.

## The self-testing checklist (run before showing the user anything)

Audit adversarially — prove it, don't assume it:

1. Screenshot the built site at desktop size and at phone widths (check at minimum 1440×900 and 375×812).
2. Exercise every button and link. Submit the contact form and confirm its actual success/failure state, not just that it looks clickable.
3. Prove every entrance animation actually plays — cascade order can silently kill an entrance with no error and no visual sign anything is wrong.
4. Run with reduced motion **on** from page load: confirm every choreographed element shows its final state immediately and no JS-driven loop starts. Then flip reduced motion on **live** while the page is already open (not just before loading it) and confirm the page responds without needing a reload.
5. Try to force the page to scroll sideways: click through every anchor link, check wide decorative elements, check narrow (320–375px) viewports.
6. Check the browser console at both desktop and phone breakpoints: zero errors.
7. Check letter descenders (g, y, p) in any masked/clipped text at 100% zoom.
8. **The fresh-eyes pass, last.** Set the checklist down and look at the page as a first-time visitor with zero context. Does anything float unexplained? Does any section feel like filler or like a repeat of an earlier section with different words swapped in? Does the page read as built specifically for this one person's work, or could the layout be anyone's site with the text changed? This is a different check than the audit above, and it catches what the audit can't.

Report to the user what was found and what was fixed — they should never be the one who discovers the bugs.
