import CommentCard from '@/components/CommentCard/CommentCard'
import CommentForm from '@/components/CommentForm/CommentForm'
import UserSwitcher from '@/components/UserSwitcher/UserSwitcher'
import { useAuth } from '@/hooks/useAuth'
import '@/index.css'
import { getComments } from '@/models/comments'
import { useLiveQuery } from 'dexie-react-hooks'

function App() {
  const { currentUser } = useAuth()
  const comments = useLiveQuery(() => getComments(), [], [])

  return (
    <div
      id="wrapper"
      className="wrapper grid h-screen grid-rows-[auto_1fr_auto]"
    >
      <aside className="bg-white p-1 shadow-md">
        <UserSwitcher key={currentUser} currentUser={currentUser} />
      </aside>
      <main className="mx-auto overflow-auto px-4 py-8">
        <h1 className="sr-only">Interactive comments section</h1>
        {comments?.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
        <div className="mt-4 rounded-lg bg-white p-4 sm:mt-5 sm:p-6">
          <CommentForm key={currentUser} />
        </div>
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
