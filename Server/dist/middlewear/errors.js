"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseErrorHandler = exports.notFound = exports.errorHandler = void 0;
const ErrorsLibrary_1 = __importDefault(require("../utils/ErrorsLibrary"));
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        msg: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
exports.errorHandler = errorHandler;
//Not found
const notFound = (req, res, next) => {
    const error = new Error(`Not found -${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
const mongooseErrorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    if (err.name === "CastError") {
        const message = `invalid ${err.path}: ${err.value}. This resource doesn't exist`;
        error = new ErrorsLibrary_1.default(message, 404);
    }
    if (err.code === 11000) {
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
        const message = `Duplicate field value: ${value}. Please enter another value`;
        error = new ErrorsLibrary_1.default(message, 400);
    }
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((val) => val.message);
        const message = `Invalid data provided. ${errors.join(". ")}`;
        error = new ErrorsLibrary_1.default(message, 400);
    }
    return res.status(error.statusCode || 500).json({
        success: false,
        error,
        message: error.message,
    });
};
exports.mongooseErrorHandler = mongooseErrorHandler;
