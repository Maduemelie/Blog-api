const users = require('../models/usersModel');
const userRouter = require('express').Router();
const bcrypt = require('bcrypt')

userRouter.post('/signup', async(req, res)=>{
  try {
    const {email, firstName, lastName, password,userName} = req.body

      if (!(email && firstName && lastName && password && userName)){
        res.status(400).send("All Input Is Required")
      }
    const olderUser = await users.findOne({email})
if(olderUser){
    res.status(409).send('User Exist, Please Login. ')
}
      const hashpassword = await bcrypt.hash(password, 12)
      const newUser = new users({
        firstName,
        lastName,
        userName,
        email: email.toLowerCase(),
        password: hashpassword
      })

      const user = await newUser.save()
      res.status(200).json(user)

  } catch (error) {
    res.status(500).json(error)
    
  }  
})
userRouter.post('/login', async(req, res)=>{
    try {
        const user =await users.findOne({email: req.body.email })
      
        if(!user){
            res.status(400).json("Wrong Details, Try Again")
        }
        
        const match = await bcrypt.compare(req.body.password, user.password)
       
        if(!match){
            res.status(400).json("Wrong Details, Try Again")
        }

        console.log(user)
       const {password, ...others} = user._doc
        res.status(200).json(others)

    } catch (error) {
        res.status(500).json(error)
        
    }
})


module.exports = userRouter