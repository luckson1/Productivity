import { Schema, model, Types} from 'mongoose';

export interface CommentTypes {
    creator?: Types.ObjectId,

    taskId?: string,
    bugId?: string,

    details?: string;
    commentId?: string;
}
const commentsSchema = new Schema(
    {
        creator: {
            type: Schema.Types.ObjectId,
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

//model

const Comment = model("Comment", commentsSchema);
export default Comment

