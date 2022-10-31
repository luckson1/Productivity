import { Response } from "express";
import { TypedRequest } from "../ExpressTypes";
import Task, { TaskTypes } from "../models/Tasks";

//create award

const createTaskCtrl = async (req: TypedRequest<TaskTypes>, res: Response) => {
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
};

// fetch all Task

const fetchAllTask = async (req: TypedRequest<TaskTypes>, res: Response) => {
    try {
        const tasks = await Task.find({});

        res.json({ tasks });
    } catch (error) {
        res.json({ error });
    }
};

// fetch all awards of a given user
// fetch all Task

const fetchUserTask = async (req: TypedRequest<TaskTypes>, res: Response) => {
    const id = req.user._id;

    try {
        const tasks = await Task.find({ user: id });

        res.json({ tasks });
    } catch (error) {
        res.json({ error });
    }
};

// fetch one Task

const fetchOneTaskCtrl = async (
    req: TypedRequest<TaskTypes>,
    res: Response
) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        res.json({ task });
    } catch (error) {
        res.json({ error });
    }
};

//updates Task

const updateTaskctrl = async (req: TypedRequest<TaskTypes>, res: Response) => {
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
};

//delete Task

const deleteTaskctrl = async (req: TypedRequest<TaskTypes>, res: Response) => {
    const { id } = req.params;

    try {
        const task = await Task.findOneAndDelete({ taskId: id });

        res.json({ task });
    } catch (error) {
        res.json(error);
    }
};

export {
    fetchUserTask,
    createTaskCtrl,
    fetchOneTaskCtrl,
    fetchAllTask,
    updateTaskctrl,
    deleteTaskctrl,
};
