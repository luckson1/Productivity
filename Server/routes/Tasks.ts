import express from "express";
import {
    fetchUserTask,
    createTaskCtrl,
    fetchOneTaskCtrl,
    updateTaskctrl,
    deleteTaskctrl,
} from "../controllers/Tasks";
import {authentication}  from "../middlewear/authentication";

const taskRoutes = express.Router();

taskRoutes.post("/", authentication, createTaskCtrl);
taskRoutes.get("/", authentication, fetchUserTask);
taskRoutes.get("/:id", authentication, fetchOneTaskCtrl);
taskRoutes.put("/:id", authentication, updateTaskctrl);
taskRoutes.delete("/:id", authentication, deleteTaskctrl);
export { taskRoutes };
