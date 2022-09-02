import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../utils/BaseUrl";

export const createCommentAction= createAsyncThunk("create/comment", async(payload, {getState, rejectWithValue})=> {
        //get user token from store
        const userToken = getState()?.users?.userAuth?.token;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },

        };
    try {
        const {data}=await axios.post(`${BaseURL}/comments`, payload, config)
        return data
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
} )


export const fetchCommentAction= createAsyncThunk("fetch/comments", async(payload, {getState, rejectWithValue})=> {
   const userToken = getState()?.users?.userAuth?.token;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },

        };

    try {
        const {data}=await axios.get(`${BaseURL}/comments/${payload?.id}`, config)
        return data
    } catch (error) {
        if (!error?.response) {
            throw Error} else {
                return rejectWithValue(error?.response?.data)
            }
    }

});

export const editCommentAction= createAsyncThunk("edit/comment", async(payload, {getState, rejectWithValue})=> {
   const userToken = getState()?.users?.userAuth?.token;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },

        };

    try {
        const {data}= await axios.put(`${BaseURL}/comments/${payload?.commentId}`, config, payload)
        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        } else {
            return rejectWithValue(error?.response?.data)
        }
    }
});

export const deleteCommentAction= createAsyncThunk("delete/comment", async(payload, {getState, rejectWithValue})=> {
try {
   const userToken = getState()?.users?.userAuth?.token;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },

        };

    const {data}=await axios.delete(`${BaseURL}/comments/${payload?.id}`, config)
    return data
} catch (error) {
    if (!error?.response){
        throw error
    } else {
        return rejectWithValue(error?.response?.dat)
    }
}
})


// slices

export const commentSlices= createSlice({
    initialState : {

    }, 
    name: "comment",
    extraReducers: (builder)=> {
       // create a comment
       // pending state
       builder.addCase(createCommentAction.pending, (state, action)=> {
        state.commentLoading=true;
       });

       // success state
       builder.addCase(createCommentAction.fulfilled, (state, action)=> {
        state.commentLoading=false;
        state.commentCreated=action?.payload;
       });

       // rejected

       builder.addCase(createCommentAction.rejected, (state, action)=> {
        state.commentLoading=false;
        state.commentAppErr = action?.payload?.msg;
        state.commentServerErr = action?.error?.msg;
       });
       
       //fetch comments of a task or bug
    
       builder.addCase(fetchCommentAction.pending, (state, action)=> {
        state.commentsLoading=true;
       });

       builder.addCase(fetchCommentAction.fulfilled, (state, action)=> {
        state.commentsLoading=false;
        state.commentsFetched=action?.payload;
    
       });
       builder.addCase(fetchCommentAction.rejected, (state, action)=> {
        state.commentsLoading=false;
        state.commentAppErr = action?.payload?.msg;
        state.commentServerErr = action?.error?.msg;
       });

       //edit comments
       builder.addCase(editCommentAction.pending, (state, action)=> {
        state.editedCommentLoading=true;
       });

       builder.addCase(editCommentAction.fulfilled, (state, action)=> {
        state.editedCommentLoading=false;
        state.commentEdited=action?.payload;
       });
       
       builder.addCase(editCommentAction.rejected, (state, action)=> {
        state.editedCommentLoading=false;
        state.commentAppErr = action?.payload?.msg;
        state.commentServerErr = action?.error?.msg;
       });

       //delete comments

       builder.addCase(deleteCommentAction.pending, (state, action)=> {
        state.deletedCommentLoading=true;
       });

       builder.addCase(deleteCommentAction.fulfilled, (state, action)=> {
        state.deletedCommentLoading=false;
        state.commentDeleted=action?.payload;
       });
       
       builder.addCase(deleteCommentAction.rejected, (state, action)=> {
        state.deletedCommentLoading=false;
        state.commentAppErr = action?.payload?.msg;
        state.commentServerErr = action?.error?.msg;
       });
    }
});

export default commentSlices.reducer;