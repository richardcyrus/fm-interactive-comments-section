import {
  addComment,
  addCommentReply,
  deleteComment,
  getComment,
  getCommentReplies,
  getComments,
  updateComment,
} from '@/models/comments'
import { expect } from 'vitest'

describe('comments', () => {
  it('should get all comments', async () => {
    const comments = await getComments()
    expect(comments).toHaveLength(2)
  })

  it('should get a comment', async () => {
    const comment = await getComment(2)
    expect(comment).toHaveProperty('user', 'maxblagun')
  })

  it('should add a comment', async () => {
    const commentId = await addComment('test', 'testuser')

    const comment = await getComment(commentId)
    expect(comment).toHaveProperty('content', 'test')
    expect(comment).toHaveProperty('isReply', 0)
  })

  it('should update a comment', async () => {
    const updates = { content: 'new content' }
    await updateComment(5, updates)
    const comment = await getComment(5)
    expect(comment).toHaveProperty('content', 'new content')
  })

  it('should add a reply', async () => {
    const newReply = {
      content: 'test',
      score: 5,
      user: 'testuser',
      replyingTo: 'amyrobson',
      parentComment: 1,
    }

    const replyId = await addCommentReply(
      newReply.content,
      newReply.score,
      newReply.user,
      newReply.replyingTo,
      newReply.parentComment
    )

    const reply = await getComment(replyId)
    expect(reply).toHaveProperty('content', 'test')
    expect(reply).toHaveProperty('parentComment', 1)

    const parent = await getComment(1)
    expect(parent?.replies).toHaveLength(1)
  })

  it('should get comment replies', async () => {
    const replies = await getCommentReplies(1)
    expect(replies).toHaveLength(1)
  })

  it('should delete a reply', async () => {
    await deleteComment(6)
    const reply = await getComment(6)
    expect(reply).toBeUndefined()
  })

  it('should delete a comment', async () => {
    await deleteComment(1)
    const comment = await getComment(1)
    expect(comment).toBeUndefined()
  })
})
