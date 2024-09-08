import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '@/models/users'

describe('users', () => {
  it('should get all users', async () => {
    const users = await getUsers()
    expect(users).toHaveLength(4)
  })

  it('should get a user', async () => {
    const user = await getUser('ramsesmiron')
    expect(user).toHaveProperty('username', 'ramsesmiron')
  })

  it('should add a user', async () => {
    const userId = await addUser('testuser', {
      png: 'test.png',
      webp: 'test.webp',
    })

    const user = await getUser(userId)
    expect(user).toHaveProperty('username', 'testuser')
  })

  it('should update a user', async () => {
    const updates = { image: { png: 'new.png', webp: 'new.webp' } }
    await updateUser('testuser', updates)
    const user = await getUser('testuser')
    expect(user).toHaveProperty('image', updates.image)
  })

  it('should delete a user', async () => {
    await deleteUser('testuser')
    const user = await getUser('testuser')
    expect(user).toBeUndefined()
  })
})
