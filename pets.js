const fs = require('fs')
const process = require('process')




function throwError(str){
    console.error(`Usage: node pets.js ${str}`)
    process.exitCode = 1
}

if(process.argv.length < 3){
    throwError('[read | create | update | destroy]')
}



if(process.argv[2] === 'read'){
    fs.readFile('./pets.json', 'utf8', (err, data)=>{
        if(err){
            console.err(err)
        }
        let pets = JSON.parse(data)
        
        let index = process.argv[3]
        
        if(pets[index] === undefined){
            throwError('read index')
        } else {
            console.log(pets[index])
        }
    })
}



if(process.argv[2] === 'create'){
    if(process.argv.length < 6){
        throwError('create AGE KIND NAME')
    } else {

        let addObj = {}
        let age = process.argv[3]
        let kind = process.argv[4]
        let name = process.argv[5]
        addObj['age'] = parseInt(age)
        addObj['kind'] = kind
        addObj['name'] = name
    
        fs.readFile('./pets.json', 'utf8', (err, data)=>{
            if(err){
                console.error(err)
            }
            let pets = JSON.parse(data)
            pets.push(addObj)
            let jsonStr = JSON.stringify(pets)
            fs.writeFile('./pets.json', jsonStr, (err) =>{
                if(err){
                    console.err('not working')
                } else {
                    
                    console.log(addObj)
                }
            })
        })
    }
}