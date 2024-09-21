import App from '@/App'
import { AuthProvider } from '@/context/AuthProvider'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('App', () => {
  it('should render the title', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Interactive comments section'
    )
  })
})

describe('Authenticated App', () => {
  const AuthedApp = () => {
    return (
      <AuthProvider>
        <App />
      </AuthProvider>
    )
  }

  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
  const defaultUser = 'juliusomo'
  const user2 = 'maxblagun'
  const user3 = 'ramsesmiron'

  beforeEach(() => {
    window.localStorage.clear()
    getItemSpy.mockClear()
    setItemSpy.mockClear()
  })

  it('should set a default user', () => {
    render(<AuthedApp />)

    expect(setItemSpy).toHaveBeenCalledWith(
      'currentuser',
      JSON.stringify(defaultUser)
    )
    expect(window.localStorage.getItem('currentuser')).toBe(`"${defaultUser}"`)
    expect(getItemSpy).toHaveBeenCalledWith('currentuser')
  })

  describe('User switcher', () => {
    it('renders a user switcher', () => {
      render(<AuthedApp />)

      const userSwitcher = screen.getByLabelText('Select a user')
      expect(userSwitcher).toBeInTheDocument()
    })

    it('should switch users', async () => {
      const user = userEvent.setup()

      render(<AuthedApp />)

      expect(window.localStorage.getItem('currentuser')).toBe(
        `"${defaultUser}"`
      )

      const userSwitcher = screen.getByRole('combobox')

      await user.click(userSwitcher)
      await user.keyboard('maxblagun{enter}')
      await waitFor(() => {
        expect(window.localStorage.getItem('currentuser')).toBe(`"${user2}"`)
      })
    })

    it('reset button should reset the environment', async () => {
      const user = userEvent.setup()

      render(<AuthedApp />)

      expect(window.localStorage.getItem('currentuser')).toBe(
        `"${defaultUser}"`
      )

      const userSwitcher = screen.getByRole('combobox')

      await user.click(userSwitcher)
      await user.keyboard('ramsesmiron{enter}')
      await waitFor(() => {
        expect(window.localStorage.getItem('currentuser')).toBe(`"${user3}"`)
      })

      const resetButton = screen.getByRole('button', { name: 'Reset' })
      await user.click(resetButton)

      await waitFor(() => {
        // This should be empty because the app isn't re-rendered during testing.
        expect(window.localStorage.getItem('currentuser')).toBe(`""`)
      })
    })
  })
})
