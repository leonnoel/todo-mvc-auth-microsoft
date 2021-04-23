const Todo = require('../models/Todo') //require the data moded for todo items

module.exports = { //exports all of the functions used to handle requests
    getTodos: async (req,res)=>{ //async function that takes in request and response
        console.log(req.user) //logs current user to the console
        try{ //starts try block
            //Do we want to grab all the todos?
            const todoItems = await Todo.find() //gets all of the todos from the logged in user
            //How can we grab our logged in users left to dos?
            const itemsLeft = await Todo.countDocuments({completed: false}) //gets only the not completed todos from the log in user
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user}) //renders the todos.ejs file with the passed in todos from database
        }catch(err){ //catches errors
            console.log(err) //logs error to console
        }
    },
    createTodo: async (req, res)=>{// async function 
        try{//start try block
            await Todo.create({todo: req.body.todoItem, completed: false, microsoftId: req.user.microsoftId})// creates new db item from input toDoitem
            console.log('Todo has been added!')// confirms item has been added
            res.redirect('/todos') //reloads page
        }catch(err){//oops 
            console.log(err)//oops message
        }
    },
    markComplete: async (req, res)=>{ //async function that takes in the request/response info
        try{ //start try block
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{ //finds the item that matches the ID provided in the request body and updates it
                completed: true //changes the value of completed to true
            })
            console.log('Marked Complete') //logs success message to console
            res.json('Marked Complete') //response to the request with json success message
        }catch(err){ //catches errors
            console.log(err) //logs error to console
        }
    },
    markIncomplete: async (req, res)=>{ //async function, takes in two params, req and res
        try{ //start try block
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{ //wait for req, call findOneAndUpdate on Todo, update the one that has _id with req.body.todoIdFromJSFile...
                completed: false //set completed to false
            })
            console.log('Marked Incomplete') //log to server 'Marked Incomplete'
            res.json('Marked Incomplete') //send back a response to client side 'Marked Incomplete'
        }catch(err){ //catch block for error, takes in err
            console.log(err) //if there is an error, will console.log err
        }
    },
    deleteTodo: async (req, res)=>{  //async function 
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile}) // find the item by ID and use mongoDB method to delete it.
            console.log('Deleted Todo')  
            res.json('Deleted It')
        }catch(err){
            console.log(err) //log error if any
        }
    }
}    