const express = require("express");
const {
    fetchUserBugs,
    createBugCtrl,
    fetchOneBugCtrl,
    updateBugctrl,
    deleteBugctrl,
} = require("../controllers/Bugs");
const authentication = require("../middlewear/authentication");

const bugRoutes = express.Router();

bugRoutes.post("/", authentication, createBugCtrl);
bugRoutes.get("/", authentication, fetchUserBugs);
bugRoutes.get("/:id", authentication, fetchOneBugCtrl);
bugRoutes.put("/:id", authentication, updateBugctrl);
bugRoutes.delete("/:id", authentication, deleteBugctrl);
module.exports = { bugRoutes };
