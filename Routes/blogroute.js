const blogRouter = require('express').Router();
const  isAuthenticated = require('../middleware/authmiddleware.js')
const blogcontroller = require('../controller/blogcontroller')







blogRouter
.route('/')
    .get(blogcontroller.getAllBlogs)
    .post(isAuthenticated, blogcontroller.createBlog)


blogRouter.route('/:id').get( blogcontroller.getABlog)

blogRouter
.route('/owner/:id')
    .get(isAuthenticated, blogcontroller.getUserBlogs)
    .put(isAuthenticated,blogcontroller.updateBlog)
    .delete(isAuthenticated,blogcontroller.deleteBlog)



module.exports = blogRouter
