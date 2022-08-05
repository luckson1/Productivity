const express=require('express')
const app=express()
const cors = require("cors");
const dbConnect = require('./dbConnect');
const { notFound, errorHandler } = require('./middlewear/errors');
const dotenv=require ('dotenv');
const { taskRoutes } = require('./routes/Tasks');
const { shoppingItemRoutes } = require('./routes/shoppingItem');
const { application } = require('express');
const { userRoutes } = require('./routes/Users');
const { bugRoutes } = require('./routes/Bugs');



// allow our node process to have access to the environment variables
dotenv.config()

//connect to Database
dbConnect()


// heroku connection message
app.get("/",(req, res)=> {
    res.json({msg: "welcome!"})
})
// middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))



// routes
//tasks routes
app.use('/api/tasks', taskRoutes)

// shoppingItems route
app.use('/api/shoppingItems', shoppingItemRoutes)

app.use("/api/users", userRoutes)

//bugs routes
app.use('/api/bugs', bugRoutes)

//error handling //  

app.use(notFound);
app.use(errorHandler);


module.exports=app;