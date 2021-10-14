const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../controllers/main')
const authentMiddleWare = require('../middleware/auth')

router.route('/login').post(login)
router.route('/dashboard').get(authentMiddleWare, dashboard)
module.exports = router
