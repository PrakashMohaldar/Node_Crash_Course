const requestBodyParser = require('./utils/requestBodyParser.js');
const writetofile = require('./utils/write_to_file.js');

const postreq = async (req, res) =>{
    if(req.url === "/api/movies"){
        try{
            console.log("Request body: ", req.body);
            const body = await requestBodyParser(req)
        
            console.log("new Request body: ", body)
            
            // writing to database
            req.movies.push(body)
            writetofile(req.movies)

            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end();

        }catch(e){ 
            res.statusCode = 400;
            console.log(e);
            res.setHeader('Content-Type', 'application/json');
            res.end(
                JSON.stringify({
                    title: "post request failed",
                    message: e.message
                })
            );
        }
    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(
            JSON.stringify({
                title: "post request failed",
                message: "not found"
            })
        );
    }
}

module.exports = postreq;