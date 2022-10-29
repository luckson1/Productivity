import express from "express";
const dotenv = require("dotenv");

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
    notFound,
    errorHandler,
    mongooseErrorHandler,
} = require("./middlewear/errors");
import{ taskRoutes} from "./routes/Tasks";
const { refreshRoutes } = require("./routes/refresh");
const { teamRoutes } = require("./routes/Teams");
const { userRoutes } = require("./routes/Users");
import{ bugRoutes} from "./routes/Bugs";
const commentsRouter = require("./routes/Comments");
const dbConnect = require("./config/dbConnect");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewear/credentials");
const { logoutRoutes } = require("./routes/logout");

// allow our node process to have access to the environment variables
dotenv.config();
app.enable("trust proxy");

//middleware for cookies
app.use(cookieParser());

//connect to Database
dbConnect();

//  connection message
app.get("/", (req, res) => {
    res.json({ msg: "welcome here!" });
});
// middleware

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
//refresh token
app.use("/api/logout", logoutRoutes);
//logout
app.use("/api/refresh", refreshRoutes);
//tasks routes
app.use("/api/tasks", taskRoutes);

// teamsroute
app.use("/api/teams", teamRoutes);

app.use("/api/users", userRoutes);

//bugs routes
app.use("/api/bugs", bugRoutes);

//comments routes
app.use("/api/comments", commentsRouter);

//error handling //

app.use(notFound);
app.use(errorHandler);
app.use(mongooseErrorHandler);

module.exports = app;
