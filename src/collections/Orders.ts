import type { CollectionConfig } from 'payload/types'

import { admins } from './access/admins'
import adminsAndUser from './access/adminsAndUser'
import { anyone } from './access/anyone'
import { checkRole } from './access/checkRole'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  fields: [
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'placedBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
