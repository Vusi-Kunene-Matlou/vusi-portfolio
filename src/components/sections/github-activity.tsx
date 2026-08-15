'use client'

import { useEffect, useState } from 'react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { GithubIcon } from '@/components/social-icons'
import { profile } from '@/data/resume'

type ContributionDay = { date: string; contributionCount: number }
type ContributionWeek = { contributionDays: ContributionDay[] }
type TrendStat = { total: number; changePercent: number | null }
type ActivityItem = { id: string; repo: string; title: string; tag: string; date: string }

type Calendar = {
  totalContributions: number
  weeks: ContributionWeek[]
  streak: number
  pullRequests: TrendStat
  codeReviews: TrendStat
  recentActivity: ActivityItem[]
}

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; calendar: Calendar }

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

const CELL = 10
const GAP = 3
const PITCH = CELL + GAP
const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function monthLabels(weeks: ContributionWeek[]) {
  const labels: { index: number; label: string }[] = []
  let lastMonth = -1
  weeks.forEach((week, i) => {
    const firstDay = week.contributionDays[0]
    if (!firstDay) return
    const month = new Date(firstDay.date).getUTCMonth()
    if (month !== lastMonth) {
      labels.push({ index: i, label: MONTH_NAMES[month] })
      lastMonth = month
    }
  })
  return labels
}

function formatRelativeTime(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const minutes = Math.round(diffMs / 60000)
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`
  const months = Math.round(days / 30)
  return `${months} month${months === 1 ? '' : 's'} ago`
}

function TrendRow({ label, stat }: { label: string; stat: TrendStat }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-muted">{label}</span>
      <span className="flex items-baseline gap-2">
        <span className="text-lg font-semibold text-foreground">
          {stat.total.toLocaleString()}
        </span>
        {stat.changePercent !== null && (
          <span
            className={`text-xs ${stat.changePercent > 0 ? 'text-accent' : 'text-muted'}`}
          >
            {stat.changePercent > 0 ? '+' : ''}
            {stat.changePercent}% from last month
          </span>
        )}
      </span>
    </div>
  )
}

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
      <SectionHeading eyebrow="06. Activity" title="Coding activity" />

      <Reveal>
        <p className="max-w-2xl text-sm text-muted">
          My contributions over the last year.
        </p>
      </Reveal>

      {state.status === 'loading' && (
        <p className="mt-6 text-sm text-muted">Loading activity…</p>
      )}

      {state.status === 'error' && (
        <p role="alert" className="mt-6 text-sm text-muted">
          {state.message}
        </p>
      )}

      {state.status === 'ready' && (
        <>
          <Reveal delay={100}>
            <div className="mt-6 rounded-lg border border-border bg-surface p-6">
              <div className="flex flex-wrap items-end gap-8">
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {state.calendar.totalContributions.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted">Total</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {state.calendar.streak}
                  </p>
                  <p className="text-xs text-muted">Streak</p>
                </div>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 self-center text-sm text-accent hover:underline"
                >
                  <GithubIcon className="h-4 w-4" />
                  View profile
                </a>
              </div>

              <div className="mt-6 overflow-x-auto pb-1">
                <div style={{ width: state.calendar.weeks.length * PITCH - GAP }}>
                  <div className="relative mb-1 h-4">
                    {monthLabels(state.calendar.weeks).map(({ index, label }) => (
                      <span
                        key={index}
                        style={{ left: index * PITCH }}
                        className="absolute top-0 font-mono text-[10px] whitespace-nowrap text-muted"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-[3px]">
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

              <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-muted">
                <span>Less</span>
                {levelClass.map((cls, i) => (
                  <div key={i} className={`h-2.5 w-2.5 rounded-sm ${cls}`} />
                ))}
                <span>More</span>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Reveal delay={150}>
              <div className="h-full rounded-lg border border-border bg-surface p-6">
                <h3 className="text-sm font-semibold text-foreground">Recent activity</h3>
                {state.calendar.recentActivity.length === 0 ? (
                  <p className="mt-4 text-sm text-muted">No recent public activity.</p>
                ) : (
                  <ul className="mt-4 space-y-4">
                    {state.calendar.recentActivity.map((item) => (
                      <li key={item.id}>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="truncate font-mono text-xs text-accent">
                            {item.repo}
                          </span>
                          <span className="shrink-0 text-xs text-muted">
                            {formatRelativeTime(item.date)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-foreground">
                          {item.title}
                        </p>
                        <span className="mt-1.5 inline-block rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted">
                          {item.tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="h-full rounded-lg border border-border bg-surface p-6">
                <h3 className="text-sm font-semibold text-foreground">Overview</h3>
                <div className="mt-4 space-y-4">
                  <TrendRow label="Pull requests" stat={state.calendar.pullRequests} />
                  <TrendRow label="Code reviews" stat={state.calendar.codeReviews} />
                </div>
              </div>
            </Reveal>
          </div>
        </>
      )}
    </section>
  )
}
