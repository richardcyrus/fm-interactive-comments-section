import type { User } from '@/models/db'
import { db } from '@/models/db'

/**
 * Retrieves all users from the database.
 *
 * @return {User[]} An array of all users in the database
 */
const getUsers = () => db.users.toArray()

/**
 * Retrieves a user from the database based on their ID.
 *
 * @param {string} username - The username of the user to retrieve.
 * @return {Promise<User | undefined>} A Promise that resolves to the User object if found, or undefined if not found.
 */
const getUser = (username: string) => db.users.get(username)

/**
 * Adds a new user to the database.
 *
 * @param {string} username - The username of the user.
 * @param {object} image - The image object containing the URLs of the PNG and WEBP versions.
 * @param {string} image.png - The URL of the PNG version of the image.
 * @param {string} image.webp - The URL of the WEBP version of the image.
 * @return {Promise<void>} A Promise that resolves when the user is added to the database. The id of the new user.
 */
const addUser = (username: string, image: { png: string; webp: string }) =>
  db.users.add({ username, image })

/**
 * Updates a user in the database.
 *
 * @param {string} username - The username of the user to update.
 * @param {Partial<User>} updates - The updates to apply to the user.
 * @return {Promise<void>} A Promise that resolves when the update is complete.
 */
const updateUser = (username: string, updates: Partial<User>) =>
  db.users.update(username, { ...updates })

/**
 * Deletes a user from the database based on their ID.
 *
 * @param {string} username - The username of the user to delete.
 * @return {Promise<void>} A Promise that resolves when the user is deleted from the database.
 */
const deleteUser = (username: string) => db.users.delete(username)

export { addUser, deleteUser, getUser, getUsers, updateUser }
