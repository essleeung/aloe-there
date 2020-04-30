// *******************
// NODE MODULES
// *******************
//add in environment
require('dotenv').config()
//required node modules
let express = require('express')
let flash = require('connect-flash')
let layouts = require('express-ejs-layouts')
let session = require('express-session')

//create an app instance
let app = express()

//include passport (via the passport config file)
let passport = require('./config/passportConfig')

// *******************
// SETTINGS/MIDDLEWARE
// *******************

//set template lang to EJS
app.set('view engine', 'ejs')

//tell express to use layouts module
app.use(layouts)

//setup static folder
app.use(express.static('static'))

//decrypt the variables coming in via POST routes (from forms)
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//set up sessions- store data about a user and their browsing session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
    
}))
//set up connect-flash for the flash alert messages (depends on session, order matters)
app.use(flash())

// set up passport (depends on session, must come after it)
app.use(passport.initialize())
app.use(passport.session())

//custom middleware - make certain variables available to EJS pages through locals
//this happens on every route w/o having to paste it manually on every
//next is a callback function similar to async done
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next()
})


// *******************
// ROUTES
// *******************
//controllers
app.use('/auth', require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))
app.use('/plantopedia', require('./controllers/plantopedia'))
app.use('/community', require('./controllers/community'))


//create a home page route
app.get('/', (req,res) => {
    res.render('home')
})
//create a wild card (catch-all)
app.get('*', (req,res) => {
    res.render('error')
})

// *******************
// LISTEN
// *******************
//port to listen on
app.listen(process.env.PORT || 3000)