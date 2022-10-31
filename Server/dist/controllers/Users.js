"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserctrl = exports.upDateProfileCtrl = exports.fetchUserCtrl = exports.createProfileCtrl = exports.loginUserCtrl = exports.registerUserCtrl = exports.fetchTeamMembersCtrl = void 0;
const uuid_1 = require("uuid");
const nodemailer_1 = __importDefault(require("nodemailer"));
const Users_1 = require("../models/Users");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const generateTokens_1 = require("../middlewear/generateTokens");
// Create the transporter with the required configuration for Outlook
const transporter = nodemailer_1.default.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: "SSLv3",
    },
    auth: {
        user: "gathondudev@outlook.com",
        pass: process.env.MAIL_PASSWORD,
    },
});
const emailCallbackFunction = (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log(`Message sent:   ${info.response}`);
};
// registering a user
const registerUserCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userId = (0, uuid_1.v4)();
    // generate token
    const token = (0, generateTokens_1.generateToken)(userId);
    const newRefreshToken = (0, generateTokens_1.generateRefreshToken)(userId);
    //find if a user exists
    const userExists = yield Users_1.User.findOne({ email });
    if (userExists)
        throw new Error("User already exists");
    try {
        // if new, create one
        const user = yield Users_1.User.create({
            email,
            password,
            userId,
            refreshToken: newRefreshToken,
            status: "Pending",
        });
        // Creates Secure Cookie with refresh token
        res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ user, token });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.registerUserCtrl = registerUserCtrl;
// login user
const loginUserCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { cookies } = req;
    //check if user exists
    const user = yield Users_1.User.findOne({ email });
    //Check if password is match
    if (user && (yield user.isPasswordMatch(password))) {
        //generate tokens
        let newRefreshTokenArray = !cookies.jwt
            ? user.refreshTokens
            : user.refreshTokens.filter((rt) => rt !== cookies.jwt);
        const token = (0, generateTokens_1.generateToken)(user.userId);
        const newRefreshToken = (0, generateTokens_1.generateRefreshToken)(user.userId);
        if (cookies.jwt) {
            const refreshToken = cookies.jwt;
            const foundToken = yield Users_1.User.findOne({ refreshToken }).exec();
            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }
            res.clearCookie("jwt", {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
        }
        // Saving refreshToken with current user
        console.log(newRefreshTokenArray);
        user.refreshTokens = [...newRefreshTokenArray, newRefreshToken];
        yield user.save();
        // Creates Secure Cookie with refresh token
        res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
            token,
            user,
        });
    }
    else {
        res.status(401).json("Invalide Login Credentials");
    }
});
exports.loginUserCtrl = loginUserCtrl;
// create profile
const createProfileCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    const filePath = req.file.path;
    // upload file to cloudinary
    const result = yield cloudinary_1.default.uploader.upload(filePath);
    // get url of uploaded image
    const image = result.secure_url;
    const { firstName, lastName } = req.body;
    const updateDocument = {
        $set: {
            firstName: firstName,
            lastName: lastName,
            image: image,
            status: "Approved",
        },
    };
    try {
        const user = yield Users_1.User.findByIdAndUpdate(id, updateDocument);
        res.json({ user });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.createProfileCtrl = createProfileCtrl;
//update user detals
const upDateProfileCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    const { firstName, lastName } = req.body;
    const updateDocument = {
        $set: {
            firstName: firstName,
            lastName: lastName,
        },
    };
    try {
        const user = yield Users_1.User.findByIdAndUpdate(id, updateDocument);
        res.json({ user });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.upDateProfileCtrl = upDateProfileCtrl;
// fetch one user
const fetchUserCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    try {
        const user = yield Users_1.User.findById(id);
        res.json({ user });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.fetchUserCtrl = fetchUserCtrl;
// create a new account by admin
const createUserctrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, userId, role } = req.body;
    const domain = "https://techivity.netlify.app";
    const id = req.user.userId;
    // Make sure this account doesn't already exist
    //find if a user exists
    const userExists = yield Users_1.User.findOne({ email });
    // find if existing user has been invited by the admin(invite sender) before.
    let invitingAdminsIds = [];
    let alreadyTeamMember;
    if (userExists !== null) {
        invitingAdminsIds = userExists.invitedBy;
        alreadyTeamMember = invitingAdminsIds.includes(id);
    }
    if (alreadyTeamMember) {
        throw new Error("Team member already invited!");
    }
    if (userExists !== null && !alreadyTeamMember) {
        // adding user to the team(by adding the invite sender userId to the list of invitedBy array), if user exists but not added to the request-sender's team
        const updateDocument1 = {
            $push: { invitedBy: id },
        };
        try {
            const user = yield Users_1.User.findByIdAndUpdate(userExists._id, updateDocument1);
            // setup e-mail data
            const mailOptions = {
                from: '"Techivity " <gathondudev@outlook.com>',
                to: email,
                subject: "Added to a team",
                text: "Hello",
                html: `<p>Hello ${firstName}<p><br><p>You were addded to a new team on ${domain}. <p>If you did not request this, please ignore this email.</p>`, // html body
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, emailCallbackFunction);
            res.json({ user });
        }
        catch (error) {
            res.json({ error });
        }
    }
    else {
        // if user does not exist, create and save user
        try {
            const password = (0, uuid_1.v4)(); //generate a random password
            const invitedBy = id;
            const newUser = yield Users_1.User.create({
                invitedBy,
                email,
                password,
                userId,
                role,
                status: "Pending",
                firstName,
            });
            // setup e-mail data
            const mailOptions = {
                from: '"Techivity " <gathondudev@outlook.com>',
                to: email,
                subject: "New Account Created",
                text: "Hello",
                html: `<p>Hello ${firstName}<p><br><p>A new account has been created for you on ${domain}. Please use <br>username: <strong>${email} <strong> and password: <strong>${password} <strong><br>  to login.</p> 
            <br><p>If you did not request this, please ignore this email.</p>`, // html body
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, emailCallbackFunction);
            return res.json({ newUser });
        }
        catch (error) {
            res.json({ error });
        }
    }
});
exports.createUserctrl = createUserctrl;
//find members belonging to ateam created by sender
const fetchTeamMembersCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inviteSenderId = req.user.userId;
    try {
        const teamMembers = yield Users_1.User.aggregate([
            {
                $match: {
                    $or: [
                        { invitedBy: inviteSenderId },
                        { userId: inviteSenderId },
                    ],
                },
            },
        ]);
        res.json({ teamMembers });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.fetchTeamMembersCtrl = fetchTeamMembersCtrl;
