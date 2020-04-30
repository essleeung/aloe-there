let router = require('express').Router()
let db = require('../models')
let userLogin = require('../middleware/userLogin')

router.use(userLogin)

module.exports = router
