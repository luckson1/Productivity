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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBugctrl = exports.updateBugctrl = exports.fetchAllBugs = exports.fetchOneBugCtrl = exports.createBugCtrl = exports.fetchUserBugs = void 0;
const Bugs_1 = require("../models/Bugs");
//create Bug
const createBugCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const { title, description, bugId, assigned, priority, steps } = req.body;
    try {
        const bug = yield Bugs_1.Bug.create({
            title,
            description,
            bugId,
            assigned,
            priority,
            steps,
            user,
        });
        res.json({ bug });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.createBugCtrl = createBugCtrl;
// fetch all Bus
const fetchAllBugs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bugs = yield Bugs_1.Bug.find({});
        res.json({ bugs });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.fetchAllBugs = fetchAllBugs;
// fetch all Bugs of a given user
// fetch all Bug
const fetchUserBugs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    try {
        const bugs = yield Bugs_1.Bug.find({ user: id });
        res.json({ bugs });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.fetchUserBugs = fetchUserBugs;
// fetch one Bug
const fetchOneBugCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bug = yield Bugs_1.Bug.findById(id);
        res.json({ bug });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.fetchOneBugCtrl = fetchOneBugCtrl;
//updates Bug
const updateBugctrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, assigned, priority, steps, user, status } = req.body;
    try {
        const bug = yield Bugs_1.Bug.findOneAndUpdate({ bugId: id }, { title, description, assigned, priority, steps, user, status }, { new: true });
        res.json({ bug });
    }
    catch (error) {
        res.json(error);
    }
});
exports.updateBugctrl = updateBugctrl;
//delete Bug
const deleteBugctrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bug = yield Bugs_1.Bug.findOneAndDelete({ bugId: id });
        res.json({ bug });
    }
    catch (error) {
        res.json(error);
    }
});
exports.deleteBugctrl = deleteBugctrl;
