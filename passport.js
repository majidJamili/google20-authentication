const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('./models/User')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, // Your Credentials here.
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Credentials here.
        callbackURL: process.env.REDIRECT_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }

        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}


// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
// const User = require('./models/User');




// passport.use(new GoogleStrategy({
//           clientID:process.env.GOOGLE_CLIENT_ID, // Your Credentials here.
//         clientSecret:process.env.GOOGLE_CLIENT_SECRET, // Your Credentials here.
//         callbackURL:process.env.REDIRECT_URL,

//   },
//   async function(request, accessToken, refreshToken, profile, done) {
//     // console.log(profile)
//     return done(null, profile);
//             const newUser = {
//               googleId: profile.id,
//               displayName: profile.displayName,
//               firstName: profile.name.givenName,
//               lastName: profile.name.familyName,
//               image: profile.photos[0].value,
//               email: profile.email
//             }
//         try {
//             let user = await User.findOne({googleId:profile.id})
//             if (user){
//               done(null, user);
//               console.log(user);
//             }else{
//               let user = await User.create(newUser);
//               console.log(user);
//               done(null, user)
//             }

//         } catch (error) {
//           console.error(error)
//         }


//   }
// ));


// passport.serializeUser((user, done) =>{
//   done(null, user);
// });

// passport.deserializeUser((user, done)=> {
//     //done(null, user);
//   User.findById(user.id, (err,user) => done(null, user))
// })





