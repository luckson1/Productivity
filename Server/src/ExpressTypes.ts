import { UserTypes } from "./models/Users";
import { Request } from "express";
import { Multer } from "multer";

export interface TypedRequest<T> extends Request {
    body: T;
    user?: UserTypes;
    file?:Express.Multer.File
    headers:{
      authorization?: string;
      Authorization?: string;
    }
}
