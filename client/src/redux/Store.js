
import {configureStore} from "@reduxjs/toolkit";
import taskReducers from "./taskSlices";
import usersReducer from "./usersSlices";
import bugsReducers from "./bugsSlices";



const Store=configureStore( {
    reducer: { 
        users:usersReducer,
        tasks: taskReducers,
        bugs: bugsReducers
   
        
    }
});



export default Store;