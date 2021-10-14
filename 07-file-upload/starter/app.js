require('dotenv').config()
require('express-async-errors')
const fileUpload = require('express-fileupload')

const express = require('express')
const app = express()

// database
const connectDB = require('./db/connect')
//producrRouter

const productRouter = require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const cloudinary = require('cloudinary').v2
app.use(express.json()) //to have content in the req.body
app.use(express.static('./public'))

app.use(fileUpload({ useTempFiles: true }))
app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>')
})
app.use('/api/v1/products', productRouter)
// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_API_KEY,
  cloud_api_secret: process.env.CLOUD_API_SECRET,
})

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
