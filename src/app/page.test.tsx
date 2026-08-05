import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home', () => {
  it('renders the name as a heading', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /vusi kunene matlou/i })
    ).toBeInTheDocument()
  })
})
