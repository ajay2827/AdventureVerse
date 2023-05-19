const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../error/custom-error')

// update user
exports.updateUser = asyncWrapper(async (req, res, next) => {

    const user = await User.findById(req.params.id)
    if (!user) {
        return next(createCustomError('User does not exit', 400))
    }

    // hashing password
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updateuser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }, { new: true });
    res.status(200).json(updateuser);

})


// delete user
exports.deleteUser = asyncWrapper(async (req, res, next) => {

    const { userId } = req.body
    if (!userId) {
        return next(createCustomError("Please provide necessary fields", 400))
    }

    if (userId === req.params.id) {
        const user = await User.findById(userId)
        if (!user) {
            return next(createCustomError(`User does not exit`, 401))
        }
        await Post.deleteMany({ username: user.username })
        await User.findByIdAndDelete(userId)
        res.status(200).json({ user, msg: "User have been deleted... " })
    }
    else {
        res.status(401).json("You can delete only your account");
    }
})


//get user detail
exports.getUser = asyncWrapper(async (req, res, next) => {

    console.log(req.params.id)
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(createCustomError(`User does not exit`, 400))
    }
    res.status(200).json({ user })
})


