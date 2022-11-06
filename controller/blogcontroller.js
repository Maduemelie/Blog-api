const blogs = require('../models/blogModel');
const users = require('../models/usersModel')



//CREATE A BLOG
const createBlog =  async (req, res) => {
  
    try {
        const { title, description, body, tags } = req.body
        const { id } = req.user
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
}

const getReadingTime = (body) => {
    const wordPerMinute = 150;
    const numOfWord = body.split(" ").length
    const minute = numOfWord / wordPerMinute
    const readingTime = Math.ceil(minute)
    return ` ${readingTime} Minute Read Time`
}

//GET A BLOG
const getABlog = async (req, res) => {


    try {
        const id = req.params.id
        const blog = await blogs.findById(id).where({ state: "published" })
        if (!blog) {
            res.status(404).json("NO blog found!")
        }
        blog.readCount++
        await blog.save()
        return res.status(200).json(blog)

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const getAllBlogs = async (req, res) => {
    try {
        const { author, title, tags, sort } = req.query

        //Filtering
        const findQuery = {
            state: "published"
        }
        if (author) {
            findQuery.author = author

        }
        if (title) {
            findQuery.title = title
        }
        if (tags) {
            findQuery.tags = tags
        }

        let blogPost = await blogs.find(findQuery)
        //Sorting
        if (sort) {
            const sortby = sort.split(',').join(' ')
            blogPost = blogPost.sort(sortby)
        } else {
            blogPost = blogPost.sort("-createdAt")
        }

        //Pagination
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const skip = (page - 1) * limit

        if (page) {
            const numOfArticle = await blogs
                .countDocuments()
                .where({ state: 'published' })
            if (skip >= numOfArticle) throw new Error("page does not exist")

        }
        blogPost = blogPost.skip(skip).limit(limit)


        const publishedBlogs = await blogs
            .find(blogPost)
            .where({ state: "published" })
            .populate('user', { firstName: 1, lastName: 1, _id: 1 })

            res.status(200).json(publishedBlogs)
    } catch (error) {
       res.status(500).json(error.message)
    }
}

// UPDATE A BLOG
const updateBlog = async (req, res) => {

    try {
        const id = req.params.id;
        const user = req.user
        const { title, description, state, tags, body } = req.body
        const readingTime = getReadingTime(body)


        const blog = await blogs.findById(id)

        if (blog.user._id.toString() === user.id) {
            try {
                const updatedBlog = await blogs.findByIdAndUpdate(id,
                    { title, description, state, tags, body, readingTime },
                    { new: true })

                await updatedBlog.save()
                res.status(200).json(updatedBlog)

            } catch (error) {
                res.status(500).json(error.message)

            }
        } else {
            res.status(401).json("Unauthorized")
        }

    } catch (error) {
        res.status(500).json(error.message)

    }
}

const getUserBlogs = async (req, res) => {
    try {
        const userid = req.user.id
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const skip = (page - 1) * limit
        const userBlogs = await blogs.find({ user: userid })
            .skip(skip)
            .limit(limit)
        return res.status(200).json(userBlogs)
    } catch (error) {

        return res.status(500).json(error.message)
    }

}


// DELETE A BLOG
const deleteBlog = async (req, res) => {

    try {
        const id = req.params.id;
        const user = req.user

        const blog = await blogs.findById(id)

        if (blog.user._id.toString() === user.id) {
            try {
                await blogs.deleteOne()
                res.status(200).json("Deleted")

            } catch (error) {
                res.status(500).json(error)

            }
        } else {
            res.status(401).json("Unauthorized")
        }

    } catch (error) {
        res.status(500).json(error)

    }
}

module.exports = {createBlog, getABlog, getAllBlogs, updateBlog, getUserBlogs, deleteBlog}
