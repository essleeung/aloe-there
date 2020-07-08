let router = require('express').Router()
let db = require('../models')
let userLogin = require('../middleware/userLogin')
let moment = require('moment')
let mapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.GMAP_API}&libraries=places&callback=initAutocomplete` 


router.use(userLogin)

// GET - show all events to user
router.get('/events', (req, res) => {
    db.event.findAll({
        order: ['date']
    })
    .then(events => {
        res.render('community/events', {events, mapURL, moment})
    })
    .catch(err => {      
        console.log('Error on creating an event post', err)
        res.status(500).send({message: "error!,", err})
    })
})

// GET - render event form for user to fill in
router.get('/events/create', (req, res) => {
    res.render('community/create', {mapURL, moment})
})

// POST - add event form data to database
router.post('/events', (req, res) => {
    db.event.create(req.body)
    .then(() => {
        res.redirect('/community/events')
    })
    .catch(err => {      
        console.log('Error on creating an event post', err)
        res.status(500).send({message: "error!", err})
    })
})

//GET- render edit page for current user  to edit their own posts
router.get('/events/:id/edit', (req, res) => {
    db.event.findByPk(req.params.id)
    .then(post => {
        if (req.user.id === post.userId) {
            res.render('community/editEvent', {post, mapURL})
        } else {
            res.redirect('/community/events')
        }
        
    })
    .catch(err => {      
        console.log('Error on creating an event post', err)
        res.status(500).send({message: "error!", err})
    })
})

//PUT- edit events that user created
router.put('/events/:id', (req, res) => {
    db.event.update(req.body, 
        { where: { id: req.params.id}
    })
    .then(() => {
        res.redirect('/community/events')
    })
    .catch(err => {      
        console.log('Error on creating an event post', err)
        res.status(500).send({message: "error!", err})
    })
})

//DELETE -delete events that user created
router.delete('/events/:id', (req,res) => {
    db.event.destroy({
        where: { id: req.params.id}
    }).then(() => {
        res.redirect('/community/events')
    })
    .catch(err => {      
        console.log('Error on creating an event post', err)
        res.status(500).send({message: "error!", err})
    })
})

//GET- future trading functionality will go here
router.get('/trade', (req, res) => {
    res.render('comingSoon')
})

module.exports = router
