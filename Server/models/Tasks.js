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
      default: "Open"
    },
    user: {
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    
    summary: {
      type: String,
      required: true,
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