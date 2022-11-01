const Comment = require("../models/comments");
// create a comment

const createCommentCtrl = async (req, res) => {
    const id = req.user;
    const { taskId, bugId, details, commentId } = req.body;
    const creator = id;
    try {
        const comment = await Comment.create({
            taskId,
            bugId,
            details,
            creator,
            commentId,
        });
        res.json({ comment });
    } catch (error) {
        res.json({ error });
    }
};

const updateCommentCtrl = async (req, res) => {
    const { details, commentId } = req.body;
    try {
        const comment = await Comment.findOneAndUpdate(
            { commentId: commentId },
            { details },
            { new: true }
        );
        res.json({ comment });
    } catch (error) {
        res.json({ error });
    }
};

// fetch comment of a task/bug
const fetchCommentsCtrl = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.aggregate([
            { $match: { $or: [{ bugId: id }, { taskId: id }] } },
        ]);
        res.json({ comment });
    } catch (error) {
        res.json({ error });
    }
};

const deleteCommentCtrl = async (req, res) => {
    const id = req.params;
    try {
        const comment = await Comment.findByIdAndDelete({ id });
        res.json({ comment });
    } catch (error) {
        res.json({ error });
    }
};

module.exports = {
    createCommentCtrl,
    updateCommentCtrl,
    fetchCommentsCtrl,
    deleteCommentCtrl,
};
