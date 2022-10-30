const users = require('../models/usersModel');
const blogs = require('../models/blogModel');
const blogRouter = require('express').Router();


//CREATE A BLOG
blogRouter.post('/', async(req, res)=>{
   try {
       const newBlog = new blogs(req.body)
       const blog = await newBlog.save() 
       res.status(200).json(blog)
    
   } catch (error) {
    res.status(500).json(error)
    
   }
})

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

module.exports = blogRouter
