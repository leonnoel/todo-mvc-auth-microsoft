const mongoose = require('mongoose') //require mongoose module

const UserSchema = new mongoose.Schema({ //setting up a new Schema called UserSchema
  microsoftId: { //has a microsoftId property
    type: String, // which has a type String
    required: true, // and a required property set to true
  },
  displayName: { //property of displayName
    type: String, //set to a String type
    required: true, //is required
  }
})

module.exports = mongoose.model('User', UserSchema) //exports UserSchema in a mongoose model called User