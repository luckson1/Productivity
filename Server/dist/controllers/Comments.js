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
exports.deleteCommentCtrl = exports.fetchCommentsCtrl = exports.updateCommentCtrl = exports.createCommentCtrl = void 0;
const comments_1 = __importDefault(require("../models/comments"));
// create a comment
const createCommentCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user;
    const { taskId, bugId, details, commentId } = req.body;
    const creator = id;
    try {
        const comment = yield comments_1.default.create({
            taskId,
            bugId,
            details,
            creator,
            commentId,
        });
        res.json({ comment });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.createCommentCtrl = createCommentCtrl;
const updateCommentCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { details, commentId } = req.body;
    try {
        const comment = yield comments_1.default.findOneAndUpdate({ commentId: commentId }, { details }, { new: true });
        res.json({ comment });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.updateCommentCtrl = updateCommentCtrl;
// fetch comment of a task/bug
const fetchCommentsCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const comment = yield comments_1.default.aggregate([
            { $match: { $or: [{ bugId: id }, { taskId: id }] } },
        ]);
        res.json({ comment });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.fetchCommentsCtrl = fetchCommentsCtrl;
const deleteCommentCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params;
    try {
        const comment = yield comments_1.default.findByIdAndDelete({ id });
        res.json({ comment });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.deleteCommentCtrl = deleteCommentCtrl;
