import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { ExpensesURL } from "../utils/BaseUrl";

// actions for redirect 
export const resetExpCreated = createAction("expense/created/reset")
export const resetExpUpdated = createAction("expense/updated/reset")

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

        const { data } = await axios.get(`${ExpensesURL}/expenses?pages=${payload}`, config);

        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

// update expenses
export const UpdateExpenseAction = createAsyncThunk('expense/update', async (payload, { rejectWithValue, getState, dispatch }) => {
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
const expensesSlices = createSlice({
    name: 'expense',
    initialState: {

    },
    extraReducers: (builder) => {
        // create expense
        // handle pending state
        builder.addCase(createExpenseAction.pending, (state, action) => {
            state.expenseLoading = true;

        });
        builder.addCase(resetExpCreated, (state, action) => {
            state.isExpCreated = true
        })

        //hande success state
        builder.addCase(createExpenseAction.fulfilled, (state, action) => {
            state.expenseCreated = action?.payload;
            state.expenseLoading = false;
            state.expenseAppErr = undefined;
            state.expenseServerErr = undefined;
            state.isExpCreated = false
        });
        //hande rejected state

        builder.addCase(createExpenseAction.rejected, (state, action) => {
            state.expenseLoading = false;
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

        //update Expense
        // handle pending state
        builder.addCase(UpdateExpenseAction.pending, (state, action) => {
            state.expenseLoading = true;

        });
        builder.addCase(resetExpUpdated, (state, action) => {
            state.isExpUpdated = true
        })

        //hande success state
        builder.addCase(UpdateExpenseAction.fulfilled, (state, action) => {
            state.UpdatedExpense = action?.payload;
            state.expenseLoading = false;
            state.expenseAppErr = undefined;
            state.expenseServerErr = undefined;
            state.isExpUpdated = false
        });
        //hande rejected state

        builder.addCase(UpdateExpenseAction.rejected, (state, action) => {
            state.expenseLoading = false;
            state.expenseAppErr = action?.payload?.msg;
            state.expenseServerErr = action?.error?.msg;
        })

    }
});


export default expensesSlices.reducer;