import fs from 'fs'

export class fileEditor{
    constructor(file){
        this.file = file
    }

    get content (){
        let jsonString = fs.readFileSync(this.file)
        return JSON.parse(jsonString)
    }

    set content(petsParsed){
        fs.writeFileSync(this.file, JSON.stringify(petsParsed))
    }

    read(index){
        let petsParsed = this.content
        if(!index){
            return JSON.stringify(petsParsed)
        }
        return JSON.stringify(petsParsed[index])
    }

    modify(cb){
        const fileContents = this.content
        cb(fileContents)
        this.content = fileContents
    }

    add(obj){
        this.modify((arr)=>{
            arr.push(obj)
        })
    }

    update(index, obj){
        this.modify((arr)=>{
            Object.assign(arr[index], obj)
        })
    }

    delete(index){
        this.modify((arr)=>{
            arr.splice(index, 1)
        })
    }
}