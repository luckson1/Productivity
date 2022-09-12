const expressAsyncHandler = require("express-async-handler");
const Task = require("../models/Tasks");

//create award

const createTaskCtrl = expressAsyncHandler(async (req, res) => {
    const user = req.user._id;
    const { title, summary, taskId, assigned } = req.body;
    try {
        const task = await Task.create({
            title,
            summary,
            taskId,
            user,
            assigned,
        });

        res.json({ task });
    } catch (error) {
        res.json({ error });
    }
});

// fetch all Task

const fetchAllTask = expressAsyncHandler(async (req, res) => {
    try {
        const tasks = await Task.find({});

        res.json({ tasks });
    } catch (error) {
        res.json({ error });
    }
});

// fetch all awards of a given user
// fetch all Task

const fetchUserTask = expressAsyncHandler(async (req, res) => {
    const id = req.user._id;

    try {
        const tasks = await Task.find({ user: id });

        res.json({ tasks });
    } catch (error) {
        res.json({ error });
    }
});

// fetch one Task

const fetchOneTaskCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        res.json({ task });
    } catch (error) {
        res.json({ error });
    }
});

//updates Task

const updateTaskctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const { taskId, title, status, summary, start, end, assigned } = req.body;

    try {
        const task = await Task.findOneAndUpdate(
            { taskId: id },
            { title, status, summary, taskId, start, end, assigned },
            { new: true }
        );

        res.json({ task });
    } catch (error) {
        res.json(error);
    }
});

//delete Task

const deleteTaskctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOneAndDelete({ taskId: id });

        res.json({ task });
    } catch (error) {
        res.json(error);
    }
});

module.exports = {
    fetchUserTask,
    createTaskCtrl,
    fetchOneTaskCtrl,
    fetchAllTask,
    updateTaskctrl,
    deleteTaskctrl,
};
