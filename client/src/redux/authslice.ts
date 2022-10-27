import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BaseURL } from "../utils/BaseUrl";
import { AppDispatch } from "./Store";
import { User, userData } from "./usersSlices";

interface Data extends User {
  _id: string;
  isAdmin: boolean | undefined;
  updatedAt: string;
  createdAt: string;
}
export interface AuthState {
  user: Data;
  token: string;
}
interface AppErrors {
  msg: string | undefined;
}
//Logout action
export const logout = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: AppErrors; dispatch: AppDispatch }
>("user/logout", async (payload, { rejectWithValue, dispatch }) => {
  try {
    await axios.get(`${BaseURL}/logout`, {
      withCredentials: true,
    });
  } catch (err) {
    let error: AxiosError<AppErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});


const initialState = {
  user: null,
  token: localStorage.getItem("userToken"),
} as AuthState
console.log(initialState)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { user, token } = action.payload;
    
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user))
      state.token=token;
      localStorage.setItem("userToken", token)
      console.log(token)
      
      
    },
  },
  extraReducers: builder=> {
    builder.addCase(logout.fulfilled, (state, action) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
      state.token= undefined;
      state.user= undefined;
    });

  }
});

export const { setCredentials} = authSlice.actions;
export default authSlice.reducer;
