const expressAsyncHandler = require("express-async-handler");
const Bug = require("../models/Bugs");
require("dotenv").config();

//create Bug

const createBugCtrl = expressAsyncHandler(async (req, res) => {
    const user = req.user._id;
    const { title, description, bugId, assigned, priority, steps } = req.body;
    try {
        const bug = await Bug.create({
            title,
            description,
            bugId,
            assigned,
            priority,
            steps,
            user,
        });

        res.json({ bug });
    } catch (error) {
        res.json({ error });
    }
});

// fetch all Bus

const fetchAllBugs = expressAsyncHandler(async (req, res) => {
    try {
        const bugs = await Bug.find({});

        res.json({ bugs });
    } catch (error) {
        res.json({ error });
    }
});

// fetch all Bugs of a given user
// fetch all Bug

const fetchUserBugs = expressAsyncHandler(async (req, res) => {
    const id = req.user._id;

    try {
        const bugs = await Bug.find({ user: id });

        res.json({ bugs });
    } catch (error) {
        res.json({ error });
    }
});

// fetch one Bug

const fetchOneBugCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const bug = await Bug.findById(id);
        res.json({ bug });
    } catch (error) {
        res.json({ error });
    }
});

//updates Bug

const updateBugctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const { title, description, assigned, priority, steps, user, status } =
        req.body;

    try {
        const bug = await Bug.findOneAndUpdate(
            { bugId: id },
            { title, description, assigned, priority, steps, user, status },
            { new: true }
        );

        res.json({ bug });
    } catch (error) {
        res.json(error);
    }
});

//delete Bug

const deleteBugctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const bug = await Bug.findOneAndDelete({ bugId: id });

        res.json({ bug });
    } catch (error) {
        res.json(error);
    }
});

module.exports = {
    fetchUserBugs,
    createBugCtrl,
    fetchOneBugCtrl,
    fetchAllBugs,
    updateBugctrl,
    deleteBugctrl,
};
