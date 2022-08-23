const express= require('express')

const authentication = require('../middlewear/authentication');
const { registerUserCtrl, createProfileCtrl, loginUserCtrl, fetchUserCtrl , upDateProfileCtrl} = require('../controllers/Users');
const Multer = require('../utils/multer');
const upload = Multer.single('image');
userRoutes=express.Router()




userRoutes.post("/register", registerUserCtrl)
userRoutes.put("/", upload,  authentication, createProfileCtrl )
userRoutes.put("/update/", upload,  authentication, upDateProfileCtrl)
userRoutes.post ("/login", loginUserCtrl)
userRoutes.get("/profile", authentication, fetchUserCtrl)

module.exports={userRoutes}