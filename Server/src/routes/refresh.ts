import express from "express";
import handleRefreshToken from "../controllers/refreshTokenControllers";

const refreshRoutes = express.Router();

refreshRoutes.get("/", handleRefreshToken);

export default refreshRoutes ;
