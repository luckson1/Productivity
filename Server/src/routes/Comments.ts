import express from "express";
import {
    createCommentCtrl,
    updateCommentCtrl,
    fetchCommentsCtrl,
    deleteCommentCtrl,
} from "../controllers/Comments";
import { authentication } from "../middlewear/authentication";

const commentsRouter = express.Router();

commentsRouter.post("/", authentication, createCommentCtrl);
commentsRouter.put("/:id", authentication, updateCommentCtrl);
commentsRouter.get("/:id", authentication, fetchCommentsCtrl);
commentsRouter.delete("/", authentication, deleteCommentCtrl);

export default commentsRouter;
