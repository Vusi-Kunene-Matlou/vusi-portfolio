import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { projects } from '@/data/resume'

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="03. Projects" title="Things I've built" />

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 100}>
            <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                <span className="font-mono text-xs text-muted">{project.period}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{project.tagline}</p>

              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-accent">
                {project.bullets.map((bullet, j) => (
                  <li key={j} className="text-sm leading-relaxed text-muted">
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.links.length > 0 && (
                <div className="mt-5 flex gap-4 border-t border-border pt-4">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      {link.label} &rarr;
                    </a>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
