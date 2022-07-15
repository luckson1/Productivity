
import {configureStore} from "@reduxjs/toolkit";
import taskReducers from "./taskSlices";
import shoppingItemReducers from "./shoppingItemSlices";



const Store=configureStore( {
    reducer: { 
        tasks: taskReducers,
        shoppingItem: shoppingItemReducers
   
        
    }
});



export default Store;