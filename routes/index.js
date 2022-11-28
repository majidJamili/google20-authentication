const express = require('express'); 
const passport = require('passport');
const router  = express.Router(); 
const { ensureAuth, ensureGuest } = require('../middlewares'); 
const Line = require('../models/Line'); 
const User = require('../models/User');
const session = require('express-session');




//Login and Landing Page:


router.get('/google' , passport.authenticate('google', { scope:
    ['profile']
}));

router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/google/callback/failure'
}));

router.get('/',ensureGuest, (req, res) => {
    //res.send("<button><a href='/google'>Login With Google</a></button>")
    res.render('login', {layout:'login'}); 
});
router.get('/dashboard', ensureAuth, async (req, res) => {

    try {
        console.log(req.user)


        const lines = await Line.find({ user: req.user.id }).lean()
        res.render('dashboard', { name: req.user.firstName, lines });
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})



router.get('/google/callback/failure' , (req , res) => {
    res.render('error/404')
})

router.get('/protected',ensureAuth, (req,res)=>{
    res.send('It was a protected page')
});


router.get('/logout', (req, res, next) => {


    req.logout((error) => {
        if (error) { return next(error) }
        res.redirect('/')
    })
})

module.exports = router; 