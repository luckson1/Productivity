
import {configureStore} from "@reduxjs/toolkit";
import taskReducers from "./taskSlices";
import shoppingItemReducers from "./shoppingItemSlices";
import expensesReducer from "./expenseSlices";
import incomesReducer from "./IncomeSlices";



const Store=configureStore( {
    reducer: { 
        tasks: taskReducers,
        shoppingItem: shoppingItemReducers,
        expenses: expensesReducer,
        incomes: incomesReducer,
   
        
    }
});



export default Store;