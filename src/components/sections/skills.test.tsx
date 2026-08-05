import { render, screen } from '@testing-library/react'
import { Skills } from './skills'
import { skills } from '@/data/resume'

describe('Skills', () => {
  it('renders every skill group label and item from the resume data', () => {
    const { container } = render(<Skills />)
    const text = container.textContent ?? ''

    for (const group of skills) {
      expect(text).toContain(group.label)
      for (const item of group.items) {
        expect(text).toContain(item)
      }
    }
  })

  it('renders the section heading', () => {
    render(<Skills />)
    expect(screen.getByRole('heading', { name: /technical skills/i })).toBeInTheDocument()
  })
})
