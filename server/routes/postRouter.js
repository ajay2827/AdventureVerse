const router = require('express').Router();
const {createPost,updatePost,deletePost,getPost,getallPost} = require('../controllers/postsController')

// create , getall post
router.route('/').post(createPost).get(getallPost)

//update , delete and get post
router.route("/:id").get(getPost).put(updatePost).delete(deletePost)




module.exports=router