import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { BaseURL } from "../utils/BaseUrl";

// actions for redirect after action is completed
// create shopppingItem action

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


// action to get one shopppingItem into our state


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

    //get   shopppingItems by gender

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

  

// edit shopppingItem
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
    name: 'shopppingItem',
    initialState: {

    },
    extraReducers: (builder) => {
        // create shopppingItem
        // handle pending state
        builder.addCase(createShoppingItemAction.pending, (state, action) => {
            state.shopppingItemLoading = true;
            state.shopppingItemAppErr = undefined;
            state.shopppingItemServerErr = undefined;

        });
    
        //hande success state
        builder.addCase(createShoppingItemAction.fulfilled, (state, action) => {
            state.shopppingItemCreated = action?.payload;
            state.shopppingItemLoading = false;
            state.shopppingItemAppErr = undefined;
            state.shopppingItemServerErr = undefined;
            state.isshopppingItemCreated = false
        });
        //hande rejected state

        builder.addCase(createShoppingItemAction.rejected, (state, action) => {
            state.shopppingItemLoading = false;
            state.shopppingItemAppErr = action?.payload?.msg;
            state.shopppingItemServerErr = action?.error?.msg;
        })


        // fetch one shopppingItem
        //handle pending state
        builder.addCase(fetchShoppingItem.pending, (state, action) => {
            state.shopppingItemLoading = true;
            state.shopppingItemAppErr = undefined;
            state.shopppingItemServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchShoppingItem.fulfilled, (state, action) => {
            state.shopppingItemCreated = action?.payload;
            state.shopppingItemLoading = false;
            state.shopppingItemAppErr = undefined;
            state.shopppingItemServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchShoppingItem.rejected, (state, action) => {
            state.shopppingItemLoading = false;
            state.shopppingItemAppErr = action?.payload?.msg;
            state.shopppingItemServerErr = action?.error?.msg;
        })


        //  fetch all shopppingItem shopppingItems by gender
        //handle pending state
        builder.addCase(fetchAllShoppingsItem.pending, (state, action) => {
            state.shopppingItemLoading = true;
            state.shopppingItemAppErr = undefined;
            state.shopppingItemServerErr = undefined;

        });
        
        
        //hande success state
        builder.addCase(fetchAllShoppingsItem.fulfilled, (state, action) => {
            state.shopppingItemsFetched = action?.payload;
            state.shopppingItemLoading = false;
            state.shopppingItemAppErr = undefined;
            state.shopppingItemServerErr = undefined;
            
        });
        //hande rejected state

        builder.addCase(fetchAllShoppingsItem.rejected, (state, action) => {
            state.shopppingItemLoading = false;
            state.shopppingItemAppErr = action?.payload?.msg;
            state.shopppingItemServerErr = action?.error?.msg;
        })

        
        // edit a shopppingItem

         //handle pending state
         builder.addCase(editShoppingItem.pending, (state, action) => {
            state.shopppingItemLoading = true;
            state.shopppingItemAppErr = undefined;
            state.shopppingItemServerErr = undefined;

        })
 
        //hande success state
        builder.addCase(editShoppingItem.fulfilled, (state, action) => {
            state.shopppingItemEdited = action?.payload;
            state.shopppingItemLoading = false;
            state.shopppingItemAppErr = undefined;
            state.shopppingItemServerErr = undefined;
           
            
        });
        //hande rejected state

        builder.addCase(editShoppingItem.rejected, (state, action) => {
            state.shopppingItemLoading = false;
            state.shopppingItemAppErr = action?.payload?.msg;
            state.shopppingItemServerErr = action?.error?.msg;
        })

                //delete  an shopppingItem -action

         // delete a shopppingItem
        //handle pending state
        builder.addCase(deleteShoppingItemAction.pending, (state, action) => {
            state.shopppingItemLoading = true;
            state.shopppingItemAppErr = undefined;
            state.shopppingItemerverErr = undefined;

        });
     
        //hande success state
        builder.addCase(deleteShoppingItemAction.fulfilled, (state, action) => {
            state.shopppingItemd = action?.payload;
            state.shopppingItemLoading = false;
            state.shopppingItemAppErr = undefined;
            state.shopppingItemerverErr = undefined;
        
        });
        //hande rejected state

        builder.addCase(deleteShoppingItemAction.rejected, (state, action) => {
            state.shopppingItemLoading = false;
            state.shopppingItemAppErr = action?.payload?.msg;
            state.shopppingItemerverErr = action?.error?.msg;
        })

    }
})

export default ShoppingItemsSlices.reducer;