const path = require('path')
const fs = require('fs')
const http = require('http')
const routes = require('./routes')
const dataPath = path.join(__dirname, 'pets.json')
const port = 8000

const server = http.createServer(function(req, res){
    if(req.method === 'GET'){
        if(routes[req.url] !== undefined){
            fs.readFile(dataPath, 'utf8', function(err, data){
                if(err){
                    console.error(err)
                } else {
                    res.setHeader('Content-Type', 'application/json')
                    res.statusCode = 200
                    let pets = JSON.parse(data)
                    routes[req.url](req, res, pets)
                }
            })
        } else {
            res.setHeader('Content-Type', 'text/plain')
            res.statusCode = 404
            res.end('Not Found')
        }

        
    }
})

server.listen(port, function(){
    console.log(`Listening on port: ${port}`)
})

