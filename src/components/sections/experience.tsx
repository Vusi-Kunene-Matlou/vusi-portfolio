import { SectionHeading } from '@/components/section-heading'
import { experience } from '@/data/resume'

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="02. Experience" title="Where I've worked" />

      <ol className="space-y-10">
        {experience.map((entry) => (
          <li key={entry.id} className="rounded-lg border border-border bg-surface p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold text-foreground">
                {entry.role} <span className="text-muted">· {entry.org}</span>
              </h3>
              <span className="font-mono text-xs text-muted">{entry.period}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{entry.location}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-accent">
              {entry.bullets.map((bullet, i) => (
                <li key={i} className="text-sm leading-relaxed text-muted">
                  {bullet}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
