import { render, screen } from '@testing-library/react'
import { Projects } from './projects'
import { projects } from '@/data/resume'

describe('Projects', () => {
  it('renders every project name, stack tag, and bullet from the resume data', () => {
    const { container } = render(<Projects />)
    const text = container.textContent ?? ''

    for (const project of projects) {
      expect(text).toContain(project.name)
      for (const tech of project.stack) {
        expect(text).toContain(tech)
      }
      for (const bullet of project.bullets) {
        expect(text).toContain(bullet)
      }
    }
  })

  it('links out to each project with a real href', () => {
    render(<Projects />)
    const projectWithLink = projects.find((p) => p.links.length > 0)!

    const link = screen.getByRole('link', {
      name: new RegExp(projectWithLink.links[0].label),
    })
    expect(link).toHaveAttribute('href', projectWithLink.links[0].href)
  })

  it('renders the section heading', () => {
    render(<Projects />)
    expect(
      screen.getByRole('heading', { name: /things i've built/i })
    ).toBeInTheDocument()
  })
})
