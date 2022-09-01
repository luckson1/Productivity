const express= require('express')
const { createCommentCtrl, updateCommentCtrl, fetchCommentsCtrl, deleteCommentCtrl } = require('../controllers/Comments')
const authentication = require('../middlewear/authentication');



const commentsRouter=express.Router()

commentsRouter.post("/", authentication, createCommentCtrl)
commentsRouter.put("/:id", authentication,updateCommentCtrl)
commentsRouter.get("/:id",authentication,fetchCommentsCtrl)
commentsRouter.delete("/",authentication, deleteCommentCtrl)

module.exports=commentsRouter