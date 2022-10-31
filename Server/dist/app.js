"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errors_1 = require("./middlewear/errors");
const Tasks_1 = __importDefault(require("./routes/Tasks"));
const refresh_1 = __importDefault(require("./routes/refresh"));
// import  { teamRoutes } from "./routes/Teams";
const Users_1 = __importDefault(require("./routes/Users"));
const Bugs_1 = __importDefault(require("./routes/Bugs"));
const Comments_1 = __importDefault(require("./routes/Comments"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const credentials_1 = __importDefault(require("./middlewear/credentials"));
const logout_1 = __importDefault(require("./routes/logout"));
const app = (0, express_1.default)();
// allow our node process to have access to the environment variables
dotenv_1.default.config();
app.enable("trust proxy");
//middleware for cookies
app.use((0, cookie_parser_1.default)());
//connect to Database
(0, dbConnect_1.default)();
//  connection message
app.get("/", (req, res) => {
    res.json({ msg: "welcome here!" });
});
// middleware
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials_1.default);
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// routes
//refresh token
app.use("/api/logout", logout_1.default);
//logout
app.use("/api/refresh", refresh_1.default);
//tasks routes
app.use("/api/tasks", Tasks_1.default);
// teamsroute
// app.use("/api/teams", teamRoutes);
app.use("/api/users", Users_1.default);
//bugs routes
app.use("/api/bugs", Bugs_1.default);
//comments routes
app.use("/api/comments", Comments_1.default);
//error handling //
app.use(errors_1.notFound);
app.use(errors_1.errorHandler);
app.use(errors_1.mongooseErrorHandler);
exports.default = app;
