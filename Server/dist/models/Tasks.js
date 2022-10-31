"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "To Do",
    },
    start: {
        type: String,
    },
    end: {
        type: String,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    summary: {
        type: String,
    },
    taskId: {
        type: String,
        required: true,
    },
    assigned: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: false,
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
//populate virtuals
//model
const Task = (0, mongoose_1.model)("Task", taskSchema);
exports.default = Task;
