
import {configureStore} from "@reduxjs/toolkit";
import taskReducers from "./taskSlices";



const Store=configureStore( {
    reducer: { 
        tasks: taskReducers,
   
        
    }
});



export default Store;