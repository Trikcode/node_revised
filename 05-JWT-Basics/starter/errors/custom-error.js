const { statusCodes } = require('http-status-codes')

class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCodes.co
  }
}

module.exports = CustomAPIError
