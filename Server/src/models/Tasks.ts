import { Schema, model, Types } from "mongoose";

//schema
export interface TaskTypes {
    title: string;
    status: "To Do" | "In Progress" | "Done" | "Completed";
    start: string;
    end: string;
    user: Types.ObjectId;
    summary: string;
    taskId: string;
    assigned: Types.ObjectId;
}
const taskSchema = new Schema(
    {
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
            type: Schema.Types.ObjectId,
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
const Task = model("Task", taskSchema);
export default Task;
