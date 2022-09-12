const express = require("express");
const dotenv = require("dotenv");

const app = express();
const cors = require("cors");
const dbConnect = require("./dbConnect");
const {
    notFound,
    errorHandler,
    mongooseErrorHandler,
} = require("./middlewear/errors");
const { taskRoutes } = require("./routes/Tasks");
const { teamRoutes } = require("./routes/Teams");
const { userRoutes } = require("./routes/Users");
const { bugRoutes } = require("./routes/Bugs");
const commentsRouter = require("./routes/Comments");

// allow our node process to have access to the environment variables
dotenv.config();

//connect to Database
dbConnect();

//  connection message
app.get("/", (req, res) => {
    res.json({ msg: "welcome!" });
});
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
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
