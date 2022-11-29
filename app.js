const dotenv = require("dotenv"); 
// if (process.env.NODE_ENV !== "production") {
//     dotenv.config();
// }

dotenv.config();

const isLoggedIn = require('./middlewares')
const path = require('path')
const express = require('express')
const passport = require('passport')
const app = express()
const cookieSession = require('cookie-session')
const cookieParser = require("cookie-parser")
const exphbs = require('express-handlebars') 
const connectDB = require('./config/db') 
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')

connectDB()


// Body Praser: 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }


// Handlebars Helpers: 
const {formatDate, truncate, stripTags, editIcon, select } = require('./helpers/hbs')

//HandleBars: 
app.engine( '.hbs', exphbs.engine({ 
                    helpers: {
                        formatDate, 
                        truncate, 
                        stripTags, 
                        editIcon, 
                        select },
                    defaultLayout: 'main',  extname: '.hbs'}))
app.set('view engine', '.hbs');

//Static Folder Set-up:
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Overriding unsupported requests: 
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
  )



const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI}),
}; 
app.use(session(sessionConfig)); 

//Passport Middlewares:

app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport); 

//Set Global Variables: 
//@ sets the local variable to the global variable that is logged in user
app.use(function(req,res,next){
    res.locals.user = req.user || null
    next()
})


//Routes:
app.use('/',require('./routes/index'))
app.use('/lines', require('./routes/lines'))





const PORT = process.env.PORT; 

app.listen(PORT, function(){
    console.log(`App connected in port: ${PORT}`); 
})