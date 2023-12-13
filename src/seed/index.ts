import type { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@admin.com',
      password: 'admin',
      roles: ['admin'],
    },
  })
}
