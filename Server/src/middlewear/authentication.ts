
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response} from "express";
import { TypedRequest } from "../ExpressTypes";
import {User, UserTypes} from "../models/Users";

export interface Decoded extends JwtPayload{
    id: string
}
export const authentication = async (req: TypedRequest<null>, res:Response, next:NextFunction) => {
    let token: string;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader?.startsWith("Bearer ")) {
        token= req.headers.authorization.split(" ")[1];

        try {
            if (token) {
                const decodedUser = jwt.verify(token, process.env.JWT_KEY) as Decoded;
                const userId = decodedUser.id;

                //find the user
                const user: UserTypes= await User.findOne({ userId });

                //attach the user the req obj
                req.user = user;
             

                next();
            }
        } catch (error) {
      
            res.sendStatus(403)
        }
    } 
    else {
        res.status(401).json("Unauthorised");
      
    }
};


