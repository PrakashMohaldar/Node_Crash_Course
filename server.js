const http = require("http")
require('dotenv').config()
const getreq = require('./getreq.js')
const postreq = require('./postreq.js')
const deletereq = require('./deletereq.js')
const putreq = require('./putreq.js')

// fetching JSON data from database
let movies = require('./data/movies.json')

const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res)=> {
    // after fetching data from database
    req.movies = movies;

    switch(req.method){
        case "GET":
            getreq(req, res)
            break;
        case "POST":    
            postreq(req, res)
            break;
        case "PUT":
            putreq(req, res)
            break;
        case "DELETE":
            deletereq(req, res)
            break;
        default:
            res.statusCode=200
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify({
                message: "Hello to server using node"
            }))
            res.end()
    }

})

server.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})