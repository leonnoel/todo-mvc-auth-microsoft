const mongoose = require('mongoose') //require mongoose module

const TodoSchema = new mongoose.Schema({ //create a new Schema called TodoSchema
  todo: { //which has a todo property
    type: String, //with a type String
    required: true, //and is required
  },
  completed: { //also has a completed property
    type: Boolean, //with a boolean type
    required: true, // and is also required
  },
  microsoftId: { //microsoftId property
    type: String, //with type String
    required: true //is required
  }
})

module.exports = mongoose.model('Todo', TodoSchema) //exports the TodoSchema in a mongoose model called ToDo
