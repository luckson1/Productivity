import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { ExpensesURL } from "../utils/BaseUrl";

export const accountsStatsAction = createAsyncThunk( "accountsStats/fetch",
 async(payload, { rejectWithValue, getState, dispatch })=> {
 //get user token from store
 const userToken = getState()?.users?.userAuth?.token;

 const config = {
     headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${userToken}`,
     },

 };

    try {
    const {data}= await axios.get(`${ExpensesURL}/accounts-statistics`, config)
    return data
} catch (error) {
    if (!error?.response) {
        throw error;
    }
    return rejectWithValue(error?.response?.data);
}
});


const accountsStatsSlices=createSlice ({
    name: "accountsStats",
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(accountsStatsAction.pending, (state, action)=> {
            state.statsLoading = true;
        }) 
        //hande success state
        builder.addCase(accountsStatsAction.fulfilled, (state, action) => {
            state.statsList = action?.payload;
            state.statsLoading = false;
            state.statsAppErr = undefined;
            state.statsServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(accountsStatsAction.rejected, (state, action) => {
            state.statsLoading = false;
            state.statsAppErr = action?.payload?.msg;
            state.statsServerErr = action?.error?.msg;
            
        })

    }

})

export default accountsStatsSlices.reducer;