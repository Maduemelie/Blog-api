const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: String,
        required: true,
        enum: ['draft', 'published'], default: "draft" 
    },
    readCount: {
        type: Number,
    },
    readingTime: {
        type: String,
    },
    tags: {
        type: [String], 
    },
    body: {
        type: String,
        required: true
    }




}, { timestamps: true })

const blogs = mongoose.model("blogs", blogSchema)

module.exports = blogs