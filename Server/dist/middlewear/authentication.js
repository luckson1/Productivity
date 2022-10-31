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
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = require("../models/Users");
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decodedUser = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                const userId = decodedUser.id;
                //find the user
                const user = yield Users_1.User.findOne({ userId });
                //attach the user the req obj
                req.user = user;
                console.log(user);
                next();
            }
        }
        catch (error) {
            res.sendStatus(403);
        }
    }
    else {
        res.status(401).json("Unauthorised");
    }
});
exports.authentication = authentication;
