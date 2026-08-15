'use client'

import { useEffect, useState } from 'react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { GithubIcon } from '@/components/social-icons'
import { profile } from '@/data/resume'

type ContributionDay = { date: string; contributionCount: number }
type ContributionWeek = { contributionDays: ContributionDay[] }
type ContributionCalendar = { totalContributions: number; weeks: ContributionWeek[] }

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; calendar: ContributionCalendar }

function levelFor(count: number) {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

const levelClass = [
  'bg-border',
  'bg-accent/25',
  'bg-accent/50',
  'bg-accent/75',
  'bg-accent',
] as const

export function GithubActivity() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    fetch('/api/github-contributions')
      .then(async (res) => {
        const body = await res.json()
        if (cancelled) return
        if (!res.ok) {
          setState({
            status: 'error',
            message: body.error || 'Failed to load GitHub activity.',
          })
          return
        }
        setState({ status: 'ready', calendar: body })
      })
      .catch(() => {
        if (!cancelled) {
          setState({ status: 'error', message: 'Failed to load GitHub activity.' })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="activity" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="06. Activity" title="GitHub activity" />

      <Reveal>
        {state.status === 'loading' && (
          <p className="text-sm text-muted">Loading activity…</p>
        )}

        {state.status === 'error' && (
          <p role="alert" className="text-sm text-muted">
            {state.message}
          </p>
        )}

        {state.status === 'ready' && (
          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-sm text-foreground">
                <span className="font-semibold">{state.calendar.totalContributions}</span>{' '}
                contributions in the last year
              </p>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
              >
                <GithubIcon className="h-4 w-4" />
                View profile
              </a>
            </div>

            <div className="mt-4 overflow-x-auto pb-1">
              <div className="flex w-fit gap-[3px]">
                {state.calendar.weeks.map((week, i) => (
                  <div key={i} className="flex flex-col gap-[3px]">
                    {week.contributionDays.map((day) => (
                      <div
                        key={day.date}
                        title={`${day.contributionCount} contributions on ${day.date}`}
                        className={`h-2.5 w-2.5 rounded-sm ${levelClass[levelFor(day.contributionCount)]}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Reveal>
    </section>
  )
}
