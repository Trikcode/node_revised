const { people } = require('./data')

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people })
}
const createPerson = (req, res) => {
  res.status(200).json({ success: true, data: people })
}
const postman = (req, res) => {
  res.status(200).json({ success: true, data: people })
}
const put = (req, res) => {
  res.status(200).json({ success: true, data: people })
}
module.exports = {
  getPeople,
  createPerson,
  postman,
  put,
}
