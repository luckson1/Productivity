import express from "express";
import {authentication} from "../middlewear/authentication";
import {
    registerUserCtrl,
    createProfileCtrl,
    loginUserCtrl,
    fetchUserCtrl,
    upDateProfileCtrl,
    createUserctrl,
    fetchTeamMembersCtrl,
} from "../controllers/Users";
import Multer from "../utils/multer";

const upload = Multer.single("image");
const userRoutes = express.Router();

userRoutes.post("/register", registerUserCtrl);
userRoutes.post("/create", authentication, createUserctrl);
userRoutes.put("/", upload, authentication, createProfileCtrl);
userRoutes.put("/update/", upload, authentication, upDateProfileCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/profile", authentication, fetchUserCtrl);
userRoutes.get("/team", authentication, fetchTeamMembersCtrl);

export default userRoutes;
