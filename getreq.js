const getreq = (req, res) =>{
    const baseurl = req.url.substring(0, req.url.lastIndexOf("/") );

    console.log(baseurl)

    let id = req.url.split("/")[3];

    console.log(id)

    if(req.url === "/api/movies"){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    }
    else if(baseurl === "/api/movies" && id.length !== 0){
        // client requested for a id 
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        let filteredMovies = req.movies.filter((elem)=>{
            return elem.id === id;
        })

        if(filteredMovies.length > 0){
        res.write(JSON.stringify(
            filteredMovies
        ));
        }
        else{
            res.statusCode= 404;
            res.write(JSON.stringify(
                {
                    error: "Movie with this ID not found"
                }
            ));
        }
        res.end();
    }
    else{
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(
            {
                title: "Not found",
                message: "The requested resource was not found."
            }
        ));
    }
}

module.exports = getreq;