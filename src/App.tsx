import UserSwitcher from '@/components/UserSwitcher/UserSwitcher'
import { useAuth } from '@/hooks/useAuth'

function App() {
  const { currentUser } = useAuth()

  return (
    <div id="container" className="container grid grid-rows-3 gap-4">
      <aside className="sticky bg-white p-1 shadow-md">
        <UserSwitcher key={currentUser} currentUser={currentUser} />
      </aside>
      <main>
        <h1 className="sr-only">Interactive comments section</h1>
      </main>
      <footer className="attribution border-t border-slate-200 p-2">
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
