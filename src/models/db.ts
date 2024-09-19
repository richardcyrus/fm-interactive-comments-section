import comments from '@/models/comments.json'
import users from '@/models/users.json'
import * as chrono from 'chrono-node'
import Dexie, { type EntityTable } from 'dexie'

interface User {
  username: string
  image: {
    png: string
    webp: string
  }
}

interface Comment {
  id: number
  content: string
  createdAt: Date | null
  score: number
  user: string
  isReply: 0 | 1
  replyingTo?: string
  parentComment?: number
  replies?: Comment[]
}

interface CommentDTO {
  id: number
  content: string
  createdAt: string
  score: number
  user: string
  isReply: 0 | 1
  replyingTo?: string
  parentComment?: number
}

/* Disable the cache to disable optimistic updates for liveQueries.
   see https://dexie.org/docs/Dexie/Dexie, I found the hint here
   https://github.com/dexie/Dexie.js/issues/1771#issuecomment-1655379662
   This was used to solve the problem of duplicated entries in the user
   list in the UserSwitcher component after using the reset button.
*/
const db = new Dexie('CommentsDB', { cache: 'disabled' }) as Dexie & {
  users: EntityTable<User, 'username'>
  comments: EntityTable<Comment, 'id'>
}

db.version(1).stores({
  users: '&username',
  comments: '++id, score, createdAt, isReply, replyingTo, parentComment, user',
})

db.on('populate', async function (transaction) {
  for (let i = 0; i < users.length; i++) {
    transaction.table('users').add(users[i])
  }

  for (let i = 0; i < comments.length; i++) {
    const com: CommentDTO = {
      ...comments[i],
      // Make sure isReply is assigned a value of 0 or 1
      isReply: comments[i].isReply === 1 ? 1 : 0,
    }
    const comment: Comment = {
      ...com,
      createdAt: chrono.parseDate(com.createdAt),
    }

    transaction.table('comments').add(comment)
  }
})

async function recreateDB() {
  return db.delete({ disableAutoOpen: false })
}

export { db, recreateDB }
export type { Comment, CommentDTO, User }
