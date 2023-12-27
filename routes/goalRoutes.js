const express = require('express');
const router = express.Router();
const controller = require('../controllers/goalController')

//Get
router.get('/', controller.getGoals)

//Post
router.post('/', controller.addGoals);

//Update
router.put('/:id', controller.updateGoals);

//Delete
router.delete('/:id', controller.deleteGoals);





module.exports = router;