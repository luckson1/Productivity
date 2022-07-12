const express= require('express')
const  {fetchUserTask, createTaskCtrl, fetchOneTaskCtrl, fetchAllTask, updateTaskctrl, deleteTaskctrl}  = require('../controllers/Tasks');
taskRoutes=express.Router()

fetchAllTask
taskRoutes.post("/",  createTaskCtrl);
taskRoutes.get("/",  fetchAllTask)
taskRoutes.get("/:id",  fetchOneTaskCtrl)
taskRoutes.put("/:id",  updateTaskctrl)
taskRoutes.delete("/:id",  deleteTaskctrl)
module.exports={taskRoutes}