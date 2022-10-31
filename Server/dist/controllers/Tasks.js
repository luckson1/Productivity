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
exports.deleteTaskctrl = exports.updateTaskctrl = exports.fetchAllTask = exports.fetchOneTaskCtrl = exports.createTaskCtrl = exports.fetchUserTask = void 0;
const Tasks_1 = __importDefault(require("../models/Tasks"));
//create award
const createTaskCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const { title, summary, taskId, assigned } = req.body;
    try {
        const task = yield Tasks_1.default.create({
            title,
            summary,
            taskId,
            user,
            assigned,
        });
        res.json({ task });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.createTaskCtrl = createTaskCtrl;
// fetch all Task
const fetchAllTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Tasks_1.default.find({});
        res.json({ tasks });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.fetchAllTask = fetchAllTask;
// fetch all awards of a given user
// fetch all Task
const fetchUserTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    try {
        const tasks = yield Tasks_1.default.find({ user: id });
        res.json({ tasks });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.fetchUserTask = fetchUserTask;
// fetch one Task
const fetchOneTaskCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield Tasks_1.default.findById(id);
        res.json({ task });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.fetchOneTaskCtrl = fetchOneTaskCtrl;
//updates Task
const updateTaskctrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { taskId, title, status, summary, start, end, assigned } = req.body;
    try {
        const task = yield Tasks_1.default.findOneAndUpdate({ taskId: id }, { title, status, summary, taskId, start, end, assigned }, { new: true });
        res.json({ task });
    }
    catch (error) {
        res.json(error);
    }
});
exports.updateTaskctrl = updateTaskctrl;
//delete Task
const deleteTaskctrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield Tasks_1.default.findOneAndDelete({ taskId: id });
        res.json({ task });
    }
    catch (error) {
        res.json(error);
    }
});
exports.deleteTaskctrl = deleteTaskctrl;
