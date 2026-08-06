## Epic: Portfolio Rebuild

Ship a from-scratch, professionally engineered developer portfolio deployed to
vusikunenematlou.co.za via Vercel, with a real backlog, CI/CD, and automated test suite.

## Sprint 0: Foundations & Process

**Goal:** Repo, tooling, CI, and process docs exist and pass CI — before any page content is written.

| ID      | Title                                         | Description                                                                         | Acceptance Criteria                                                    | Points | Status |
| ------- | --------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------ | ------ |
| PORT-1  | Scaffold Next.js + TypeScript + Tailwind repo | Init project with App Router, TS strict mode, Tailwind configured                   | `npm run dev` serves a page; `npm run build` passes; TS strict mode on | 2      | Done   |
| PORT-2  | Configure ESLint + Prettier                   | Shared lint/format config committed                                                 | `npm run lint` and `npm run format:check` pass on a clean checkout     | 1      | Done   |
| PORT-3  | GitHub Actions CI pipeline                    | Workflow runs format check, lint, typecheck, unit tests, build, and E2E on every PR | PR is blocked from merging if any step fails                           | 2      | Done   |
| PORT-4  | Jest + RTL test skeleton                      | Test runner configured with one smoke test                                          | `npm test` runs and passes in CI                                       | 2      | Done   |
| PORT-5  | Playwright E2E skeleton                       | Playwright configured against a production build, one smoke spec                    | `npm run test:e2e` passes locally and in CI                            | 3      | Done   |
| PORT-6  | Connect repo to Vercel                        | Link GitHub repo to Vercel project                                                  | Opening a PR produces a working Vercel preview URL                     | 1      | Done   |
| PORT-7  | Define design tokens                          | Colors, type scale, spacing documented, inspired by emmabostian standouts           | `DESIGN.md` committed with tokens                                      | 2      | Done   |
| PORT-8  | Write product brief                           | One-page epic description                                                           | `PRODUCT_BRIEF.md` committed at repo root                              | 1      | Done   |
| PORT-9  | Commit initial BACKLOG.md                     | This file, tracked as source of truth                                               | File committed, Sprint 0/1 tickets present                             | 1      | Done   |
| PORT-10 | Architecture/deployment diagram               | Simple diagram: GitHub → Actions → Vercel → GoDaddy DNS                             | Diagram committed to `/docs` or README                                 | 2      | Done   |

## Sprint 1: Core Site

**Goal:** All core sections are built from real resume content, fully responsive, and CI is green.

| ID      | Title                             | Description                                                            | Acceptance Criteria                                                         | Points | Status                                                                    |
| ------- | --------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------- |
| PORT-11 | Responsive layout shell           | Nav, footer, base layout, dark/light theme                             | Layout renders correctly at mobile/tablet/desktop breakpoints               | 3      | Done                                                                      |
| PORT-12 | Hero/Home section                 | Name, title, summary, primary CTA                                      | Content matches resume summary; no placeholder copy                         | 2      | Done                                                                      |
| PORT-13 | About section                     | Summary, education, certifications                                     | Eduvos BSc CS + Golden Key/FNB APP Academy shown accurately                 | 2      | Done                                                                      |
| PORT-14 | Experience section                | BMW Group, TMS Dynamics, Robinson Liquors, driven by a typed data file | All three roles rendered with accurate dates/bullets from resume            | 3      | Done                                                                      |
| PORT-15 | Projects section                  | Dermaglare, API Security Scanner, UBUNTU Verse with stack tags + links | Each project shows stack, description, and live/GitHub link where available | 3      | Done                                                                      |
| PORT-16 | Skills section                    | Languages, frameworks, databases, tools, cybersecurity, grouped        | Matches resume's Technical Skills list exactly, no invented skills          | 2      | Done                                                                      |
| PORT-17 | Volunteer/Leadership section      | Coding Club, G20 Hackathon, Geekulcha, CyberM8, Engage & Empower       | All 6 roles from resume represented                                         | 2      | Done                                                                      |
| PORT-18 | Contact section + working form    | Next.js API route + Resend email delivery                              | Submitting the form sends a real email; validation on empty/invalid input   | 3      | Done (needs `RESEND_API_KEY` set in Vercel to actually send — see README) |
| PORT-19 | Responsive QA pass                | Manual pass across breakpoints on the built site                       | No layout breakage at 375px/768px/1440px                                    | 2      | Done                                                                      |
| PORT-20 | Unit tests for content components | Experience, Projects, Skills render correctly from data                | Jest/RTL tests pass in CI for these three components                        | 3      | Done                                                                      |

## Sprint 2: Testing, Polish, Deploy & DNS Cutover

**Goal:** Full E2E suite green in CI, production deploy live on the custom domain, old site retired.

| ID      | Title                              | Description                                                                 | Acceptance Criteria                                                                   | Points | Status |
| ------- | ---------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------ | ------ |
| PORT-21 | Production deploy on Vercel        | Push to `main` deploys to production                                        | `vercel.app` production URL serves the built site                                     | 1      | Done   |
| PORT-22 | GoDaddy DNS cutover to Vercel      | Point `vusikunenematlou.co.za` at the Vercel deployment (A/CNAME)           | `https://www.vusikunenematlou.co.za` resolves to the new site                         | 2      | Done   |
| PORT-23 | E2E coverage of key user journeys  | Playwright specs for viewing projects, submitting the contact form, and nav | Specs pass locally and in CI for each journey                                         | 3      | Todo   |
| PORT-24 | Accessibility pass                 | Automated a11y check (axe-core) integrated into the E2E suite               | No critical/serious axe violations on the homepage                                    | 2      | Todo   |
| PORT-25 | SEO/meta/OG tags                   | Verify metadata, Open Graph, and Twitter card tags render correctly         | Social share preview (e.g. via a link debugger) shows correct title/description/image | 1      | Todo   |
| PORT-26 | Lighthouse performance pass        | Run Lighthouse against the production URL, address regressions              | Performance, accessibility, best-practices, SEO all ≥ 90                              | 2      | Todo   |
| PORT-27 | Decommission old GitHub Pages site | Archive/retire the old template repo and its GitHub Pages deployment        | Old `Vusi-Kunene-Matlou.github.io` no longer serves as the primary portfolio          | 1      | Todo   |
| PORT-28 | README finalized                   | Run/test/deploy instructions accurate and complete                          | A new contributor can clone, run, test, and understand deploy from README alone       | 1      | Todo   |

## Post-launch backlog (not scheduled)

- Blog/case-studies section backed by MDX or a headless CMS
- Postgres-backed guestbook or analytics view
- Cucumber/Gherkin BDD layer on top of Playwright, if a stronger Xray-style
  artifact is wanted later (deferred in favor of plain Playwright for Sprint 0)
