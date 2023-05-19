const User = require('../models/User');
const Post=require('../models/Post');
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/custom-error");

// create post

exports.createPost=asyncWrapper(async(req,res,next)=>{
      
    const {username,title,desc,photo}=req.body
    if(!username||!title||!desc)
    {
       return next(createCustomError("Please provide necessary fields",400))
    }

    const exitinguser=await User.find({username})
    if(exitinguser.length===0)
    {
        return next(createCustomError("User does not exit",401));
    }    
    const newpost={
        username,
        title,
        desc,
        photo
    }

    const savepost=await Post.create(newpost)
    res.status(200).json({savepost})

})


// update post

exports.updatePost=asyncWrapper(async(req,res,next)=>{

    const post=await Post.findById(req.params.id)
    if(!post)
    {
        return next(createCustomError('Post does not exit',401));
    }

    if(post.username===req.body.username)
    {
        const updatepost=await Post.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})

        res.status(200).json({updatepost})
    } 
    else
    {
        res.status(401).json({msg:"You can update your post only... "});
    }
})


// delete post

exports.deletePost=asyncWrapper(async(req,res,next)=>{

    const post=await Post.findById(req.params.id)
    if(!post)
    {
        return next(createCustomError('Post does not exit',401));
    }
    
    if(post.username===req.body.username)
    {
       const deletepost=await Post.findByIdAndDelete(req.params.id)
       res.status(200).json({deletepost})
    } 
    else
    {
        res.status(401).json({msg:"You can delete your post only... "});
    }

})



// get post

exports.getPost=asyncWrapper(async(req,res,next)=>{

    const post=await Post.findById(req.params.id)
    if(!post)
    {
        return next(createCustomError("Post does not exit",401));
    }
    res.status(200).json({post})
})


// get all posts

exports.getallPost=asyncWrapper(async(req,res,next)=>{
    const Username=req.query.user
    let posts;
    if(Username)
    {
        posts=await Post.find({username:Username})
        if(!posts)
        {
            return next(createCustomError("Post does not exit",401));
        }
    }
    else
    {
        posts=await Post.find();
    }

    res.status(200).json({posts});
})
