const expressAsyncHandler = require('express-async-handler');
const Task = require('../models/Tasks');
require('dotenv').config()


//create award

const createTaskCtrl = expressAsyncHandler(async (req, res) => {

    const user = req?.user?._id
    const { title, summary, taskId } = req?.body
    try {
        const task = await Task.create({ title, summary, taskId, user })

        res.json({ task })
    } catch (error) {
        res.json({ error })
    }
});

// fetch all Task

const fetchAllTask = expressAsyncHandler(async (req, res) => {
    try {
        const tasks = await Task.find({})

        res.json({ tasks })
    } catch (error) {
        res.json({ error })
    }
});


// fetch all awards of a given user 
// fetch all Task

const fetchUserTask = expressAsyncHandler(async (req, res) => {
    const id = req?.user?._id

    try {
        const tasks = await Task.find({ user: id })

        res.json({ tasks })
    } catch (error) {
        res.json({ error })
    }
});



// fetch one Task

const fetchOneTaskCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params

    try {
        const task = await Task.findById(id)
        res.json({ task })
    } catch (error) {
        res.json({ error })
    }
});

//updates Task

const updateTaskctrl = expressAsyncHandler(async (req, res) => {
    const { updatedTaskId } = req?.params
    let id = "";
    const { taskId, title, status, summary } = req?.body
    if (updatedTaskId === undefined) {
        try {
            const updatedTask = await Task.findOne({ taskId })
            console.log(updatedTask )
            id = updatedTask?._id
        } catch (error) {
            res.json(error)
        }
    } else {

        id = updatedTaskId
    }
    try {
        const task = await Task.findByIdAndUpdate(id, { title, status, summary }, { new: true })

        res.json({ task })

    } catch (error) {

        res.json(error)
    }
});


//delete Task

const deleteTaskctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params
    
    try {
        const task = await Task.findByIdAndDelete(id)

        res.json({ task })
    } catch (error) {

        res.json(error)
    }
})

module.exports = { fetchUserTask, createTaskCtrl, fetchOneTaskCtrl, fetchAllTask, updateTaskctrl, deleteTaskctrl }