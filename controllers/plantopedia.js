let userLogin = require('../middleware/userLogin')
let router = require('express').Router()
let db = require('../models')

router.use(userLogin)

//GET / -returns all plants in database
router.get('/', (req, res) => {
    db.plant.findAll({
        order: ['commonName']
    })
    .then(result => {
        console.log("USER:", req.user)
        db.wishlist.findAll(
            { where: {
                userId: req.user.id
            }
        })
        .then(faves => {
            console.log("FAVES", faves)
            res.render('plants/index', {result, faves})
        })
        .catch(err => {
            console.log("ERROR in faves", err)
        }) 
    })
    .catch(err => {
        console.log("ERROR in get", err)
    })  
})

module.exports = router