const express = require('express') // creates express variable and assigns it express module  
const router = express.Router()  // create router variable and assign to exported router
const todosController = require('../controllers/todos') //does things?

const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos) //Route to get list of todos after successful authentication

router.post('/createTodo', todosController.createTodo)  //to post a new todo

router.put('/markComplete', todosController.markComplete) //to mark as complete 

router.put('/markIncomplete', todosController.markIncomplete) //to mark as incomplete

router.delete('/deleteTodo', todosController.deleteTodo)  //to delete a todo

module.exports = router   //export router module