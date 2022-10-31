"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Bugs_1 = require("../controllers/Bugs");
const authentication_1 = require("../middlewear/authentication");
const bugRoutes = express_1.default.Router();
bugRoutes.post("/", authentication_1.authentication, Bugs_1.createBugCtrl);
bugRoutes.get("/", authentication_1.authentication, Bugs_1.fetchUserBugs);
bugRoutes.get("/:id", authentication_1.authentication, Bugs_1.fetchOneBugCtrl);
bugRoutes.put("/:id", authentication_1.authentication, Bugs_1.updateBugctrl);
bugRoutes.delete("/:id", authentication_1.authentication, Bugs_1.deleteBugctrl);
exports.default = bugRoutes;
