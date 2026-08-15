import { profile } from '@/data/resume'

// Always fetch live from GitHub — this route backs a widget that's meant to
// reflect the real contribution graph, not a build-time snapshot.
export const dynamic = 'force-dynamic'

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
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
    }
  }
`

export async function GET() {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return Response.json(
      { error: 'GitHub activity is not configured yet.' },
      { status: 503 }
    )
  }

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: QUERY, variables: { login: profile.githubUsername } }),
    cache: 'no-store',
  })

  if (!response.ok) {
    return Response.json({ error: 'Failed to fetch GitHub activity.' }, { status: 502 })
  }

  const json = await response.json()
  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar

  if (!calendar) {
    return Response.json({ error: 'Failed to fetch GitHub activity.' }, { status: 502 })
  }

  return Response.json(calendar)
}
