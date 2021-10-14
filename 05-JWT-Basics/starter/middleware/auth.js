const { UnauthenticatedError } = require('../errors')

const jwt = require('jsonwebtoken')
const authentMiddleWare = async (req, res, next) => {
  const authorize = req.headers.authorization
  if (!authorize || !authorize.startsWith('Bearer ')) {
    throw new UnauthenticatedError('no token provided')
  }
  try {
    const token = authorize.split(' ')[1]
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }

    next()
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route')
  }
}
module.exports = authentMiddleWare
