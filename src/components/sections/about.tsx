import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { certifications, education, profile } from '@/data/resume'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="01. About" title="About me" />

      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <p className="leading-relaxed text-muted">{profile.summary}</p>
        </Reveal>

        <Reveal delay={150} className="reveal-slide-right">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h3 className="text-sm font-semibold text-foreground">Education</h3>
            <p className="mt-2 text-sm text-foreground">{education.institution}</p>
            <p className="text-sm text-muted">{education.degree}</p>
            <p className="text-sm text-muted">{education.period}</p>

            <h3 className="mt-6 text-sm font-semibold text-foreground">Certifications</h3>
            <ul className="mt-2 space-y-1">
              {certifications.map((cert) => (
                <li key={cert} className="text-sm text-muted">
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
