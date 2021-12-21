import express from 'express'
import {fileEditor} from './classes.js'
import {pool} from '../petShop_DB/index.js'
const app = express()
const PORT = 3000
const pets = new fileEditor('./pets.json')

app.use(express.json())

app.get('/pets', async (req,res)=>{
    try {
       const {rows} = await pool.query('SELECT * FROM pets ORDER BY id')
        res.send(rows) 
    } catch (err) {
        fiveHundErr(err, res)
    }
    
})

app.get('/pets/:id', async (req, res)=>{
    try {
        const {rows} = await pool.query(`SELECT * FROM pets WHERE id = ${req.params.id}`)
        if(!rows[0]){
            return res.status(404).json({message: 'pet does not exist'})
        }
        res.send(rows[0])
    } catch (err) {
        fiveHundErr(err, res)
    }
})


app.post('/pets', async (req, res)=>{
    try {
        let obj = {
            text: 'INSERT INTO pets (age, name, kind) VALUES ($1, $2, $3)',
            values: [req.body.age, req.body.name, req.body.kind]
        }
        const {rows} = await pool.query(obj)
        res.json({
            message: 'pet added'
        })
    } catch (err) {
        fiveHundErr(err, res)
    }
    
})

app.patch('/pets/:id', async (req, res)=>{
    try {
        const values = [req.body.age, req.body.name, req.body.kind, req.params.id]
        await pool.query(`UPDATE pets SET age = $1, name = $2, kind = $3 WHERE id = $4`, values)
        res.json({
            message: `pet ${req.params.id} was updated`
        })

    } catch (err) {
        fiveHundErr(err, res)
    }
    
})

app.delete('/pets/:id', async (req, res)=>{
    try {
        const {rows} = await pool.query(`SELECT * FROM pets WHERE id = ${req.params.id}`)
        if(!rows[0]){
            return res.status(404).json({message: `pet already doesn't exist`})
        }
        await pool.query(`DELETE FROM pets WHERE id = ${req.params.id}`)
        
        res.json({
            message: `pet ${req.params.id} was deleted`
        })
    } catch (err) {
        fiveHundErr(err, res)
    }
})

app.use((req, res)=>{
    res.statusCode = 404
    res.json({
        message: '404 not found'
    })
})

function fiveHundErr(err, res){
    res.status(500)
    res.json(err)
}

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})