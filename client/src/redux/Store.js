
import {configureStore} from "@reduxjs/toolkit";
import taskReducers from "./taskSlices";
import shoppingItemReducers from "./shoppingItemSlices";
import expensesReducer from "./expenseSlices";
import incomesReducer from "./IncomeSlices";
import usersReducer from "./usersSlices";
import accountsStatsReducers from "./accountsStatsSlices";



const Store=configureStore( {
    reducer: { 
        users:usersReducer,
        tasks: taskReducers,
        shoppingItem: shoppingItemReducers,
        expenses: expensesReducer,
        incomes: incomesReducer,
        stats: accountsStatsReducers
   
        
    }
});



export default Store;