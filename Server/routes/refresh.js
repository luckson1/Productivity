const express = require("express");
const {
    handleRefreshToken,
} = require("../controllers/refreshTokenControllers");

const refreshRoutes = express.Router();

refreshRoutes.get("/", handleRefreshToken);

module.exports = { refreshRoutes };
