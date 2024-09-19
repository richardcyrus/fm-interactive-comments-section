import UserSwitcher from '@/components/UserSwitcher/UserSwitcher'
import { useAuth } from '@/hooks/useAuth'

function App() {
  const { currentUser } = useAuth()

  return (
    <div
      id="wrapper"
      className="wrapper grid h-screen grid-rows-[auto_1fr_auto]"
    >
      <aside className="bg-white p-1 shadow-md">
        <UserSwitcher key={currentUser} currentUser={currentUser} />
      </aside>
      <main className="overflow-auto px-4 py-8">
        <h1 className="sr-only">Interactive comments section</h1>
      </main>
      <footer className="attribution p-2">
        Challenge by{' '}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by{' '}
        <a href="https://www.richardcyrus.com" target="_blank" rel="noreferrer">
          Richard Cyrus
        </a>
        .
      </footer>
    </div>
  )
}

export default App
