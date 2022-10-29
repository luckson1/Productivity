const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
import {User} from "../models/Users";

export const authentication = expressAsyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];

        try {
            if (token) {
                const decodedUser = jwt.verify(token, process.env.JWT_KEY);
                const userId = decodedUser.id;

                //find the user
                const user = await User.findOne({ userId });

                //attach the user the req obj
                req.user = user;

                next();
            }
        } catch (error) {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
        throw new Error("Unauthorised");
    }
});


