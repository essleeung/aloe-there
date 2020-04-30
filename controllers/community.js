let router = require('express').Router()
let db = require('../models')
let userLogin = require('../middleware/userLogin')

router.use(userLogin)


router.get('/events', (req, res) => {
    res.render('community/events')
})
module.exports = router
