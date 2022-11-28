const dotenv = require("dotenv"); 
// if (process.env.NODE_ENV !== "production") {
//     dotenv.config();
// }

dotenv.config();

const isLoggedIn = require('./middlewares'); 

const path = require('path'); 
const express = require('express'); 
const passport = require('passport');
const app = express();
const cookieSession = require('cookie-session'); 
const cookieParser = require("cookie-parser");
const exphbs = require('express-handlebars') 
const connectDB = require('./config/db'); 
const morgan = require('morgan'); 
const mongoose = require('mongoose'); 
const session = require('express-session');
const MongoStore = require('connect-mongo');

connectDB()

// Body Praser: 

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

//HandleBars: 
app.engine( '.hbs', exphbs.engine({ defaultLayout: 'main',  extname: '.hbs'}))
app.set('view engine', '.hbs');

//Static Folder Set-up:
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: false,

    // cookie: {
    //     httpOnly: true,
    //     expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    //     maxAge: 1000 * 60 * 60 * 24 * 7
    // },
    //store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI_LOCAL }),
}; 
app.use(session(sessionConfig)); 

//Passport Middlewares:

app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport); 

//Routes:

app.use('/',require('./routes/index'))
app.use('/lines', require('./routes/lines'))





const PORT = process.env.PORT; 

app.listen(PORT, function(){
    console.log(`App connected in port: ${PORT}`); 
})