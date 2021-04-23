const deleteBtn = document.querySelectorAll('.del') //const for the delete buttons
const todoItem = document.querySelectorAll('span.not') //const for the todo items
const todoComplete = document.querySelectorAll('span.completed') //const for the completed todo items

Array.from(deleteBtn).forEach((el)=>{ //loop through each of the element of array of deleteBtn
    el.addEventListener('click', deleteTodo) // listen to the click event
})

Array.from(todoItem).forEach((el)=>{ //create array from todo items, loop through each todo item
    el.addEventListener('click', markComplete) //and add an event listener to each, listen for click, run markComplete when clicked
})

Array.from(todoComplete).forEach((el)=>{ //create array from completed todos, for each one
    el.addEventListener('click', markIncomplete) //add an event listener, listens for clicks, runs markIncomplete when clicked
})

async function deleteTodo(){// async function to delete to do items
    const todoId = this.parentNode.dataset.id //identify clicked item in db
    try{//tryblock starts
        const response = await fetch('todos/deleteTodo', {//make fetch request to db 
            method: 'delete',// tells db to delete item
            headers: {'Content-type': 'application/json'}, //says to expect some json
            body: JSON.stringify({ //stringify to make it so the JS can read JSON
                'todoIdFromJSFile': todoId //this is what is being stringified (the id of the todo item)
            })
        })
        const data = await response.json() //wait for reponse above
        console.log(data) //log the data that comes back from await above
        location.reload() //reload the current location
    }catch(err){ //catches errors
        console.log(err) //logs error to console
    }
}

async function markComplete(){ //async function called markComplete
    const todoId = this.parentNode.dataset.id //sets todoId variable to the id from the from the dataset of the parentNode
    try{ //starts try block
        const response = await fetch('todos/markComplete', { //makes a fetch request to the todos/markComplete route and savees it to the response variable
            method: 'put', //put method to update existing data
            headers: {'Content-type': 'application/json'}, //header format will be json
            body: JSON.stringify({ //turns the request body to json
                'todoIdFromJSFile': todoId //sets the property todoIdFromJSFile to the value of todoId estabilished earlier in function
            })
        })
        const data = await response.json() //saves the response variable as json to the data variable
        console.log(data) //logs the data variable to the console
        location.reload() //reloads the page
    }catch(err){ //catches errors
        console.log(err) //log error message if any
    }
}

async function markIncomplete(){  //async function Imcomplete
    const todoId = this.parentNode.dataset.id  //grab the id
    try{    // try catch 
        const response = await fetch('todos/markIncomplete', { //fetch target url
            method: 'put',                    //put method to modify existing data
            headers: {'Content-type': 'application/json'}, // stating the header format
            body: JSON.stringify({ // stringify to json
                'todoIdFromJSFile': todoId // the content to be stringify
            })
        })
        const data = await response.json() //set the res to a variable and log it.
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)  //log error if any
    }
}