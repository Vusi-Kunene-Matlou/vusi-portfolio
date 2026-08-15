'use client'

import { useState, type FormEvent } from 'react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  WhatsappIcon,
} from '@/components/social-icons'
import { profile } from '@/data/resume'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong.')
      }

      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="07. Contact" title="Get in touch" />

      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <p className="max-w-md leading-relaxed text-muted">
            I&apos;m open to opportunities in software development, QA, and cybersecurity.
            The fastest way to reach me is by email, or send a message directly below.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2.5 text-foreground transition-colors hover:text-accent"
              >
                <MailIcon className="h-4.5 w-4.5 shrink-0 text-accent" />
                {profile.email}
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 text-foreground transition-colors hover:text-accent"
              >
                <GithubIcon className="h-4.5 w-4.5 shrink-0 text-accent" />
                {profile.github.replace('https://', '')}
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 text-foreground transition-colors hover:text-accent"
              >
                <LinkedinIcon className="h-4.5 w-4.5 shrink-0 text-accent" />
                {profile.linkedin.replace('https://', '')}
              </a>
            </li>
            <li>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 text-foreground transition-colors hover:text-accent"
              >
                <WhatsappIcon className="h-4.5 w-4.5 shrink-0 text-accent" />
                Message on WhatsApp
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={150} className="reveal-slide-right">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="hidden">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1.5 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1.5 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1.5 w-full rounded-lg border border-muted bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50 dark:text-black"
            >
              {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>

            {status === 'success' && (
              <p
                role="status"
                className="success-check flex items-center gap-2 text-sm text-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Thanks — your message has been sent. I&apos;ll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                {errorMessage}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
