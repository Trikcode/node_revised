const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  return res
    .status(500)
    .json({ msg: `There was an error please try again later` })
}

module.exports = errorHandlerMiddleware
