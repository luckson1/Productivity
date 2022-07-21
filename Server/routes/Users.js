const express= require('express')

const authentication = require('../middlewear/authentication');
const { registerUserCtrl, createProfileCtrl, loginUserCtrl, fetchUserCtrl } = require('../controllers/Users');
const Multer = require('../utils/multer');
const upload = Multer.single('image');
userRoutes=express.Router()




userRoutes.post("/register", registerUserCtrl)
userRoutes.put("/", upload,  createProfileCtrl )
userRoutes.post ("/login", loginUserCtrl)
userRoutes.get("/profile", fetchUserCtrl)

module.exports={userRoutes}