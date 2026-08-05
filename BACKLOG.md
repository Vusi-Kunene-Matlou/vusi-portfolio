## Epic: Portfolio Rebuild
Ship a from-scratch, professionally engineered developer portfolio deployed to
vusikunenematlou.co.za via Vercel, with a real backlog, CI/CD, and automated test suite.

## Sprint 0: Foundations & Process
**Goal:** Repo, tooling, CI, and process docs exist and pass CI — before any page content is written.

| ID | Title | Description | Acceptance Criteria | Points | Status |
|---|---|---|---|---|---|
| PORT-1 | Scaffold Next.js + TypeScript + Tailwind repo | Init project with App Router, TS strict mode, Tailwind configured | `npm run dev` serves a page; `npm run build` passes; TS strict mode on | 2 | Done |
| PORT-2 | Configure ESLint + Prettier | Shared lint/format config committed | `npm run lint` and `npm run format:check` pass on a clean checkout | 1 | Done |
| PORT-3 | GitHub Actions CI pipeline | Workflow runs format check, lint, typecheck, unit tests, build, and E2E on every PR | PR is blocked from merging if any step fails | 2 | Done |
| PORT-4 | Jest + RTL test skeleton | Test runner configured with one smoke test | `npm test` runs and passes in CI | 2 | Done |
| PORT-5 | Playwright E2E skeleton | Playwright configured against a production build, one smoke spec | `npm run test:e2e` passes locally and in CI | 3 | Done |
| PORT-6 | Connect repo to Vercel | Link GitHub repo to Vercel project | Opening a PR produces a working Vercel preview URL | 1 | Todo (needs GitHub remote + Vercel account access) |
| PORT-7 | Define design tokens | Colors, type scale, spacing documented, inspired by emmabostian standouts | `DESIGN.md` committed with tokens | 2 | Done |
| PORT-8 | Write product brief | One-page epic description | `PRODUCT_BRIEF.md` committed at repo root | 1 | Done |
| PORT-9 | Commit initial BACKLOG.md | This file, tracked as source of truth | File committed, Sprint 0/1 tickets present | 1 | Done |
| PORT-10 | Architecture/deployment diagram | Simple diagram: GitHub → Actions → Vercel → GoDaddy DNS | Diagram committed to `/docs` or README | 2 | Done |

## Sprint 1: Core Site
**Goal:** All core sections are built from real resume content, fully responsive, and CI is green.

| ID | Title | Description | Acceptance Criteria | Points | Status |
|---|---|---|---|---|---|
| PORT-11 | Responsive layout shell | Nav, footer, base layout, dark/light theme | Layout renders correctly at mobile/tablet/desktop breakpoints | 3 | Todo |
| PORT-12 | Hero/Home section | Name, title, summary, primary CTA | Content matches resume summary; no placeholder copy | 2 | Todo |
| PORT-13 | About section | Summary, education, certifications | Eduvos BSc CS + Golden Key/FNB APP Academy shown accurately | 2 | Todo |
| PORT-14 | Experience section | BMW Group, TMS Dynamics, Robinson Liquors, driven by a typed data file | All three roles rendered with accurate dates/bullets from resume | 3 | Todo |
| PORT-15 | Projects section | Dermaglare, API Security Scanner, UBUNTU Verse with stack tags + links | Each project shows stack, description, and live/GitHub link where available | 3 | Todo |
| PORT-16 | Skills section | Languages, frameworks, databases, tools, cybersecurity, grouped | Matches resume's Technical Skills list exactly, no invented skills | 2 | Todo |
| PORT-17 | Volunteer/Leadership section | Coding Club, G20 Hackathon, Geekulcha, CyberM8, Engage & Empower | All 6 roles from resume represented | 2 | Todo |
| PORT-18 | Contact section + working form | Next.js API route + Resend email delivery | Submitting the form sends a real email; validation on empty/invalid input | 3 | Todo |
| PORT-19 | Responsive QA pass | Manual pass across breakpoints on the built site | No layout breakage at 375px/768px/1440px | 2 | Todo |
| PORT-20 | Unit tests for content components | Experience, Projects, Skills render correctly from data | Jest/RTL tests pass in CI for these three components | 3 | Todo |

## Sprint 2: Testing, Polish, Deploy & DNS Cutover (planned — to be detailed after Sprint 1)
**Goal:** Full E2E suite green in CI, production deploy live on the custom domain, old site retired.
- E2E coverage of key user journeys (view projects, submit contact form, navigate sections)
- Accessibility pass (axe-core)
- SEO/meta/OG tags
- Lighthouse performance pass
- Production deploy on Vercel
- GoDaddy DNS cutover to Vercel (A/CNAME)
- Decommission old GitHub Pages site + update GoDaddy template
- README finalized (run/test/deploy instructions)

## Post-launch backlog (not scheduled)
- Blog/case-studies section backed by MDX or a headless CMS
- Postgres-backed guestbook or analytics view
- Cucumber/Gherkin BDD layer on top of Playwright, if a stronger Xray-style
  artifact is wanted later (deferred in favor of plain Playwright for Sprint 0)
