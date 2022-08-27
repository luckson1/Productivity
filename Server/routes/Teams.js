const express= require('express')
const  {fetchUserTeams, createTeamCtrl, fetchOneTeamCtrl, fetchAllTeams, updateTeamctrl, deleteTeamctrl} = require('../controllers/Team');
const authentication = require('../middlewear/authentication');
teamRoutes=express.Router()


teamRoutes.post("/", authentication, createTeamCtrl);
teamRoutes.get("/", authentication, fetchUserTeams)
teamRoutes.get("/:id", authentication, fetchOneTeamCtrl)
teamRoutes.put("/:id", authentication, updateTeamctrl)
teamRoutes.delete("/:id", authentication, deleteTeamctrl)
module.exports={teamRoutes}