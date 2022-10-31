"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bug = void 0;
const mongoose_1 = require("mongoose");
const bugSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Open",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    bugId: {
        type: String,
        required: true,
    },
    steps: {
        type: String,
        required: true,
    },
    priority: {
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
exports.Bug = (0, mongoose_1.model)("Bug", bugSchema);
