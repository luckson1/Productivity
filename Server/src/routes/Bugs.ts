import express from "express";
import {
    fetchUserBugs,
    createBugCtrl,
    fetchOneBugCtrl,
    updateBugctrl,
    deleteBugctrl,
} from "../controllers/Bugs";
import {authentication}  from "../middlewear/authentication";

const bugRoutes = express.Router();

bugRoutes.post("/", authentication, createBugCtrl);
bugRoutes.get("/", authentication, fetchUserBugs);
bugRoutes.get("/:id", authentication, fetchOneBugCtrl);
bugRoutes.put("/:id", authentication, updateBugctrl);
bugRoutes.delete("/:id", authentication, deleteBugctrl);
export default bugRoutes

