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


export const commentSlices = createSlice({
  initialState,
  name: "comment",
  reducers: {},
  extraReducers: (builder) => {}
    // create a comment
    // pending state
});

export default commentSlices.reducer;
