"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Comments_1 = require("../controllers/Comments");
const authentication_1 = require("../middlewear/authentication");
const commentsRouter = express_1.default.Router();
commentsRouter.post("/", authentication_1.authentication, Comments_1.createCommentCtrl);
commentsRouter.put("/:id", authentication_1.authentication, Comments_1.updateCommentCtrl);
commentsRouter.get("/:id", authentication_1.authentication, Comments_1.fetchCommentsCtrl);
commentsRouter.delete("/", authentication_1.authentication, Comments_1.deleteCommentCtrl);
exports.default = commentsRouter;
