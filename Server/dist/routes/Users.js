"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middlewear/authentication");
const Users_1 = require("../controllers/Users");
const multer_1 = __importDefault(require("../utils/multer"));
const upload = multer_1.default.single("image");
const userRoutes = express_1.default.Router();
userRoutes.post("/register", Users_1.registerUserCtrl);
userRoutes.post("/create", authentication_1.authentication, Users_1.createUserctrl);
userRoutes.put("/", upload, authentication_1.authentication, Users_1.createProfileCtrl);
userRoutes.put("/update/", upload, authentication_1.authentication, Users_1.upDateProfileCtrl);
userRoutes.post("/login", Users_1.loginUserCtrl);
userRoutes.get("/profile", authentication_1.authentication, Users_1.fetchUserCtrl);
userRoutes.get("/team", authentication_1.authentication, Users_1.fetchTeamMembersCtrl);
exports.default = userRoutes;
