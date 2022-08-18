import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { ExpensesURL } from "../utils/BaseUrl";

// actions for redirect 
export const resetExpCreated = createAction("expense/created/reset")
export const resetExpUpdated = createAction("expense/updated/reset")
export const showExpensesAction = createAction("expense/show")
export const hideExpensesAction = createAction("expense/hide")

//create expense action

export const createExpenseAction = createAsyncThunk(
    "expense/create",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //get user token from store
        const userToken = getState()?.users?.userAuth?.token;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },

        };


        try {
            //make http call here

            const { data } = await axios.post(`${ExpensesURL}/expenses`, payload, config);
            //dispatch for redirection
            dispatch(resetExpCreated())

            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });

// fetching all expensesSlices
export const FetchExpensesAction = createAsyncThunk('expense/fetch', async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store

    const userToken = getState()?.users?.userAuth?.token;
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },

    };


    try {
        //make http call here

        const { data } = await axios.get(`${ExpensesURL}/expenses`, config);

        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

// update expenses
export const updateExpenseAction = createAsyncThunk(
    'expense/update',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //get user token from store

        const userToken = getState()?.users?.userAuth?.token;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },

        };


        try {
            //make http call here

            const { data } = await axios.put(`${ExpensesURL}/expenses/${payload?.id}`, payload, config);
            dispatch(resetExpUpdated())
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });

export const deleteExpenseAction = createAsyncThunk('expense/delete', async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store

    const userToken = getState()?.users?.userAuth?.token;




    try {
        //make http call here
        const { data } = await axios.delete(`${ExpensesURL}/expenses/${payload?.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`,
            }, data: {
                source: payload
            }
        });

        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

const expensesSlices = createSlice({
    name: 'expense',
    initialState: {

    },
   
    extraReducers: (builder) => {


        //show/hide expenses list
        builder.addCase(showExpensesAction, (state, action)=> { state.isExpense=true})
        builder.addCase(hideExpensesAction, (state, action)=> { state.isExpense=false})
        // create expense
        // handle pending state
        builder.addCase(createExpenseAction.pending, (state, action) => {
            state.expenseCreatedLoading = true;

        });
        builder.addCase(resetExpCreated, (state, action) => {
            state.isExpCreated = true
        })

        //hande success state
        builder.addCase(createExpenseAction.fulfilled, (state, action) => {
            state.expenseCreated = action?.payload;
            state.expenseCreatedLoading = false;
            state.expenseAppErr = undefined;
            state.expenseServerErr = undefined;
            state.isExpCreated = false
        });
        //hande rejected state

        builder.addCase(createExpenseAction.rejected, (state, action) => {
            state.expenseCreatedLoading = false;
            state.expenseAppErr = action?.payload?.msg;
            state.expenseServerErr = action?.error?.msg;

        })

        //fetchAll
        // handle pending state
        builder.addCase(FetchExpensesAction.pending, (state, action) => {
            state.expenseLoading = true;

        });

        //hande success state
        builder.addCase(FetchExpensesAction.fulfilled, (state, action) => {
            state.expenseList = action?.payload;
            state.expenseLoading = false;
            state.expenseAppErr = undefined;
            state.expenseServerErr = undefined;
        });
        //hande rejected state

        builder.addCase(FetchExpensesAction.rejected, (state, action) => {
            state.expenseLoading = false;
            state.expenseAppErr = action?.payload?.msg;
            state.expenseServerErr = action?.error?.msg;
        });

        //Update Expense
        // handle pending state
        builder.addCase(updateExpenseAction.pending, (state, action) => {
            state.updatedExpenseLoading = true;

        });
        builder.addCase(resetExpUpdated, (state, action) => {
            state.isExpUpdated = true
        })

        //hande success state
        builder.addCase(updateExpenseAction.fulfilled, (state, action) => {
            state.updatedExpense = action?.payload;
            state.updatedExpenseLoading = false;
            state.expenseAppErr = undefined;
            state.expenseServerErr = undefined;
            state.isExpUpdated = false
        });
        //hande rejected state

        builder.addCase(updateExpenseAction.rejected, (state, action) => {
            state.updatedExpenseLoading = false;
            state.expenseAppErr = action?.payload?.msg;
            state.expenseServerErr = action?.error?.msg;
        })


        //Delete Expense
        // handle pending state
        builder.addCase(deleteExpenseAction.pending, (state, action) => {
            state.deletedExpenseLoading = true;

        });

        //hande success state
        builder.addCase(deleteExpenseAction.fulfilled, (state, action) => {
            state.deletedExpense = action?.payload;
           state.deletedExpenseLoading= false;
            state.expenseAppErr = undefined;
            state.expenseServerErr = undefined;

        });
        //hande rejected state

        builder.addCase(deleteExpenseAction.rejected, (state, action) => {
           state.deletedExpenseLoading= false;
            state.expenseAppErr = action?.payload?.msg;
            state.expenseServerErr = action?.error?.msg;
        })
    }
});

export default expensesSlices.reducer;