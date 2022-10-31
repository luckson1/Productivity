import { NextFunction, Request, Response, ErrorRequestHandler} from "express";
import  ErrorLibrary from "../utils/ErrorsLibrary";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        msg: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

//Not found
const notFound = (req:Request, res:Response, next:NextFunction)=> {
    const error = new Error(`Not found -${req.originalUrl}`);
    res.status(404);
    next(error);
};

const mongooseErrorHandler : ErrorRequestHandler = (err, req, res, next) =>  {
    let error = { ...err };

    error.message = err.message;

    if (err.name === "CastError") {
        const message = `invalid ${err.path}: ${err.value}. This resource doesn't exist`;
        error = new ErrorLibrary(message, 404);
    }

    if (err.code === 11000) {
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
        const message = `Duplicate field value: ${value}. Please enter another value`;
        error = new ErrorLibrary(message, 400);
    }

    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((val:any) => val.message);
        const message = `Invalid data provided. ${errors.join(". ")}`;
        error = new ErrorLibrary(message, 400);
    }

    return res.status(error.statusCode || 500).json({
        success: false,
        error,
        message: error.message,
    });
};
export  { errorHandler, notFound, mongooseErrorHandler };
