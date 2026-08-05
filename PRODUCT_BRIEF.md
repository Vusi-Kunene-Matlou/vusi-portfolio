# Product Brief: Vusi Kunene Matlou — Developer Portfolio

**Goal:** Replace the existing template-based GitHub Pages site and the
GoDaddy holding page at `vusikunenematlou.co.za` with a single, from-scratch
portfolio that is professionally built, documented like a real product
(backlog, CI/CD, automated tests), and deployed to that domain via Vercel.

**Who it's for:** Recruiters, hiring managers, and collaborators (Eduvos
Coding Club, Geekulcha, CyberM8) evaluating Vusi's engineering and QA
capability — the site itself, and its test suite, are part of the pitch.

**Why now:** The current site is an edited template and the domain points at
a generic GoDaddy page — neither reflects the professional experience gained
at BMW Group South Africa and TMS Dynamics, or the finished projects
(Dermaglare, API Security Scanner, UBUNTU Verse).

**Success looks like:**

- `vusikunenematlou.co.za` resolves to the new site in production.
- Content is 100% sourced from the resume — no invented experience.
- CI blocks any merge to `main` that fails lint, typecheck, unit tests, or
  the Playwright E2E suite.
- The repo itself (BACKLOG.md, CI config, test suite) is presentable as a
  work sample of Agile/QA process, not just the rendered site.

**Out of scope for this epic:** blog/CMS, analytics dashboards, and a
database-backed backend — captured as post-launch backlog items instead of
inflating Sprint 0–2 scope.
