const express = require('express')
const router = express.Router()
const {
  getPeople,
  createPerson,
  postman,
  put,
} = require('../02-express-tutorial/controllers/control')
router.get('/', getPeople)
router.post('/', createPerson)
router.post('/postman', postman)
router.put('/:id', put)
router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(postman)
module.exports = router
