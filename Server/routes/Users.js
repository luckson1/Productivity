const express = require("express");
const authentication = require("../middlewear/authentication");
const {
    registerUserCtrl,
    createProfileCtrl,
    loginUserCtrl,
    fetchUserCtrl,
    upDateProfileCtrl,
    createUserctrl,
    fetchTeamMembersCtrl,
} = require("../controllers/Users");
const Multer = require("../utils/multer");

const upload = Multer.single("image");
const userRoutes = express.Router();

userRoutes.post("/register", registerUserCtrl);
userRoutes.post("/create", authentication, createUserctrl);
userRoutes.put("/", upload, authentication, createProfileCtrl);
userRoutes.put("/update/", upload, authentication, upDateProfileCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/profile", authentication, fetchUserCtrl);
userRoutes.get("/team", authentication, fetchTeamMembersCtrl);

module.exports = { userRoutes };
