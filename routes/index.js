const express = require('express'); 
const passport = require('passport');
const router  = express.Router(); 
const isLoggedIn = require('../middlewares'); 

//Login and Landing Page:
router.get('/', (req, res) => {
    //res.send("<button><a href='/google'>Login With Google</a></button>")
    res.render('login', {layout:'login'}); 
});

router.get('/google' , passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
}));

router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/google/callback/failure'
}));


router.get('/dashboard' , (req , res) => {
    // res.send("Welcome " + req.user.email);
    res.render('dashboard',req.user )

});



router.get('/google/callback/failure' , (req , res) => {
    res.send("Error");
})

router.get('/protected',isLoggedIn, (req,res)=>{
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