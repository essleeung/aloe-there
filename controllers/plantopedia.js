let router = require('express').Router()
let db = require('../models')
let getResults = require('../scraper')


router.get('/', (req, res) => {
    const result = await getResults()
    res.render('plants/index', {result})
})

module.exports = router