const requestBodyParser = require('./utils/requestBodyParser.js')
const write_to_file = require('./utils/write_to_file.js');

const putreq = async (req, res) =>{
    const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") );
    const id = req.url.split("/")[3];

    if(id === ""){
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('id is required');
        res.end();  
    }
    else if( baseUrl === "/api/movies" && id){
        try{
            let body = await requestBodyParser(req);
            const index = req.movies.findIndex((elem)=>{
                return elem.id === id;
            })

        if(index === (undefined || -1) ){
            res.writeHead(404, {'Content-Type': 'Application/json'});
            res.write(JSON.stringify(
                {
                    title: "movie not found",
                    message: `movie with id ${id} not found`,
                }
            ))
            res.end();
        }
        else{
            req.movies[index] = {id, ...body};
            write_to_file(req.movies);
            res.writeHead(200, {'Content-Type': 'Application/json'});
            res.write(JSON.stringify(req.movies));
            res.end();
        }

        }catch(e){
            console.log(e.message);
            res.writeHead(400, {'Content-Type': 'Application/json'});
            res.end(JSON.stringify(
                {
                    error: e.message
                }
            ))
        }
    }
    else{
        res.writeHead(400, {'Content-Type': 'Application/json'});
        res.write(JSON.stringify(
            {
                title: "bad request",
                message: "wrong url",
            }
        ));
        res.end();
    }


}

module.exports = putreq;