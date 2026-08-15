import '@testing-library/jest-dom'

// jsdom doesn't implement fetch; components that fetch client-side (e.g.
// GithubActivity) need a stub so rendering them in tests doesn't throw.
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
    json: () => Promise.resolve({ error: 'not available in tests' }),
  })
) as jest.Mock
