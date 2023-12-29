const mongoose = require("mongoose")
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//bring usermodel
const User = require('../models/userModels')


// @desc  Register User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler( async (req, res) => {

    const {name, email, password, phone} = req.body
    
    if(!name || !email || !password || !phone){
        res.status(400)
        throw new Error('Please add all fields yeah')
    }
    
    //Check if user exist
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('Users exist')
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        name,
        email,
        password: hashPassword,
        phone
    })

    if (user){
        res.status(200).json ({
            _id: user.id,
            name: user.name,
            phone: user.phone,
            token : generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid User Data')
    }

})


// @desc   Login Users
// @route GET /api/users/login
// @access Public
const loginUser =  asyncHandler(async (req, res) => {

    const {email, password} = req.body
    
    //check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json ({
            message: user,
            token : generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
        
    
})


// @desc   Login Users
// @route GET /api/users/login
// @access Private
const getMe =  asyncHandler(async (req, res) => {
    const {_id, name, email, phone} = await User.findById(req.user.id)
    
    res.status(200).json({
        id: _id,
        name: name,
        phone: phone
    })
})


// @desc   Login Users
// @route GET /api/users/login
// @access Public
const getUsers =  asyncHandler(async (req, res) => {

    //fetch from DB
    // const goals = await Goal.find()
        
    res.status(200).json ( {message: 'Users Fetched'})
})


//Generate jwt
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    registerUser, 
    loginUser,
    getMe,
    getUsers
}
