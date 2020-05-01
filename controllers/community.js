let router = require('express').Router()
let db = require('../models')
let userLogin = require('../middleware/userLogin')
let mapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.GMAP_API}&libraries=places&callback=initAutocomplete` 


router.use(userLogin)

// GET - show all events to user
router.get('/events', (req, res) => {
    db.event.findAll({
        order: ['date']
    })
    .then(events => {
        res.render('community/events', {events})
    })
    .catch(err => {      
        console.log('Error on creating an event post', err)
        res.status(500).send({message: "error!", err})
    })
})

// GET - render event form for user to fill in
router.get('/events/create', (req, res) => {
res.render('community/create', {mapURL})
})

// POST - add event form data to database
router.post('/events', (req, res) => {
    db.event.create(req.body)
    .then(() => {
        res.redirect('/community/events')
    })
    .catch(err => {      
        console.log('Error on creating an event post', err)
        res.status(500).send({message: "error!"})
    })
})


module.exports = router
