const express = require('express');
const app = express()
const userRouter = require('./Routes/auth')
const connectToDb = require('./db/mongooseDb')

const PORT = process.env.PORT || 6000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', userRouter)


app.get('/',(req, res)=>{
    res.send({status: true})
})

connectToDb()

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
})