module.exports = { //exports the getIndex function
    getIndex: (req,res)=>{ //listens for request
        res.render('index.ejs') //responds with index.ejs file
    }
}