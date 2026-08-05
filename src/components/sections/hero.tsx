import Link from 'next/link'
import { profile } from '@/data/resume'

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <p className="font-mono text-sm text-accent">Hi, I&apos;m</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-4 max-w-2xl text-xl leading-snug text-muted sm:text-2xl">
        {profile.title}
      </p>
      <p className="mt-6 max-w-2xl leading-relaxed text-muted">{profile.summary}</p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="#projects"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:text-black"
        >
          View my work
        </Link>
        <Link
          href="#contact"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Get in touch
        </Link>
      </div>
    </section>
  )
}
