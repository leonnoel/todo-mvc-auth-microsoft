module.exports = {
    ensureAuth: function (req, res, next) { //ensureAuth funtion takes in req, res, and next
      if (req.isAuthenticated()) { //checks if user is is authenticated
        return next() //if authenticated starts the next function
      } else {
        res.redirect('/') //if not authenticated redirects to home page
      }
    },
    ensureGuest: function (req, res, next) { //opposite of ensureAuth
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/dashboard');
      }
    },
  }
   