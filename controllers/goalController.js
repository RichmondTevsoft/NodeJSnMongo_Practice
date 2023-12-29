const { get } = require("mongoose")
const asyncHandler = require('express-async-handler')

//bring goalmodel
const Goal = require('../models/goalModel')


//Bring userModel
const User = require('../models/userModels')

// @desc   Get Goals
// @route GET /api/goals
// @access Private
const getGoals =  async (req, res) => {

    //fetch from DB
    const goals = await Goal.find({user: req.user.id})
        
    res.status(200).json(goals)
}

// @desc   Add Goals
// @route POST /api/goals
// @access Private
const addGoals =  asyncHandler(async (req, res) => {

        //error handling
        if (!req.body.text) {
            // res.status(400).json({message: 'Please add a text field'}) -
            res.status(400)
            throw new Error('Please add a text field');;
        }

        //Save to DB
        const goal = await Goal.create({
            text: req.body.text,
            user: req.user.id
        })
    
    res.status(200).json({
        message: `Goal Created ${goal}`
    })
})


// @desc   Update Goals
// @route PUT /api/goals
// @access Private
const updateGoals =  asyncHandler(async  (req, res) => {

    const goal = await Goal.findById(req.params.id) 

    if (!goal){
        res.status(400).json({
            message: `Goal with ${req.params.id} not found`
        })
    } 

    const user =await User.findById(req.user.id)
    //check user
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    //Make sure the logged users matches goal user
    if(goal.user.toString() !== user.id){
        res.status(400)
        throw new Error('User not authorised')
    }
    
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })



    res.status(200).json({
        message: updatedGoal
    })
})


// @desc   Delete Goals
// @route DELETE /api/goals
// @access Private
const deleteGoals =  asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id) 

    if(!goal){
        res.status(400) 
        throw new Error('Goal not found')
    } 

    const user =await User.findById(req.user.id)
    //check user
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    //Make sure the logged users matches goal user
    if(goal.user.toString() !== user.id){
        res.status(400)
        throw new Error('User not authorised')
    }
    
    
    await goal.deleteOne();
    res.status(200).json({message: `Goals deleted ${req.params.id}`})
   

})








module.exports = {
    getGoals,
    addGoals,
    updateGoals,
    deleteGoals 
}
