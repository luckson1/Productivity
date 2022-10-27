import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../utils/BaseUrl";
import { getState } from "./Hooks";
import { AppState } from "./Store";

export interface Comment {
  creator?: string;

taskId?: string;
bugId?: string;

details:string;
commentId: string;
_id?: string
id?: string
}

export interface commentData extends Comment {
  createdAt: string;
  updatedAt: string;
}

interface CommentResponse {
  comment?: commentData;
  comments?: Array<commentData>
}
interface AppErrors {
  msg: string | undefined;
  }

interface State {
  commentServerErr: string | null | undefined,
  commentAppErr: string | null | undefined,
  comment: CommentResponse
  commentLoading: boolean,
  commentsLoading: boolean,
  commentsFetched: CommentResponse
}
const initialState = {
comment: {},
  commentServerErr: null,
  commentAppErr: null,
} as State;
export const createCommentAction = createAsyncThunk<
CommentResponse,
Comment,
{
  rejectValue: AppErrors;
  state: AppState
}
>(
  "create/comment",
  async (payload, { rejectWithValue, getState}) => {
    //get user token from store
     const userToken = getState().auth.token

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      const { data } = await axios.post(`${BaseURL}/comments`, payload, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchCommentAction = createAsyncThunk<
CommentResponse,
any,
{
  rejectValue: AppErrors;
  state: AppState
}
>(
  "fetch/comments",
  async (payload, { rejectWithValue, getState}) => {
     const userToken = getState().auth.token

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const { data } = await axios.get(
        `${BaseURL}/comments/${payload?.id}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw Error;
      } else {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const editCommentAction = createAsyncThunk<
CommentResponse,
Comment,
{
  rejectValue: AppErrors;
  state: AppState
}
>(
  "edit/comment",
  async (payload, { rejectWithValue, getState}) => {
     const userToken = getState().auth.token

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${BaseURL}/comments/${payload?.commentId}`,
        config,
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const deleteCommentAction = createAsyncThunk<
CommentResponse,
Comment,
{
  rejectValue: AppErrors;
  state: AppState
}
>(
  "delete/comment",
  async (payload, { rejectWithValue, getState}) => {
    try {
       const userToken = getState().auth.token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.delete(
        `${BaseURL}/comments/${payload?.id}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.dat);
      }
    }
  }
);

// slices

export const commentSlices = createSlice({
  initialState,
  name: "comment",
  reducers: {},
  extraReducers: (builder) => {
    // create a comment
    // pending state
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.commentLoading = true;
    });

    // success state
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.commentLoading = false;
      state.comment = action?.payload;
    });

    // rejected

    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.commentLoading = false;
      state.commentAppErr = action?.payload?.msg;
      state.commentServerErr = action?.error?.message;
    });

    //fetch comments of a task or bug

    builder.addCase(fetchCommentAction.pending, (state, action) => {
      state.commentsLoading = true;
    });

    builder.addCase(fetchCommentAction.fulfilled, (state, action) => {
      state.commentsLoading = false;
      state.commentsFetched = action?.payload;
    });
    builder.addCase(fetchCommentAction.rejected, (state, action) => {
      state.commentsLoading = false;
      state.commentAppErr = action?.payload?.msg;
      state.commentServerErr = action?.error?.message;
    });

    //edit comments
    builder.addCase(editCommentAction.pending, (state, action) => {
      state.commentLoading = true;
    });

    builder.addCase(editCommentAction.fulfilled, (state, action) => {
      state.commentLoading = false;
      state.comment= action?.payload;
    });

    builder.addCase(editCommentAction.rejected, (state, action) => {
      state.commentLoading = false;
      state.commentAppErr = action?.payload?.msg;
      state.commentServerErr = action?.error?.message;
    });

    //delete comments

    builder.addCase(deleteCommentAction.pending, (state, action) => {
      state.commentLoading = true;
    });

    builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
      state.commentLoading = false;
      state.comment= action?.payload;
    });

    builder.addCase(deleteCommentAction.rejected, (state, action) => {
      state.commentLoading = false;
      state.commentAppErr = action?.payload?.msg;
      state.commentServerErr = action?.error?.message;
    });
  },
});

export default commentSlices.reducer;
