const users = require('../models/usersModel')
const blogs = require('../models/blogModel');
const blogRouter = require('express').Router();




//CREATE A BLOG
blogRouter.post('/', async(req, res)=>{
   try {
   
       const {title, description, body, tags,author, userName} = req.body
       const readingTime = getReadingTime(body)
       const newBlog = new blogs({
         title,
        description,
        userName: userName,
        body,
        tags,
        readingTime,
        author,
    })
       const blog = await newBlog.save() 
       res.status(200).json(blog)
    
   } catch (error) {
    res.status(500).json(error.message)
    
   }
})

const getReadingTime = (body) => {
    const wordPerMinute = 150;
    const numOfWord = body.split(" ").length
    const minute = numOfWord / wordPerMinute
    const readingTime = Math.ceil(minute)
    return readingTime
}
//GET A BLOG
blogRouter.get('/:id', async(req, res)=>{
    const id = req.params.id
  
    try {
       const blog =  await blogs.findById(id)
        let state = blog.state
        if(state === "draft"){
            blog.readCount = 0
        }else{ 
            blog.readCount++
        }
       
       await blog.save()
       res.status(200).json({blog})
      
     } catch (error) {
    res.status(500).json(error.message)
    }
    
})


blogRouter.get('/', async(req, res)=>{
    // const owner = req.body.userName
    // const state = req.body.state
    const {author, title, tagName, state} = req.query
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit
   
    try {
        let blogPost;
       if(author){
        blogPost = await blogs.find({author}).sort({readCount: -1, timestamps: -1}).skip(skip).limit(limit)
       } else if(title){
        blogPost = await blogs.find({title})
       } else if(tagName){
        blogPost = await blogs.find({
            tags:[tagName]
        })
       }else{
        blogPost = await blogs.find()
       }
      
       res.status(200).json({blogPost})
      
     } catch (error) {
    res.status(500).json(error.message)
    }
    
})
// UPDATE A BLOG
blogRouter.put('/:id', async(req, res) =>{
    const id  = req.params.id;
    const  state  = req.body.state;

    try {
       
        const blog = await blogs.findById(id)

        if(blog.userName === req.body.userName){
            try {
                const updatedBlog = await blogs.findByIdAndUpdate(id, {new: true})
                updatedBlog.state = state
               await updatedBlog.save()
               res.status(200).json(updatedBlog)
               
            } catch (error) {
                res.status(500).json(error)
                
            }
        }else{
            res.status(401).json("Unauthorized")
        }
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})
// DELETE A BLOG
blogRouter.delete('/:id', async(req, res) =>{
    const id  = req.params.id;
    const  state  = req.body.state;

    try {
       
        const blog = await blogs.findById(id)
        
        if(blog.userName === req.body.userName){
            try {
                blog.state = state
               await blogs.deleteOne()
               res.status(200).json("Deleted")
               
            } catch (error) {
                res.status(500).json(error)
                
            }
        }else{
            res.status(401).json("Unauthorized")
        }
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

module.exports = blogRouter
