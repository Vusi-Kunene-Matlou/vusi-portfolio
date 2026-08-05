import { render, screen } from '@testing-library/react'
import { Experience } from './experience'
import { experience } from '@/data/resume'

describe('Experience', () => {
  it('renders every role, org, and bullet from the resume data', () => {
    const { container } = render(<Experience />)
    const text = container.textContent ?? ''

    for (const entry of experience) {
      expect(text).toContain(entry.role)
      expect(text).toContain(entry.org)
      for (const bullet of entry.bullets) {
        expect(text).toContain(bullet)
      }
    }
  })

  it('renders the section heading', () => {
    render(<Experience />)
    expect(
      screen.getByRole('heading', { name: /where i've worked/i })
    ).toBeInTheDocument()
  })
})
