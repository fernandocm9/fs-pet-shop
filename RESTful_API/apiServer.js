import express from 'express'
import {fileEditor} from './classes.js'
const app = express()
const PORT = 3000
const pets = new fileEditor('./pets.json')

app.use(express.json())
app.get('/pets', (req,res)=>{
    const petData = pets.content
    res.json(petData)
})

app.get('/pets/:id', (req, res)=>{
    res.json(pets.content[req.params.id])
})


app.post('/pets', (req, res)=>{
    pets.add(req.body)
    res.json({
        message: 'pet added'
    })
})

app.patch('/pets/:id', (req, res)=>{
    pets.update(req.params.id, req.body)
    res.json({
        message: 'updated'
    })
})

app.delete('/pets/:id', (req, res)=>{
    pets.delete(req.params.id)
    res.json({
        message: 'deleted pet'
    })
})

app.use((req, res)=>{
    res.statusCode = 404
    res.json({
        message: '404 not found'
    })
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})