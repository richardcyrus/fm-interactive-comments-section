import type { Comment } from '@/models/db'
import { db } from '@/models/db'

/**
 * Retrieves all comments from the database.
 *
 * @return {Promise<Comment[]>} A promise that resolves to an array of comments.
 */
const getComments = async () => {
  const comments = await db.comments
    .where('isReply')
    .equals(0)
    .reverse()
    .sortBy('score')

  await Promise.all(
    comments.map(async (comment) => {
      comment.replies = await getCommentReplies(comment.id)
    })
  )

  return comments
}

/**
 * Retrieves a comment from the database by its ID.
 *
 * @param {number} id - The ID of the comment to retrieve.
 * @return {Promise<Comment>} A promise that resolves to the comment with the specified ID.
 */
const getComment = async (id: number) => {
  const comment = await db.comments.get(id)

  if (comment) {
    comment.replies = await getCommentReplies(comment.id)
  }

  return comment
}

/**
 * Retrieves all replies to a comment from the database.
 *
 * @param {number} id - The ID of the comment to retrieve replies for.
 * @return {Promise<Comment[]>} A promise that resolves to an array of replies.
 */
const getCommentReplies = (id: number) =>
  db.comments.where('parentComment').equals(id).sortBy('createdAt')

/**
 * Adds a new comment to the database.
 *
 * @param {string} content - The content of the comment.
 * @param {User} user - The user who made the comment.
 * @return {Promise<void>} A promise that resolves when the comment has been added.
 */
const addComment = (content: string, user: string) =>
  db.comments.add({
    content,
    createdAt: new Date(),
    isReply: 0,
    score: 0,
    user,
  })

/**
 * Adds a new reply to a comment in the database.
 *
 * @param {string} content - The content of the reply.
 * @param {number} score - The initial score of the reply.
 * @param {string} user - The user who made the reply.
 * @param {string} replyingTo - The ID of the comment being replied to.
 * @param {number} parentComment - The ID of the parent comment.
 * @return {Promise<void>} A promise that resolves when the reply has been added.
 */
const addCommentReply = (
  content: string,
  score: number,
  user: string,
  replyingTo: string,
  parentComment: number
) =>
  db.comments.add({
    content,
    createdAt: new Date(),
    isReply: 1,
    parentComment,
    replyingTo,
    score,
    user,
  })

/**
 * Updates a comment in the database with the specified ID.
 *
 * @param {number} id - The ID of the comment to update.
 * @param {Partial<Comment>} updates - The updated properties of the comment.
 * @return {Promise<void>} A promise that resolves when the comment has been updated.
 */
const updateComment = (id: number, updates: Partial<Comment>) =>
  db.comments.update(id, { ...updates })

/**
 * Deletes a comment from the database by its ID.
 *
 * @param {number} id - The ID of the comment to delete.
 * @return {Promise<void>} A promise that resolves when the comment has been deleted.
 */
const deleteComment = (id: number) => db.comments.delete(id)

export {
  addComment,
  addCommentReply,
  deleteComment,
  getComment,
  getCommentReplies,
  getComments,
  updateComment,
}
