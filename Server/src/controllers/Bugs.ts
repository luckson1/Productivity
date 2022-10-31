
import { TypedRequest } from "../ExpressTypes";
import {Bug, BugTypes }from "../models/Bugs";
import { Response} from 'express';

//create Bug

const createBugCtrl = async (req:TypedRequest<BugTypes>, res:Response) => {
    const user = req.user!._id;
    const { title, description, bugId, assigned, priority, steps} = req.body;
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
        res.json({error})
    }
};

// fetch all Bus

const fetchAllBugs = async (req:TypedRequest<BugTypes>, res:Response)  => {
    try {
        const bugs = await Bug.find({});

        res.json({ bugs });
    } catch (error) {
        res.json({ error });
    }
};

// fetch all Bugs of a given user
// fetch all Bug

const fetchUserBugs = async (req:TypedRequest<BugTypes>, res:Response)  => {
    const id = req.user!._id;

    try {
        const bugs = await Bug.find({ user: id });

        res.json({ bugs });
    } catch (error) {
        res.json({ error });
    }
};

// fetch one Bug

const fetchOneBugCtrl = async (req:TypedRequest<BugTypes>, res:Response)  => {
    const { id } = req.params;

    try {
        const bug = await Bug.findById(id);
        res.json({ bug });
    } catch (error) {
        res.json({ error });
    }
};

//updates Bug

const updateBugctrl = async (req:TypedRequest<BugTypes>, res:Response)  => {
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
};

//delete Bug

const deleteBugctrl = async (req:TypedRequest<BugTypes>, res:Response)  => {
    const { id } = req.params;
    try {
        const bug = await Bug.findOneAndDelete({ bugId: id });

        res.json({ bug });
    } catch (error) {
        res.json(error);
    }
};

export  {
fetchUserBugs,
createBugCtrl,
fetchOneBugCtrl,
fetchAllBugs,
updateBugctrl,
deleteBugctrl}
