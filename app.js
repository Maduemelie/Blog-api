const express = require('express');
const userRouter = require('./Routes/auth')
const blogRouter = require('./Routes/blogPosts')
const connectToDb = require('./db/mongooseDb')
const cookieParser = require('cookie-parser')

require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 6000


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))


app.use('/users', userRouter)
app.use('/blogs', blogRouter)


app.get('/',(req, res)=>{
    res.json({message: " Welcome to my blog"})
})

connectToDb()

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
})
