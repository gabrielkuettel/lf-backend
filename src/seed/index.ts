import type { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  await payload.create({
    collection: 'users',
    data: {
      email: 'demo@demo.com',
      password: 'demo',
      roles: ['admin'],
    },
  })
}
