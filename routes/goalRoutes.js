const express = require('express');
const router = express.Router();
const controller = require('../controllers/goalController')
const middleware = require('../middleware/authMiddleware') 


//Get
router.get('/', middleware.protect, controller.getGoals)

//Post
router.post('/', middleware.protect, controller.addGoals);

//Update
router.put('/:id',middleware.protect,  controller.updateGoals);

//Delete
router.delete('/:id', middleware.protect, controller.deleteGoals);





module.exports = router;