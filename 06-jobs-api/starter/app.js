require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
const connectDB = require('./db/connect')
const authMiddleWare = require('./middleware/authentication')
const cors = require('cors')
const helmet = require('helment')
const rateLimiter = require('rate-limiter')
const xss = require('xss-clean')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
// extra packages
app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100, //limit each IP to 100 requests
  })
)

app.use(helmet())
app.use(xss())
app.use(cors())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authMiddleWare, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
