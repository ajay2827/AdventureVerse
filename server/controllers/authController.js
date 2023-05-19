const User=require('../models/User');
const bcrypt = require('bcrypt');
const asyncWrapper=require('../middleware/async')
const { createCustomError } = require('../error/custom-error')


exports.signUpUser=asyncWrapper(async(req,res,next)=>{
    let {username,email,password}=req.body
     
    if(!username||!email||!password)
    {
        return next(createCustomError("Please provide necessary fields",400))
    }

    const exitingUser= await User.findOne({email})
    if(exitingUser)
    {
        return next(createCustomError("User already exit",400))
    }

    const salt= await bcrypt.genSalt(10);
            const hashpassword=await bcrypt.hash(req.body.password,salt);
             const newUser= new User(
                {
                    username:req.body.username,
                    email:req.body.email,
                    password:hashpassword,
                }
                
             )
             const user= await newUser.save();
             res.status(200).json(user);
})

exports.signInUser=asyncWrapper(async(req,res,next)=>{
     
    const {email,password}=req.body
    if(!email||!password)
    {
        return next(createCustomError(`Provide necessary credentials`, 400))
    }

    const user= await User.findOne({email});
     if(!user)
     {
        return next(createCustomError(`Wrong Credentials email`, 401));
     }
      
          const valid= await bcrypt.compare(req.body.password, user.password);
          if(!valid)
          {
            return next(createCustomError(`Wrong Credentials password`,401))
          }
          res.status(200).json({user});

})

