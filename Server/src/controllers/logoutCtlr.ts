import { Request, Response } from "express";
import {User} from "../models/Users";

const handleLogout = async (req:Request, res:Response) => {
    // On client, also delete the accessToken

    const { cookies } = req;
    if (!cookies.jwt) return res.sendStatus(204); //No content
    const refreshToken:string  = cookies.jwt;
    

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    console.log("logout",refreshToken, foundUser)
    if (!foundUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshTokens = foundUser.refreshTokens.filter(
        (rt) => rt !== refreshToken
    );
    const result = await foundUser.save();
    

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(204);
};

export default handleLogout ;
