const mongoose = require('mongoose') //require mongoose

const connectDB = async () => { //async function that connects to database
  try { //start try block
    const conn = await mongoose.connect(process.env.DB_STRING, { //wait for connection to db, pass in the db string
      useNewUrlParser: true,
      useUnifiedTopology: true, //avoid errors
      useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) { //catches errors
    console.error(err) //logs error console
    process.exit(1) //exits the function
  }
}

module.exports = connectDB //export this async function
