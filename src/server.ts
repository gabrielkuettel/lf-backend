import express from 'express'
import path from 'path'
import payload from 'payload'

import { authMiddleware } from './middleware/authMiddleware'
import { errorMiddleware } from './middleware/errorMiddleware'
import aiRoutes from './routes/ai'
import { seed } from './seed'

// eslint-disable-next-line
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
})

const app = express()

app.use('/assets', express.static(path.resolve(__dirname, './assets')))

app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  if (process.env.PAYLOAD_PUBLIC_SEED === 'true') {
    payload.logger.info('---- SEEDING DATABASE ----')
    await seed(payload)
  }

  // Add your own express routes here
  app.use('/ai', authMiddleware, aiRoutes)

  app.use(errorMiddleware)

  app.listen(3000)
}

start()
