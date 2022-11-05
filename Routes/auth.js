const users = require('../models/usersModel');
const userRouter = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

userRouter.post('/signup', async(req, res)=>{
  try {
    const {email, firstName, lastName, password} = req.body

      if (!(email && firstName && lastName && password )){
       return res.status(400).send("All Input Is Required")
      }
    const olderUser = await users.findOne({email})
if(olderUser){
   return res.status(409).send('User Exist, Please Login. ')
}
      const hashpassword = await bcrypt.hash(password, 12)
      const newUser = new users({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashpassword
      })
      
     
      const user = await newUser.save()
   
      res.status(200).json(user)

  } catch (error) {
    res.status(500).json(error.message)
    
  }  
})


userRouter.post('/login', async(req, res)=>{
    try {
        const user =await users.findOne({email: req.body.email })
      
        if(!user){
          return  res.status(400).json("Wrong Details, Try Again")
        }
        
        const match = await bcrypt.compare(req.body.password, user.password)
       
        if(!match){
         return   res.status(400).json("Wrong Details, Try Again")
        }
        const payload = {
          id: user._id
        }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
      })
      res.cookie("jwt", token, { httpOnly: true })
       const {password, ...others} = user._doc
        res.status(200).json({others, token})

    } catch (error) {
        res.status(500).json(error.message)
        
    }
})


module.exports = userRouter