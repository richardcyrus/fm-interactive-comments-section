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

const db = new Dexie('CommentsDB') as Dexie & {
  users: EntityTable<User, 'username'>
  comments: EntityTable<Comment, 'id'>
}

db.version(1).stores({
  users: '&username',
  comments: '++id, score, createdAt, isReply, replyingTo, parentComment, user',
})

db.on('populate', async function () {
  for (let i = 0; i < users.length; i++) {
    await db.users.add(users[i])
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

    await db.comments.add(comment)
  }
})

function recreateDB() {
  return db.delete().then(() => db.open())
}

export { db, recreateDB }
export type { Comment, CommentDTO, User }
