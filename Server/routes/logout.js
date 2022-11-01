const express = require("express");
const { handleLogout } = require("../controllers/logoutCtlr");

const logoutRoutes = express.Router();

logoutRoutes.get("/", handleLogout);

module.exports = { logoutRoutes };
