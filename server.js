const path = require('path')
const fs = require('fs')
const http = require('http')
const url = require('url')
const dataPath = path.join(__dirname, 'pets.json')
const port = 8000

const server = http.createServer(function(req, res){
    
    fs.readFile(dataPath, 'utf8', function(err, petsJSON){
        if(err){
            console.error(err)
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(petsJSON)
        }

    })
})

server.listen(port, function(){
    console.log(`Listening on port: ${port}`)
})