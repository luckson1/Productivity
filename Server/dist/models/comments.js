"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentsSchema = new mongoose_1.Schema({
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    taskId: {
        type: String,
    },
    bugId: {
        type: String,
    },
    details: {
        type: String,
        required: true,
    },
    commentId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
//model
const Comment = (0, mongoose_1.model)("Comment", commentsSchema);
exports.default = Comment;
