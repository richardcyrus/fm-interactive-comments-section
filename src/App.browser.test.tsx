import App from '@/App'
import { AuthProvider } from '@/context/AuthProvider'
import { page, userEvent } from '@vitest/browser/context'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'

describe('App', () => {
  it('should render the title', async () => {
    render(<App />)

    await expect
      .element(page.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Interactive comments section')
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

  it('should set a default user', async () => {
    render(<AuthedApp />)

    await expect
      .poll(() => setItemSpy)
      .toHaveBeenCalledWith('currentuser', JSON.stringify(defaultUser))
    expect(window.localStorage.getItem('currentuser')).toBe(`"${defaultUser}"`)
    expect(getItemSpy).toHaveBeenCalledWith('currentuser')
  })

  describe('User switcher', () => {
    it('renders a user switcher', async () => {
      render(<AuthedApp />)

      const userSwitcher = page.getByLabelText('Select a user')
      await expect.element(userSwitcher).toBeInTheDocument()
    })

    it('should switch users', async () => {
      const user = userEvent.setup()

      render(<AuthedApp />)

      await expect
        .poll(() => window.localStorage.getItem('currentuser'))
        .toBe(`"${defaultUser}"`)

      const userSwitcher = page.getByRole('combobox')

      await user.click(userSwitcher)
      await user.keyboard('maxblagun{enter}')
      await expect
        .poll(() => window.localStorage.getItem('currentuser'))
        .toBe(`"${user2}"`)
    })

    it('reset button should reset the environment', async () => {
      const user = userEvent.setup()

      render(<AuthedApp />)

      await expect
        .poll(() => window.localStorage.getItem('currentuser'))
        .toBe(`"${defaultUser}"`)

      const userSwitcher = page.getByRole('combobox')

      await user.click(userSwitcher)
      await user.keyboard('ramsesmiron{enter}')
      await expect
        .poll(() => window.localStorage.getItem('currentuser'))
        .toBe(`"${user3}"`)

      const resetButton = page.getByRole('button', { name: 'Reset' })
      await user.click(resetButton)

      await expect
        .poll(() => window.localStorage.getItem('currentuser'))
        .toBe(`"${defaultUser}"`)
    })
  })
})
