const expressAsyncHandler = require('express-async-handler');
const Task = require('../models/Tasks');
require('dotenv').config() 


//create award

const createTaskCtrl= expressAsyncHandler(async (req, res) => {
    
    const user= req?.user?._id
    const {title, summary,status}=req?.body
    try {
        const task= await Task.create({title,  summary, status, user})
   
        res.json({task})
    } catch (error) {
        res.json({error}) 
    }
});

// fetch all Task

const fetchAllTask= expressAsyncHandler(async (req, res) => {
    try {
        const tasks= await Task.find({})
      
        res.json({tasks})
    } catch (error) {
        res.json({error}) 
    }
});


// fetch all awards of a given user 
// fetch all Task

const fetchUserTask= expressAsyncHandler(async (req, res) => {
    const id= req?.user?._id

    try {
        const tasks=await Task.find({user:id})
     
        res.json({tasks})
    } catch (error) {
        res.json({error}) 
    }
});



// fetch one Task

const fetchOneTaskCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params

    try {
        const task= await Task.findById(id)
        res.json({task})
    } catch (error) {
        res.json({error}) 
    }
});

//updates Task

const updateTaskctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params
    
    const {title, status,summary}=req?.body
        try {
        const task = await Task.findByIdAndUpdate(id, {title, status,summary}, { new: true })

        res.json({task})
        
    } catch (error) {

        res.json(error)
    }
});


//delete Task

const deleteTaskctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params
    try {
        const task = await Task.findByIdAndDelete (id)
      
        res.json({task})
    } catch (error) {

        res.json(error)
    }
})

module.exports ={fetchUserTask, createTaskCtrl, fetchOneTaskCtrl, fetchAllTask, updateTaskctrl, deleteTaskctrl}