const express = require('express') //requires the express module and saves it to express variable
const passport = require('passport') //requires the passport module and saves it to the passport variable
const config = require('../config/config') //requires the config module imported from the config.js file
const router = express.Router() //starts the router using the router function built into express


router.get('/login', //listen for activity at /login route
  function(req, res, next) { //callback function takes in req/res/next
    passport.authenticate('azuread-openidconnect', //connect to azure authentication, 
      { 
        response: res,                      // response recived assigned as res
        resourceURL: config.resourceURL,    //check config for URL
        customState: 'my_state',            // current auth state
        failureRedirect: '/'                // if fail reload   
      }
    )(req, res, next);                     //pass params to 
  },
  function(req, res) {                // another function
    console.log('Login was called in the Sample'); //console log string
    res.redirect('/todos');           //redirect response to todos page
});

router.get('/openid/return', //listens for req to the /openid/return route
  function(req, res, next) { //sets the callback function and parameters req, res, next
    passport.authenticate('azuread-openidconnect', //calls authenticate on passport
      { 
        response: res,    //sets response to res param
        failureRedirect: '/'  //redirects to home page if failed
      }
    )(req, res, next); //passes in req, res, and next params
  },
  function(req, res) { //sets the second callback function with req, res params
    console.log('We received a return from AzureAD.'); //logs success message to console
    res.redirect('/todos'); //redirects to the todos page
  });

router.post('/openid/return',  //post listens for activity at /openid/return
  function(req, res, next) { //callback function that takes in req, res, next
    passport.authenticate('azuread-openidconnect',  //call authenticate on passport, pass in a string and an object
      { 
        response: res,    //containing response: (whatever the response was)
        failureRedirect: '/'  //and a failureRedirect set to the home route
      }
    )(req, res, next); //pass those same three parameters to that function
  },
  function(req, res) { //another function, takes in 
    console.log('We received a return from AzureAD.'); //logs success message to console
    res.redirect('/todos'); //redirects to the todos page
  });


router.get('/logout', function(req, res){ //get request to logout
  req.session.destroy(function(err) {  //to destroy session
    req.logOut(); //request to logo
    res.redirect(config.destroySessionUrl);
  });
});

module.exports = router //exports the router variable
