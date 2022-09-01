const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//schema
const taskSchema = new mongoose.Schema(
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
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
