const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const notFound = require('./middleware/notFound')
const errorhandlerMiddleware = require('./middleware/error-handler')
//middleware
const connectDB = require('./db/connect')
require('dotenv').config()

app.use(express.static('./public'))
app.use(express.json())
app.use(notFound)
app.use(errorhandlerMiddleware)

const port = process.env.PORT || 5000

app.use('/api/v1/tasks', tasks)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log('@5000...')
    })
  } catch (error) {
    console.log(error)
  }
}
start()
