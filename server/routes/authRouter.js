const router = require('express').Router();

const {signUpUser,signInUser}=require('../controllers/authController')


// register route
router.route('/register').post(signUpUser)

// login route

router.route('/login').post(signInUser)

module.exports=router