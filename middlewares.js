// checkAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) { return next() }
//     res.redirect("/")
//   }

// module.exports = checkAuthenticated; 

module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/dashboard');
    }
  },
}