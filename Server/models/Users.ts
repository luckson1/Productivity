import {Schema, Types, model} from "mongoose";
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

export interface UserTypes {
    email: string;
    userId?: string;
  
    firstName?: string;
    lastName?: string;
    isAdmin?: boolean | undefined;
    password?: string;
    image?: string;
    invitedBy?: Array<string>;
    role?: string;
    status?: string;
    _id: Types.ObjectId
  }

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },

        firstName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        invitedBy: [
            {
                type: String,
                required: false,
            },
        ],
        role: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: false,
        },
        refreshToken: [],

        passwordChangeAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        timestamps: true,
    }
);

//Password reset/forget
userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10 minutes
    return resetToken;
};

//Hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// check password matching
//Verify password
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// /populate virtuals
userSchema.virtual("Team", {
    ref: "teamCreator",
    localField: "_id",
    foreignField: "user",
});
export const User = model("User", userSchema);


