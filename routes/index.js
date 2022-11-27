const express = require('express'); 
const passport = require('passport');
const router  = express.Router(); 
const { ensureAuth, ensureGuest } = require('../middlewares'); 
const Line = require('../models/Line'); 


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

        const lines = await Line.find({}).lean()
        res.render('dashboard', { name: req.user.given_name, lines });
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})



router.get('/google/callback/failure' , (req , res) => {
    res.send("Error");
})

router.get('/protected',ensureAuth, (req,res)=>{
    res.send('It was a protected page')
});


router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { 
        return next(err); 
        }
      res.redirect('/');
    });
  });

module.exports = router; 