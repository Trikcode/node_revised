const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')
// require('../dotenv')

const login = (req, res) => {
  const { username, password } = req.body
  console.log({ username, password })
  if (!username || !password) {
    throw new CustomAPIError('Please provide Email and password', 400)
  }
  //id
  const id = new Date().getDate()
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({ msg: 'User created', token })
}

const dashboard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res.json({
    msg: `Hey ${req.user.username} welcome`,
    secret: `your lucky number is ${luckyNumber}`,
  })
}
module.exports = {
  login,
  dashboard,
}
