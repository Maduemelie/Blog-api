const blogs = require('../models/blogModel');
const blogRouter = require('express').Router();
const  isAuthenticated = require('../middleware/authmiddleware.js')
const users = require('../models/usersModel')
const jwt = require('jsonwebtoken')









//CREATE A BLOG
blogRouter.post('/', isAuthenticated,async (req, res)=>{
//    const token = req.cookies.jwt
//    const userPayload = jwt.verify(token, process.env.JWT_SECRET)
  
   
    // const user = await users.findById(id)
   
    // const userid = {
    //     id: user._id
    // }
    //
   
    
    // console.log(user)
    // console.log(userid)
       try {
           const { title, description, body, tags } = req.body
           const { id } = req.user
        //    console.log(id)
           const user = await users.findById(id)
           const author = `${user.firstName} ${user.lastName}`
           const readingTime = getReadingTime(body)
           const newBlog = new blogs({
               title,
               description,
               body,
               author,
               tags,
              readingTime,
               user: user._id,
           })
           const blog = await newBlog.save()
           user.blogs = user.blogs.concat(newBlog._id);
           res.status(200).json({ blog })

       } catch (error) {
    res.status(500).json(error.message)
    
   }
})

const getReadingTime = (body) => {
    const wordPerMinute = 150;
    const numOfWord = body.split(" ").length
    const minute = numOfWord / wordPerMinute
    const readingTime = Math.ceil(minute)
    return` ${readingTime} Minute Read Time`
}


//GET A BLOG
// blogRouter.get('/:id', async(req, res)=>{
    
  
//     try {
//         const id = req.params.id
//        const blog =  await blogs.findById(id).where({state:"published"})
//        if(!blog){
//         res.status(404).json("NO blog found!")
//        }
//         blog.readCount++
//         await blog.save()
//      return   res.status(200).json(blog)
      
//      } catch (error) {
//  return  res.status(500).json(error.message)
//     }
    
// })

//GET ALL BLOGS
blogRouter.get('/', async(req, res)=>{
    // const owner = req.body.userName
    // const state = req.body.state
    const {author, title, tagName} = req.query
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit
   
    try {
        let blogPost;
       if(author){
        blogPost = await blogs.find({author})
            .where({state: "published"})
            .sort({readCount: -1, timestamps: -1, readingTime: -1})
            .skip(skip).limit(limit)
       } else if(title){
        blogPost = await blogs.find({title})
            .where({ state: "published" })
            .sort({ readCount: -1, timestamps: -1, readingTime: -1 })
            .skip(skip).limit(limit)
       } else if(tagName){
        blogPost = await blogs.find({
            tags:[tagName]
                .where({ state: "published" })
                .sort({ readCount: -1, timestamps: -1, readingTime: -1 })
                .skip(skip).limit(limit)
        })
       }else{
        blogPost = await blogs.find()
            .where({ state: "published" })
            .sort({ readCount: -1, timestamps: -1, readingTime: -1 })
            .skip(skip).limit(limit)
       }
      
       res.status(200).json({blogPost})
      
     } catch (error) {
    res.status(500).json(error.message)
    }
    
})
// UPDATE A BLOG
blogRouter.put('/:id', isAuthenticated, async(req, res) =>{
    
    try {
        const id = req.params.id;
        const user = req.user
        const { title, description, state, tags, body } = req.body
        const readingTime = getReadingTime(body)

       
        const blog = await blogs.findById(id)
 
        if(blog.user._id.toString()=== user.id){
            try {
                const updatedBlog = await blogs.findByIdAndUpdate(id, 
                     { title, description, state, tags, body,readingTime },
                    {new: true})
                    
               await updatedBlog.save()
               res.status(200).json(updatedBlog)
               
            } catch (error) {
                res.status(500).json(error.message)
                
            }
        }else{
            res.status(401).json("Unauthorized")
        }
        
    } catch (error) {
        res.status(500).json(error.message)
        
    }
})


//GETTING PERSONAL BLOG
blogRouter.get('/:userid', isAuthenticated, async(req, res)=>{
    try {
        const user= req.user
        // const user = users.findById(id)
        // console.log(id)
        // console.log(user)

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const skip = (page - 1) * limit
        const userBlogs = await blogs.find({user:user._id})
          .skip(skip)
            .limit(limit).populate('user', { firstName: 1, lastName: 1, _id: 1 })
         return res.status(200).json(userBlogs)
    } catch (error) {

            return  res.status(500).json(error.message)
    }

})

// DELETE A BLOG
blogRouter.delete('/:id', isAuthenticated, async(req, res) =>{
    
    try {
        const id = req.params.id;
        const user = req.user

        const blog = await blogs.findById(id)
        
        if (blog.user._id.toString() === user.id){
            try {
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
