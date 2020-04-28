let router = require('express').Router()
let db = require('../models')

//GET / -returns all plants in database
router.get('/', (req, res) => {
    db.plant.findAll({
        order: ['commonName']
    })
    .then(result => {
        res.render('plants/index', {result})
    })
    .catch(err => {
    })  
})

module.exports = router