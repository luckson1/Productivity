import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Decoded } from "../middlewear/authentication";
import {
    generateToken,
    generateRefreshToken,
} from "../middlewear/generateTokens";
import{ User} from "../models/Users";

const handleRefreshToken = async (req:Request, res:Response) => {
    const { cookies } = req;
    if (!cookies.jwt)
        return res.sendStatus(401).json("You are not authenticated");
    const refreshToken:string = cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    const foundUser = await User.findOne({ refreshTokens: refreshToken });

    // Detected refresh token reuse!

    if (!foundUser) {
        jwt.verify(refreshToken, process.env.JWT_KEY, async (err, decoded:Decoded) => {
            if (err) return res.status(403); //Forbidden
            // Delete refresh tokens of hacked user
            const hackedUser = await User.findOne({
                userId: decoded.id,
            }).exec();
            hackedUser.refreshTokens = [];
            await hackedUser.save();
            console.log("hacker", hackedUser)
        });
        return res.status(403); //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshTokens.filter(
        (rt) => rt !== refreshToken
    );
    jwt.verify(refreshToken, process.env.JWT_KEY, async (err, decoded:Decoded) => {
   const value = err? "err": decoded? "decoded": null
        console.log(value);
        if (err) {
            // expired refresh token
            foundUser.refreshTokens = [...newRefreshTokenArray];
            await foundUser.save();
        }
        if (err || foundUser.userId !== decoded.id) return res.sendStatus(403);

        // Refresh token was still valid

        const token = generateToken(decoded.id);

        const newRefreshToken = generateRefreshToken(foundUser.userId);
        // Saving refreshToken with current user
        foundUser.refreshTokens = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ token });
    });
};
export default handleRefreshToken ;
