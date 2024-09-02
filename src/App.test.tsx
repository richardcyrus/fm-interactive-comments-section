import App from '@/App'
import { render, screen } from '@testing-library/react'

describe('App', () => {
  it('should render the title', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Interactive comments section'
    )
  })
})
