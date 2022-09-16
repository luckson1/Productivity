import { configureStore } from "@reduxjs/toolkit";
import taskReducers from "./taskSlices";
import usersReducer from "./usersSlices";
import bugsReducers from "./bugsSlices";
import teamReducers from "./TeamSlices";
import commentReducers from "./CommentSlices";

const Store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: taskReducers,
    bugs: bugsReducers,
    team: teamReducers,
    comment: commentReducers,
  },
});

export default Store;
