import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { profile } from '@/data/resume'

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <Reveal>
            <p className="font-mono text-sm text-accent">Hi, I&apos;m</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {profile.name}
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 max-w-2xl text-xl leading-snug text-muted sm:text-2xl">
              {profile.title}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted">{profile.summary}</p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover dark:text-black"
              >
                View my work
              </Link>
              <Link
                href="#contact"
                className="rounded-lg border border-muted px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Get in touch
              </Link>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                View resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17 17 7M9 7h8v8"
                  />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={150}
          className="reveal-scale order-first mx-auto w-48 sm:w-64 lg:order-none lg:w-full"
        >
          <div className="relative aspect-[406/614]">
            <div
              aria-hidden="true"
              className="absolute inset-6 rounded-full bg-accent/15 blur-2xl"
            />
            <Image
              src="/profile.png"
              alt={profile.name}
              fill
              priority
              sizes="(min-width: 1024px) 320px, 220px"
              className="relative object-contain"
              style={{
                maskImage: 'linear-gradient(to bottom, black 72%, transparent 96%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 96%)',
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
