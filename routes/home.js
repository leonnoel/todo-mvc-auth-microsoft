const express = require('express') //requires express module and saves it to express variable
const router = express.Router() //starts the router by calling router function on express module
const homeController = require('../controllers/home') //requires the homeController module

router.get('/', homeController.getIndex) //listens for a get request on the home route and resonds with the getIndex function from the homeController, serving up index.ejs

module.exports = router //exports router variable