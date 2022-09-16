const mongoose = require("mongoose");

const { Schema } = mongoose;
//schema
const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        teamCreator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        teamMembers: {
            type: [],
        },
        teamId: {
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
const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
