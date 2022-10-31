"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Tasks_1 = require("../controllers/Tasks");
const authentication_1 = require("../middlewear/authentication");
const taskRoutes = express_1.default.Router();
taskRoutes.post("/", authentication_1.authentication, Tasks_1.createTaskCtrl);
taskRoutes.get("/", authentication_1.authentication, Tasks_1.fetchUserTask);
taskRoutes.get("/:id", authentication_1.authentication, Tasks_1.fetchOneTaskCtrl);
taskRoutes.put("/:id", authentication_1.authentication, Tasks_1.updateTaskctrl);
taskRoutes.delete("/:id", authentication_1.authentication, Tasks_1.deleteTaskctrl);
exports.default = taskRoutes;
