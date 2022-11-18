const users = require('../models/usersModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()



// Define a function to creat a token

const signToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn: "1h"})
}


  
//SIGN UP NEW USERS
const signup = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body

        if (!(email && firstName && lastName && password)) {
            return res.status(400).send("All Input Is Required")
        }
        const olderUser = await users.findOne({ email })
        if (olderUser) {
            return res.status(409).send('User Exist, Please Login. ')
        }
        const hashpassword = await bcrypt.hash(password, 12)
        const newUser = new users({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashpassword
        })

        const token = signToken(newUser._id)
        const user = await newUser.save()

        res.status(200).json({status: "success", token, user})

    } catch (error) {
        res.status(500).json(error.message)

    }
}

// LOGIN USERS
const login = async (req, res) => {
    try {
        const user = await users.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).json("Wrong Details, Try Again")
        }

        const match = await bcrypt.compare(req.body.password, user.password)

        if (!match) {
            return res.status(400).json("Wrong password, Try Again")
        }
       
       const token = signToken(user._id)
        const { password, ...others } = user._doc
        res.status(200).json({ others, token })

    } catch (error) {
        res.status(500).json(error.message)

    }
}


module.exports = {signup, login}