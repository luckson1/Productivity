import  express from "express";
import  handleLogout  from "../controllers/logoutCtlr";

const logoutRoutes = express.Router();

logoutRoutes.get("/", handleLogout);

export default logoutRoutes
