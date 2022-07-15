import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { BaseURL } from "../utils/BaseUrl";

// actions for redirect after action is completed
// create shoppingItem action

export const createShoppingItemAction  = createAsyncThunk(
    "shoppingItem/create",
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

            const { data } = await axios.post(`${BaseURL}/shoppingItems`, payload, config);
            
          
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });


// action to get one shoppingItem into our state


export const fetchShoppingItem  = createAsyncThunk(
    "shoppingItem/fetch",
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

            const { data } = await axios.get(`${BaseURL}/shoppingItems/${payload?.id}`, config);
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }



    });

    //get   shoppingItems by gender

    export const fetchAllShoppingsItem = createAsyncThunk(
        "shoppingItems/fetch",
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
    
                const { data } = await axios.get(`${BaseURL}/shoppingItems`, config);
                return data;
    
            } catch (error) {
                if (!error?.response) {
                    throw error;
                }
                return rejectWithValue(error?.response?.data);
            }
    
    
    
        });

  

// edit shoppingItem
export const editShoppingItem = createAsyncThunk('shoppingItems/update', async (payload, { rejectWithValue, getState, dispatch }) => {
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

        const { data } = await axios.put(`${BaseURL}/shoppingItems/${payload?.id}`, payload, config);
      
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

export const deleteShoppingItemAction = createAsyncThunk('shoppingItem/delete', async (payload, { rejectWithValue, getState, dispatch }) => {
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
 
         const { data } = await axios.delete(`${BaseURL}/shoppingItems/${payload?._id}`, config);
   
         return data;
     } catch (error) {
         if (!error?.response) {
             throw error;
         }
         return rejectWithValue(error?.response?.data);
     }
 
 
 
 });

// create slices for dispatch

const ShoppingItemsSlices = createSlice({
    name: 'shoppingItem',
    initialState: {

    },
    extraReducers: (builder) => {
        // create shoppingItem
        // handle pending state
        builder.addCase(createShoppingItemAction.pending, (state, action) => {
            state.shoppingItemLoading = true;
            state.shoppingItemAppErr = undefined;
            state.shoppingItemServerErr = undefined;

        });
    
        //hande success state
        builder.addCase(createShoppingItemAction.fulfilled, (state, action) => {
            state.shoppingItemCreated = action?.payload;
            state.shoppingItemLoading = false;
            state.shoppingItemAppErr = undefined;
            state.shoppingItemServerErr = undefined;
            state.isshoppingItemCreated = false
        });
        //hande rejected state

        builder.addCase(createShoppingItemAction.rejected, (state, action) => {
            state.shoppingItemLoading = false;
            state.shoppingItemAppErr = action?.payload?.msg;
            state.shoppingItemServerErr = action?.error?.msg;
        })


        // fetch one shoppingItem
        //handle pending state
        builder.addCase(fetchShoppingItem.pending, (state, action) => {
            state.shoppingItemLoading = true;
            state.shoppingItemAppErr = undefined;
            state.shoppingItemServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchShoppingItem.fulfilled, (state, action) => {
            state.shoppingItemCreated = action?.payload;
            state.shoppingItemLoading = false;
            state.shoppingItemAppErr = undefined;
            state.shoppingItemServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchShoppingItem.rejected, (state, action) => {
            state.shoppingItemLoading = false;
            state.shoppingItemAppErr = action?.payload?.msg;
            state.shoppingItemServerErr = action?.error?.msg;
        })


        //  fetch all shoppingItem shoppingItems by gender
        //handle pending state
        builder.addCase(fetchAllShoppingsItem.pending, (state, action) => {
            state.shoppingItemLoading = true;
            state.shoppingItemAppErr = undefined;
            state.shoppingItemServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchAllShoppingsItem.fulfilled, (state, action) => {
            state.shoppingItemsFetched = action?.payload;
            state.shoppingItemLoading = false;
            state.shoppingItemAppErr = undefined;
            state.shoppingItemServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchAllShoppingsItem.rejected, (state, action) => {
            state.shoppingItemLoading = false;
            state.shoppingItemAppErr = action?.payload?.msg;
            state.shoppingItemServerErr = action?.error?.msg;
        })

        
        // edit a shoppingItem

         //handle pending state
         builder.addCase(editShoppingItem.pending, (state, action) => {
            state.shoppingItemLoading = true;
            state.shoppingItemAppErr = undefined;
            state.shoppingItemServerErr = undefined;

        })
 
        //hande success state
        builder.addCase(editShoppingItem.fulfilled, (state, action) => {
            state.shoppingItemEdited = action?.payload;
            state.shoppingItemLoading = false;
            state.shoppingItemAppErr = undefined;
            state.shoppingItemServerErr = undefined;
           
            
        });
        //hande rejected state

        builder.addCase(editShoppingItem.rejected, (state, action) => {
            state.shoppingItemLoading = false;
            state.shoppingItemAppErr = action?.payload?.msg;
            state.shoppingItemServerErr = action?.error?.msg;
        })

                //delete  an shoppingItem -action

         // delete a shoppingItem
        //handle pending state
        builder.addCase(deleteShoppingItemAction.pending, (state, action) => {
            state.shoppingItemLoading = true;
            state.shoppingItemAppErr = undefined;
            state.shoppingItemerverErr = undefined;

        });
     
        //hande success state
        builder.addCase(deleteShoppingItemAction.fulfilled, (state, action) => {
            state.shoppingItemd = action?.payload;
            state.shoppingItemLoading = false;
            state.shoppingItemAppErr = undefined;
            state.shoppingItemerverErr = undefined;
        
        });
        //hande rejected state

        builder.addCase(deleteShoppingItemAction.rejected, (state, action) => {
            state.shoppingItemLoading = false;
            state.shoppingItemAppErr = action?.payload?.msg;
            state.shoppingItemerverErr = action?.error?.msg;
        })

    }
})

export default ShoppingItemsSlices.reducer;