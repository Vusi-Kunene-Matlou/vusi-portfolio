import { SectionHeading } from '@/components/section-heading'
import { skills } from '@/data/resume'

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="04. Skills" title="Technical skills" />

      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.id} className="rounded-lg border border-border bg-surface p-6">
            <h3 className="text-sm font-semibold text-foreground">{group.label}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
