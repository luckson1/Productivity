import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { ExpensesURL } from "../utils/BaseUrl";

// actions for redirect 
export const resetIncomeCreated = createAction("Income/created/reset")
export const resetIncomeUpdated = createAction("Income/updated/reset")
//create Income action

export const createIncomeAction = createAsyncThunk(
    "Income/create",
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

            const { data } = await axios.post(`${ExpensesURL}/income`, payload, config);
            dispatch(resetIncomeCreated())
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });

// fetching all IncomesSlices
export const fetchIncomesAction = createAsyncThunk('Income/fetch', async (payload, { rejectWithValue, getState, dispatch }) => {
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

        const { data } = await axios.get(`${ExpensesURL}/income`, config);

        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

// update Incomes
export const updateIncomeAction = createAsyncThunk('income/update', async (payload, { rejectWithValue, getState, dispatch }) => {
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

        const { data } = await axios.put(`${ExpensesURL}/income/${payload?.id}`, payload, config);
        dispatch(resetIncomeUpdated())
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});
const incomesSlices = createSlice({
    name: 'income',
    initialState: {

    },
    extraReducers: (builder) => {
        // create Income
        // handle pending state
        builder.addCase(createIncomeAction.pending, (state, action) => {
            state.incomeLoading = true;
            state.incomeAppErr = undefined;
            state.incomeServerErr = undefined;

        });
        builder.addCase(resetIncomeCreated, (state, action) => {
            state.isIncomeCreated = true
        })
        //hande success state
        builder.addCase(createIncomeAction.fulfilled, (state, action) => {
            state.incomeCreated = action?.payload;
            state.incomeLoading = false;
            state.incomeAppErr = undefined;
            state.incomeServerErr = undefined;
            state.isIncomeCreated = false
        });
        //hande rejected state

        builder.addCase(createIncomeAction.rejected, (state, action) => {
            state.incomeLoading = false;
            state.incomeAppErr = action?.payload?.msg;
            state.incomeServerErr = action?.error?.msg;
        })

        //fetchAll
        // handle pending state
        builder.addCase(fetchIncomesAction.pending, (state, action) => {
            state.incomeLoading = true;

        });

        //hande success state
        builder.addCase(fetchIncomesAction.fulfilled, (state, action) => {
            state.incomeList = action?.payload;
            state.incomeLoading = false;
            state.incomeAppErr = undefined;
            state.incomeServerErr = undefined;
        });
        //hande rejected state

        builder.addCase(fetchIncomesAction.rejected, (state, action) => {
            state.incomeLoading = false;
            state.incomeAppErr = action?.payload?.msg;
            state.incomeServerErr = action?.error?.msg;
        });

        //update Income
        // handle pending state
        builder.addCase(updateIncomeAction.pending, (state, action) => {
            state.incomeLoading = true;

        });
        builder.addCase(resetIncomeUpdated, (state, action) => {
            state.isIncomeUpdated = true});
        //hande success state
        builder.addCase(updateIncomeAction.fulfilled, (state, action) => {
            state.updatedIncome = action?.payload;
            state.incomeLoading = false;
            state.incomeAppErr = undefined;
            state.incomeServerErr = undefined;
            state.isIncomeUpdated = false
        });
        //hande rejected state

        builder.addCase(updateIncomeAction.rejected, (state, action) => {
            state.incomeLoading = false;
            state.incomeAppErr = action?.payload?.msg;
            state.incomeServerErr = action?.error?.msg;
        })

    }
});


export default incomesSlices.reducer;