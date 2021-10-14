const express = require('express')
const path = require('path')
const login = require('./login')
const api = require('./api')
const app = express()
app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))
app.use('/api/people', api)
app.use('/login', login)

app.listen(5000, () => {
  console.log('server @  5000...')
})
