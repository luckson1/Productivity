import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { BaseURL } from "../utils/BaseUrl";

// actions for redirect after action is completed
export const resetBugCreated = createAction("bug/created/reset")

export const resetBugUpdated = createAction("bug/updated/reset")
export const resetBugDeleted = createAction("bug/Deleted/reset")
// create bug action

export const createBugAction = createAsyncThunk(
    "bug/create",
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

            const { data } = await axios.post(`${BaseURL}/bugs`, payload, config);
            
            dispatch(resetBugCreated())
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });


// action to get one bug into our state


export const fetchbugAction = createAsyncThunk(
    "bug/fetch",
    async (payload, { rejectWithValue, getState }) => {
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

            const { data } = await axios.get(`${BaseURL}/bugs/${payload?.id}`, config);
         
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });

    //get   bugs all of them

    export const fetchbugsAction = createAsyncThunk(
        "bugs/fetch",
        async (payload, { rejectWithValue, getState}) => {
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
    
                const { data } = await axios.get(`${BaseURL}/bugs`, config);
                return data;
    
            } catch (error) {
                if (!error?.response) {
                    throw error;
                }
                return rejectWithValue(error?.response?.data);
            }
    
    
    
        });

  

// edit bug
export const editBugsAction = createAsyncThunk('bugs/update', async (payload, { rejectWithValue, getState, dispatch }) => {
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

        const { data } = await axios.put(`${BaseURL}/bugs/${payload?.bugId}`, payload, config);
        dispatch(resetBugUpdated())
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

export const deleteBugAction = createAsyncThunk('bug/delete', async (payload, { rejectWithValue, getState, dispatch }) => {
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
 
         const { data } = await axios.delete(`${BaseURL}/bugs/${payload?.bugId}`, config);
        dispatch(resetBugDeleted())
         return data;
     } catch (error) {
         if (!error?.response) {
             throw error;
         }
         return rejectWithValue(error?.response?.data);
     }
 
 
 
 });

// create slices for dispatch

const bugsSlices = createSlice({
    name: 'bug',
    initialState: {

    },
    extraReducers: (builder) => {
        // create bug
        // handle pending state
        builder.addCase(createBugAction.pending, (state) => {
            state.bugCreatedLoading = true;
            state.bugAppErr = undefined;
            state.bugServerErr = undefined;

        });
        builder.addCase(resetBugCreated, (state) => {
            state.isbugCreated = true
        })
        //hande success state
        builder.addCase(createBugAction.fulfilled, (state, action) => {
            state.bugCreated = action?.payload;
            state.bugCreatedLoading = false;
            state.bugAppErr = undefined;
            state.bugServerErr = undefined;
            state.isbugCreated = false
        });
        //hande rejected state

        builder.addCase(createBugAction.rejected, (state, action) => {
            state.bugCreatedLoading = false;
            state.bugAppErr = action?.payload?.msg;
            state.bugServerErr = action?.error?.msg;
        })


        // fetch one bug
        //handle pending state
        builder.addCase(fetchbugAction.pending, (state, action) => {
            state.bugLoading = true;
            state.bugAppErr = undefined;
            state.bugServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchbugAction.fulfilled, (state, action) => {
            state.bugCreated = action?.payload;
            state.bugLoading = false;
            state.bugAppErr = undefined;
            state.bugServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchbugAction.rejected, (state, action) => {
            state.bugLoading = false;
            state.bugAppErr = action?.payload?.msg;
            state.bugServerErr = action?.error?.msg;
        })


        //  fetch all bug bugs by gender
        //handle pending state
        builder.addCase(fetchbugsAction.pending, (state, action) => {
            state.bugLoading = true;
            state.bugAppErr = undefined;
            state.bugServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchbugsAction.fulfilled, (state, action) => {
            state.bugsFetched = action?.payload;
            state.bugLoading = false;
            state.bugAppErr = undefined;
            state.bugServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchbugsAction.rejected, (state, action) => {
            state.bugLoading = false;
            state.bugAppErr = action?.payload?.msg;
            state.bugServerErr = action?.error?.msg;
        })

        
        // edit a bug

         //handle pending state
         builder.addCase(editBugsAction.pending, (state, action) => {
            state.editedBugLoading = true;
            state.editBugAppErr = undefined;
            state.editBugServerErr = undefined;

        })
        
        builder.addCase(resetBugUpdated, (state, action) => {
            state.isbugUpdated = true})
        //hande success state
        builder.addCase(editBugsAction.fulfilled, (state, action) => {
            state.editBugCreated = action?.payload;
            state.editedBugLoading = false;
            state.editBugAppErr = undefined;
            state.editBugServerErr = undefined;
            state.isbugUpdated = false
            
        });
        //hande rejected state

        builder.addCase(editBugsAction.rejected, (state, action) => {
            state.editedBugLoading = false;
            state.editBugAppErr = action?.payload?.msg;
            state.editBugServerErr = action?.error?.msg;
        })

                //delete  an bug -action

         // delete a bug
        //handle pending state
        builder.addCase(deleteBugAction.pending, (state, action) => {
            state.deletedBugLoading = true;
            state.deleteBugAppErr = undefined;
            state.deleteBugerverErr = undefined;

        });
        builder.addCase(resetBugDeleted, (state, action) => {
            state.isbugDeleted = true
        })
        
        //hande success state
        builder.addCase(deleteBugAction.fulfilled, (state, action) => {
            state.deleteBugCreated = action?.payload;
            state.deletedBugLoading  = false;
            state.deleteBugAppErr = undefined;
            state.deleteBugerverErr = undefined;
            state.isbugDeleted = false
        });
        //hande rejected state

        builder.addCase(deleteBugAction.rejected, (state, action) => {
            state.deletedBugLoading  = false;
            state.deleteBugAppErr = action?.payload?.msg;
            state.deleteBugerverErr = action?.error?.msg;
        })

    }
})

export default bugsSlices.reducer;