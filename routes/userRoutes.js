const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController')
const middleware = require('../middleware/authMiddleware') 


//register user
router.post('/register',  controller.registerUser)

//login user
router.post('/login', controller.loginUser)

//get user
router.get('/me', middleware.protect, controller.getMe)

//get all user
router.get('/', middleware.protect, controller.getUsers)

 

 


module.exports = router;