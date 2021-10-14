const CustomAPIError = require('./custom-error')
const { statusCodes } = require('http-status-codes')

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = statusCodes.BAD_REQUEST
  }
}

module.exports = BadRequestError
