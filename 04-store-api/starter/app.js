require('dotenv').config()
const express = require('express')
require('express-async-errors')
const productsRouter = require('./routes/products')

const app = express()

//
const connectDB = require('./db/connect')
const notFoundmiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.get('/', (req, res) => {
  res.send(
    '<h1>Store API home page</h1><a href="/api/v1/products">Products page</a>'
  )
})
app.use('/api/v1/products', productsRouter)
//middleware
app.use(notFoundmiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()
