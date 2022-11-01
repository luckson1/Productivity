const jwt = require("jsonwebtoken");
const {
    generateToken,
    generateRefreshToken,
} = require("../middlewear/generateTokens");
const User = require("../models/Users");

const handleRefreshToken = async (req, res) => {
    const { cookies } = req;
    if (!cookies.jwt)
        return res.sendStatus(401).json("You are not authenticated");
    const refreshToken = cookies.jwt;
    console.log(1, refreshToken);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    const foundUser = await User.findOne({ refreshToken }).exec();
    // Detected refresh token reuse!

    if (!foundUser) {
        jwt.verify(refreshToken, process.env.JWT_KEY, async (err, decoded) => {
            if (err) return res.sendStatus(403); //Forbidden
            // Delete refresh tokens of hacked user
            const hackedUser = await User.findOne({
                userId: decoded.id,
            }).exec();
            hackedUser.refreshToken = [];
            await hackedUser.save();
        });
        return res.sendStatus(403); //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(
        (rt) => rt !== refreshToken
    );
    jwt.verify(refreshToken, process.env.JWT_KEY, async (err, decoded) => {
        const returnValue = decoded ?? err;
        console.log(returnValue);
        if (err) {
            // expired refresh token
            foundUser.refreshToken = [...newRefreshTokenArray];
            await foundUser.save();
        }
        if (err || foundUser.userId !== decoded.id) return res.sendStatus(403);

        // Refresh token was still valid

        const token = generateToken(decoded.id);

        const newRefreshToken = generateRefreshToken(foundUser.userId);
        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ token });
    });
};
module.exports = { handleRefreshToken };
