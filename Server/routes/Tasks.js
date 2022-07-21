const express= require('express')
const  {fetchUserTask, createTaskCtrl, fetchOneTaskCtrl, fetchAllTask, updateTaskctrl, deleteTaskctrl}  = require('../controllers/Tasks');
const authentication = require('../middlewear/authentication');
taskRoutes=express.Router()

fetchAllTask
taskRoutes.post("/", authentication, createTaskCtrl);
taskRoutes.get("/", authentication, fetchUserTask)
taskRoutes.get("/:id", authentication, fetchOneTaskCtrl)
taskRoutes.put("/:id", authentication, updateTaskctrl)
taskRoutes.delete("/:id", authentication, deleteTaskctrl)
module.exports={taskRoutes}