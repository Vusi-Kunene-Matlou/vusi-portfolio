import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { skills } from '@/data/resume'

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="04. Skills" title="Technical skills" />

      <div className="divide-y divide-border border-t border-border">
        {skills.map((group, i) => (
          <Reveal key={group.id} delay={i * 80}>
            <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-baseline sm:gap-8">
              <h3 className="font-mono text-sm text-muted sm:w-40 sm:shrink-0">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
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
          </Reveal>
        ))}
      </div>
    </section>
  )
}
