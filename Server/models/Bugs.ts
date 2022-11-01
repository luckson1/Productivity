import { Schema, model, Types} from 'mongoose';



//schema
export interface BugTypes {
    title?: string;
    status?: string;
    user?: Types.ObjectId;

    description?: string;
    bugId: string;

    steps?: string;
    priority?: string;
    assigned?: Types.ObjectId;
}
const bugSchema = new Schema<BugTypes>(
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
export const Bug =model<BugTypes>("Bug", bugSchema);

