const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentsSchema = new mongoose.Schema({
   creator: {
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    
    taskId: {
        type: String,

    },
    bugId: {
        type: String
    },

    details: {
        type: String,
        required: true
    },
    commentId: {
        type: String,
        required: true
    }

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
)


//model
const Comment = mongoose.model("Comment", commentsSchema);
module.exports = Comment;