import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import path from 'path'

import logger from './utils/logger'
import configs from './configs'
import Museum from './models/museum'
import museumsData from './data/museums.json'

const app = express()

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
  app.use('/docs', express.static(path.join(__dirname, '../docs/')))
}

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// parse Content-Type: application/json
app.use(bodyParser.json())

// parse Content-Type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', require('./routes').default)

async function intialDatabase() {
  const museums = await Museum.find()
  if (museums.length > 0) return

  for (let i = 0; i < museumsData.length; i++) {
    const museum = new Museum(museumsData[i])
    await museum.save()
  }
}

mongoose.connect(configs.MONGO_URL)
const db = mongoose.connection
db.on('open', () => {
  logger.info('DB connected')
  intialDatabase()
})

db.on('error', (err) => logger.error(err))

app.listen(configs.PORT, () => logger.info(`> Ready on port ${configs.PORT}`))

// keep server running
process.on('uncaughtException', err => logger.error('uncaughtException: ' + err))
process.on('unhandledRejection', err => logger.error('unhandledRejection: ' + err))
