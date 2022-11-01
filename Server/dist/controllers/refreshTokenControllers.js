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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens_1 = require("../middlewear/generateTokens");
const Users_1 = require("../models/Users");
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cookies } = req;
    if (!cookies.jwt)
        return res.sendStatus(401).json("You are not authenticated");
    const refreshToken = cookies.jwt;
    console.log(refreshToken);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    const foundUser = yield Users_1.User.findOne({ refreshTokens: refreshToken });
    console.log(foundUser === null || foundUser === void 0 ? void 0 : foundUser.email);
    // Detected refresh token reuse!
    if (!foundUser) {
        jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_KEY, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return res.status(403); //Forbidden
            // Delete refresh tokens of hacked user
            const hackedUser = yield Users_1.User.findOne({
                userId: decoded.id,
            }).exec();
            hackedUser.refreshTokens = [];
            yield hackedUser.save();
            console.log("hacked", hackedUser === null || hackedUser === void 0 ? void 0 : hackedUser.firstName);
        }));
        return res.status(403); //Forbidden
    }
    const newRefreshTokenArray = foundUser.refreshTokens.filter((rt) => rt !== refreshToken);
    jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_KEY, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        const value = err ? "err" : decoded ? "decoded" : null;
        console.log(value);
        if (err) {
            // expired refresh token
            foundUser.refreshTokens = [...newRefreshTokenArray];
            yield foundUser.save();
        }
        if (err || foundUser.userId !== decoded.id)
            return res.sendStatus(403);
        // Refresh token was still valid
        const token = (0, generateTokens_1.generateToken)(decoded.id);
        const newRefreshToken = (0, generateTokens_1.generateRefreshToken)(foundUser.userId);
        // Saving refreshToken with current user
        foundUser.refreshTokens = [...newRefreshTokenArray, newRefreshToken];
        yield foundUser.save();
        // Creates Secure Cookie with refresh token
        res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ token });
    }));
});
exports.default = handleRefreshToken;
