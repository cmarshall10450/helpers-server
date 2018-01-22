import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import Promise from 'bluebird'
import routes from './routes'

const MONGO_URL = 'mongodb://localhost/helpers'
const PORT = 5000

const app = express()

mongoose.Promise = Promise

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors('*'))

app.use(routes)

mongoose.connect(MONGO_URL, { useMongoClient: true }).then(() => {
  console.log('Connected to MongoDB')
  console.log('Starting server...')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
