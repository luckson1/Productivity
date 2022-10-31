
import  { v4 as  uuidv4 } from "uuid";
import  nodemailer from "nodemailer";
import {User, UserTypes} from "../models/Users";
import  cloud from "../utils/cloudinary";
import  {
    generateToken,
    generateRefreshToken,
} from "../middlewear/generateTokens";
import { TypedRequest } from "../ExpressTypes";
import { Response } from "express";

// Create the transporter with the required configuration for Outlook
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
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

const registerUserCtrl = async (req:TypedRequest<UserTypes>, res: Response) => {
    const { email, password } = req.body;
    const userId = uuidv4();

    // generate token
    const token = generateToken(userId);
    const newRefreshToken = generateRefreshToken(userId);

    //find if a user exists

    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");

    try {
        // if new, create one
        const user = await User.create({
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
    } catch (error) {
        res.json({ error });
    }
};

// login user
const loginUserCtrl = async (req:TypedRequest<UserTypes>, res: Response) => {
    const { email, password } = req.body;
    const { cookies } = req;
    //check if user exists
    const user = await User.findOne({ email });

    //Check if password is match
    if (user && (await user.isPasswordMatch(password))) {
        
        //generate tokens
        let newRefreshTokenArray = !cookies.jwt
            ? user.refreshTokens
            : user.refreshTokens.filter((rt) => rt !== cookies.jwt);
        const token = generateToken(user.userId);
        const newRefreshToken = generateRefreshToken(user.userId);
        if (cookies.jwt) {
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

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
        console.log(newRefreshTokenArray)
        user.refreshTokens = [...newRefreshTokenArray, newRefreshToken];
        await user.save();

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
    } else {
        res.status(401).json("Invalide Login Credentials");
    }
};

// create profile

const createProfileCtrl = async (req:TypedRequest<UserTypes>, res: Response) => {
    const id = req.user._id;
    const filePath = req.file.path;

    // upload file to cloudinary
    const result = await cloud.uploader.upload(filePath);

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
        const user = await User.findByIdAndUpdate(id, updateDocument);

        res.json({ user });
    } catch (error) {
        res.json({ error });
    }
};

//update user detals
const upDateProfileCtrl = async (req:TypedRequest<UserTypes>, res: Response) => {
    const id = req.user._id;

    const { firstName, lastName } = req.body;

    const updateDocument = {
        $set: {
            firstName: firstName,
            lastName: lastName,
        },
    };

    try {
        const user = await User.findByIdAndUpdate(id, updateDocument);

        res.json({ user });
    } catch (error) {
        res.json({ error });
    }
};

// fetch one user

const fetchUserCtrl = async (req:TypedRequest<UserTypes>, res: Response) => {
    const id = req.user._id;

    try {
        const user = await User.findById(id);
        res.json({ user });
    } catch (error) {
        res.json({ error });
    }
};

// create a new account by admin
const createUserctrl = async (req:TypedRequest<UserTypes>, res: Response) => {
    const { email, firstName, userId, role} = req.body;
    const domain = "https://techivity.netlify.app";
    const id = req.user.userId;

    // Make sure this account doesn't already exist
    //find if a user exists
    const userExists = await User.findOne({ email });

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
            const user = await User.findByIdAndUpdate(
                userExists._id,
                updateDocument1
            );
            // setup e-mail data
            const mailOptions = {
                from: '"Techivity " <gathondudev@outlook.com>', // sender address (who sends)
                to: email, // list of receivers (who receives)
                subject: "Added to a team", // Subject line
                text: "Hello", // plaintext body
                html: `<p>Hello ${firstName}<p><br><p>You were addded to a new team on ${domain}. <p>If you did not request this, please ignore this email.</p>`, // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, emailCallbackFunction);

    
            res.json({ user });
        } catch (error) {
            res.json({ error });
        }
    } else {
        // if user does not exist, create and save user

        try {
            const password = uuidv4(); //generate a random password
            const invitedBy = id;
            const newUser = await User.create({
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
                from: '"Techivity " <gathondudev@outlook.com>', // sender address (who sends)
                to: email, // list of receivers (who receives)
                subject: "New Account Created", // Subject line
                text: "Hello", // plaintext body
                html: `<p>Hello ${firstName}<p><br><p>A new account has been created for you on ${domain}. Please use <br>username: <strong>${email} <strong> and password: <strong>${password} <strong><br>  to login.</p> 
            <br><p>If you did not request this, please ignore this email.</p>`, // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, emailCallbackFunction);
            return res.json({ newUser });
        } catch (error) {
            res.json({ error });
        }
    }
};

//find members belonging to ateam created by sender
const fetchTeamMembersCtrl = async (req:TypedRequest<UserTypes>, res: Response) => {
    const inviteSenderId = req.user.userId;

    try {
        const teamMembers = await User.aggregate([
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
    } catch (error) {
        res.json({ error });
    }
};

export {
    fetchTeamMembersCtrl,
    registerUserCtrl,
    loginUserCtrl,
    createProfileCtrl,
    fetchUserCtrl,
    upDateProfileCtrl,
    createUserctrl,
};
