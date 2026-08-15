import { profile } from '@/data/resume'

// Always fetch live from GitHub — this route backs a widget that's meant to
// reflect real activity, not a build-time snapshot.
export const dynamic = 'force-dynamic'

const CALENDAR_QUERY = `
  query ($login: String!, $curFrom: DateTime!, $curTo: DateTime!, $prevFrom: DateTime!, $prevTo: DateTime!) {
    user(login: $login) {
      contributionsCollection {
        totalPullRequestContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
      current: contributionsCollection(from: $curFrom, to: $curTo) {
        totalPullRequestContributions
        totalPullRequestReviewContributions
      }
      previous: contributionsCollection(from: $prevFrom, to: $prevTo) {
        totalPullRequestContributions
        totalPullRequestReviewContributions
      }
    }
  }
`

type ContributionDay = { date: string; contributionCount: number }

function computeStreak(days: ContributionDay[]) {
  let streak = 0
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].contributionCount > 0) {
      streak++
    } else if (streak > 0) {
      break
    }
  }
  return streak
}

function changePercent(current: number, previous: number) {
  if (previous === 0) return current > 0 ? null : 0
  return Math.round(((current - previous) / previous) * 100)
}

type GithubEvent = {
  id: string
  type: string
  created_at: string
  repo: { name: string }
  payload: Record<string, unknown>
}

function describeEvent(event: GithubEvent) {
  const repo = event.repo.name
  const payload = event.payload as {
    ref?: string
    commits?: { message: string }[]
    action?: string
    pull_request?: {
      number: number
      title: string
      merged: boolean
      head?: { ref: string }
    }
    issue?: { number: number; title: string }
  }

  switch (event.type) {
    case 'PushEvent': {
      const branch = payload.ref?.replace('refs/heads/', '') ?? 'main'
      const commitCount = payload.commits?.length ?? 0
      const title =
        payload.commits?.[0]?.message?.split('\n')[0] ?? `${commitCount} commit(s)`
      return { title, tag: branch }
    }
    case 'PullRequestEvent': {
      const pr = payload.pull_request
      const verb = pr?.merged
        ? 'Merged'
        : payload.action === 'closed'
          ? 'Closed'
          : 'Opened'
      return {
        title: `${verb} PR #${pr?.number}: ${pr?.title}`,
        tag: pr?.head?.ref ?? `#${pr?.number}`,
      }
    }
    case 'PullRequestReviewEvent': {
      const pr = payload.pull_request
      return { title: `Reviewed PR #${pr?.number}: ${pr?.title}`, tag: 'review' }
    }
    case 'IssuesEvent': {
      const issue = payload.issue
      const verb = payload.action === 'closed' ? 'Closed' : 'Opened'
      return {
        title: `${verb} issue #${issue?.number}: ${issue?.title}`,
        tag: `#${issue?.number}`,
      }
    }
    case 'WatchEvent':
      return { title: `Starred ${repo}`, tag: 'starred' }
    case 'ForkEvent':
      return { title: `Forked ${repo}`, tag: 'fork' }
    case 'CreateEvent':
      return {
        title: `Created ${payload.ref ? `branch ${payload.ref}` : 'repository'}`,
        tag: 'created',
      }
    default:
      return null
  }
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return Response.json(
      { error: 'GitHub activity is not configured yet.' },
      { status: 503 }
    )
  }

  const now = new Date()
  const curFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const prevFrom = new Date(curFrom.getTime() - 30 * 24 * 60 * 60 * 1000)

  const headers = {
    Authorization: `bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const [graphqlRes, eventsRes] = await Promise.all([
    fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: CALENDAR_QUERY,
        variables: {
          login: profile.githubUsername,
          curFrom: curFrom.toISOString(),
          curTo: now.toISOString(),
          prevFrom: prevFrom.toISOString(),
          prevTo: curFrom.toISOString(),
        },
      }),
      cache: 'no-store',
    }),
    fetch(
      `https://api.github.com/users/${profile.githubUsername}/events/public?per_page=10`,
      {
        headers: {
          Authorization: `bearer ${token}`,
          Accept: 'application/vnd.github+json',
        },
        cache: 'no-store',
      }
    ),
  ])

  if (!graphqlRes.ok) {
    return Response.json({ error: 'Failed to fetch GitHub activity.' }, { status: 502 })
  }

  const graphqlJson = await graphqlRes.json()
  const user = graphqlJson?.data?.user
  const calendar = user?.contributionsCollection?.contributionCalendar

  if (!calendar) {
    return Response.json({ error: 'Failed to fetch GitHub activity.' }, { status: 502 })
  }

  const allDays: ContributionDay[] = calendar.weeks.flatMap(
    (w: { contributionDays: ContributionDay[] }) => w.contributionDays
  )

  const yearPr = user.contributionsCollection?.totalPullRequestContributions ?? 0
  const yearReviews =
    user.contributionsCollection?.totalPullRequestReviewContributions ?? 0
  const currentPr = user.current?.totalPullRequestContributions ?? 0
  const previousPr = user.previous?.totalPullRequestContributions ?? 0
  const currentReviews = user.current?.totalPullRequestReviewContributions ?? 0
  const previousReviews = user.previous?.totalPullRequestReviewContributions ?? 0

  let recentActivity: {
    id: string
    repo: string
    title: string
    tag: string
    date: string
  }[] = []
  if (eventsRes.ok) {
    const events: GithubEvent[] = await eventsRes.json()
    recentActivity = events
      .map((event) => {
        const described = describeEvent(event)
        if (!described) return null
        return {
          id: event.id,
          repo: event.repo.name,
          title: described.title,
          tag: described.tag,
          date: event.created_at,
        }
      })
      .filter((e): e is NonNullable<typeof e> => e !== null)
      .slice(0, 5)
  }

  return Response.json({
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
    streak: computeStreak(allDays),
    pullRequests: { total: yearPr, changePercent: changePercent(currentPr, previousPr) },
    codeReviews: {
      total: yearReviews,
      changePercent: changePercent(currentReviews, previousReviews),
    },
    recentActivity,
  })
}
