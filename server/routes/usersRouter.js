const router = require('express').Router();

const {getUser,deleteUser,updateUser} =require('../controllers/usersController')


//get user detail or delete user 
router.route('/:id').get(getUser).delete(deleteUser).put(updateUser)


module.exports=router