require('dotenv').config()
// Node Modules/Variables
let router = require('express').Router()
let db = require('../models')
let passport = require('../config/passportConfig')
let mapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.GMAP_API}&libraries=places&callback=initAutocomplete` 


// Routes
// GET /auth/login - this is a page that renders the login form
router.get('/login', (req, res) => {
    res.render('auth/login')
})

// POST /auth/login - this is a place for the login form to post to
router.post('/login', passport.authenticate('local', {
    successFlash: 'successful login. welcome back',
    successRedirect: '/profile/user', 
    failureFlash: 'invalid credentials',
    failureRedirect: '/auth/login'
}))

// GET /auth/signup - this is a page that renders the signup form
router.get('/signup', (req, res) => {
    res.render('auth/signup', { data: {}, mapURL })
})

// POST /auth/signup
router.post('/signup', (req, res, next) => {
    console.log('REQUEST BODY', req.body)
    req.body.pic = req.body.pic || 'https://i.imgur.com/jIRfaSu.jpg'
    if (req.body.password !== req.body.password_verify) {
        // Send a message on why things didn't work
        req.flash('error', 'passwords do not match!')

        // Put the user back onto the signup form to try again
        res.render('auth/signup', { data: req.body, alerts: req.flash(), mapURL })
    }
    else {
        // Passwords matched, now we'll find/create by the user's email
        db.user.findOrCreate({
            where: { email: req.body.email },
            defaults: req.body
        })
        .then(([user, wasCreated]) => {
            if (wasCreated) {
                // Good - this was expected, they are actually NEW
                // TODO: AUTO-LOGIN
                passport.authenticate('local', {
                    successFlash: 'welcome back',
                    successRedirect: '/profile/user', 
                    failureFlash: 'invalid credentials',
                    failureRedirect: '/auth/login'
                })(req, res, next)
            }
            else {
                // Bad - this person actually already had an account (redirect them to login)
                req.flash('error', 'account already exists!')
                res.redirect('/auth/login')
            }
        })
        .catch(err => {
            // Print the whole error to the terminal
            console.log('Error creating a user', err)

            // Check for Sequelize validation errors (and make flash messages for them)
            if (err.errors) {
                err.errors.forEach(e => {
                    if (e.type == 'Validation error') {
                        req.flash('error', e.message)
                    }
                })
                
                // Put the user back onto the signup form to try again
                res.render('auth/signup', { data: req.body, alerts: req.flash(), mapURL })
            }
            else {
                // Generic message for any other issue
                req.flash('error', 'Server error')

                // Redirect back to sign up
                res.redirect('/auth/signup')
            }
        })
    }
})
router.get('/logout', (req,res) => {
    //remove user data from the session
    req.logout()
    req.flash('success', 'bye. see you next time.')
    res.redirect('/')
})



// Export (allow me to include this in another page)
module.exports = router