import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { volunteer } from '@/data/resume'

export function Volunteer() {
  return (
    <section id="volunteer" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="05. Leadership" title="Volunteer work & mentorship" />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {volunteer.map((entry, i) => (
          <li key={entry.id}>
            <Reveal delay={i * 80}>
              <div className="rounded-lg border border-border bg-surface p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {entry.role}
                  </h3>
                  <span className="font-mono text-xs text-muted">{entry.period}</span>
                </div>
                <p className="mt-1 text-sm text-accent">{entry.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {entry.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
