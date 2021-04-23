const express = require('express') //require express module
const app = express() //invoke express
const mongoose = require('mongoose') //works data model
const passport = require('passport') //for authentication
const session = require('express-session') //for user sessions
const MongoStore = require('connect-mongo')(session) //storing the user session on mongoDB
const connectDB = require('./config/database') //database module we set up
const authRoutes = require('./routes/auth') //authorization routes
const homeRoutes = require('./routes/home') //routes to access home page
const todoRoutes = require('./routes/todos') //routes to access todos page

require('dotenv').config({path: './config/.env'}) //require dotenv, call config, pass in the file path for all of our passwords 

// Passport config
require('./config/passport')(passport) //require config file for ms authentication

connectDB() //connects server to the database

app.set('view engine', 'ejs') //allows for access to ejs files
app.use(express.static('public')) //allows for access to the public folder
app.use(express.urlencoded({ extended: true })) //adds .body to request from client side
app.use(express.json()) //parse as json

// Sessions  //middleware for storing user sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize()) //no idea
app.use(passport.session())   //login session

  
app.use('/', homeRoutes) //when a request is made to '/', homeRoutes will handle it
app.use('/auth', authRoutes) //when a request is made to '/auth', authRoutes will handle it
app.use('/todos', todoRoutes) //when a request is made to '/todos', todoRoutes will handle it
 
app.listen(process.env.PORT, ()=>{ //starts the server
    console.log('Server is running, you better catch it!') //logs success message to server console
})    