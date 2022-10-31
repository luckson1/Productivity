import express from "express";
import dotenv from "dotenv";
import  cors from "cors";
import  cookieParser from "cookie-parser";
import  {
    notFound,
    errorHandler,
    mongooseErrorHandler,
} from "./middlewear/errors";
import taskRoutes from "./routes/Tasks";
import  refreshRoutes  from "./routes/refresh";
// import  { teamRoutes } from "./routes/Teams";
import  userRoutes  from "./routes/Users";
import bugRoutes from "./routes/Bugs";
import  commentsRouter from "./routes/Comments";
import  dbConnect from "./config/dbConnect";
import  corsOptions from "./config/corsOptions";
import  credentials from "./middlewear/credentials";
import  logoutRoutes  from "./routes/logout";
const   app = express();

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
// app.use("/api/teams", teamRoutes);

app.use("/api/users", userRoutes);

//bugs routes
app.use("/api/bugs", bugRoutes);

//comments routes
app.use("/api/comments", commentsRouter);

//error handling //

app.use(notFound);
app.use(errorHandler);
app.use(mongooseErrorHandler);

export default app;
