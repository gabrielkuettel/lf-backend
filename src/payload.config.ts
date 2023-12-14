import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { buildConfig } from 'payload/config'

import { Orders } from './collections/Orders'
import { Users } from './collections/Users'
import BeforeLogin from './components/BeforeLogin'
import { Icon } from './components/Icon'
import { Logo } from './components/Logo'

export default buildConfig({
  collections: [Users, Orders],
  admin: {
    bundler: webpackBundler(),
    components: {
      beforeLogin: [BeforeLogin],
      graphics: {
        Logo,
        Icon,
      },
    },
    meta: {
      titleSuffix: '- Local Fiber',
      favicon: '/assets/favicon.png',
    },
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
