const mongoose = require("mongoose");

const { Schema } = mongoose;

//schema
const bugSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "Open",
        },
        user: {
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

//populate virtuals

//model
const Bug = mongoose.model("Bug", bugSchema);
module.exports = Bug;
