const { get } = require("mongoose")
const asyncHandler = require('express-async-handler')

// @desc   Get Goals
// @route GET /api/goals
// @access Private
const getGoals =  async (req, res) => {
        
    res.status(200).json({
        message: 'Goal retrieved'
    })
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
    
    res.status(200).json({
        message: 'Goal Created'
    })
})


// @desc   Update Goals
// @route PUT /api/goals
// @access Private
const updateGoals =  asyncHandler(async  (req, res) => {
    res.status(200).json({
        message: 'Goal Updated'
    })
})


// @desc   Delete Goals
// @route DELETE /api/goals
// @access Private
const deleteGoals =  asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Goal Delete'
    })
})








module.exports = {
    getGoals,
    addGoals,
    updateGoals,
    deleteGoals 
}
