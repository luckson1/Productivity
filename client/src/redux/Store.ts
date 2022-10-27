import { configureStore } from "@reduxjs/toolkit";
import taskReducers from "./taskSlices";
import usersReducer from "./usersSlices";
import bugsReducers from "./bugsSlices";
import commentReducers from "./CommentSlices";
import authReducers from "./authslice";
import { apiSlice } from "./App/Api/Api";


const Store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: taskReducers,
    bugs: bugsReducers,
    comment: commentReducers,
    auth: authReducers,
    [apiSlice.reducerPath]: apiSlice.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true 
  },
  
);

export type AppDispatch = typeof Store.dispatch
export type AppState = ReturnType<typeof Store.getState>

export default Store;
