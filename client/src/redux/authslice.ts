import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./usersSlices";


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


    const initialState = {
  user: null,
  token: null
      } as AuthState;
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{ 
        setCredentials: (state, action: PayloadAction<AuthState>)=> {
        const {user, token}=action.payload
        
        state.user=user;
        state.token=token;


    },
logout: (state, action)=> {
    state.user=null;
    state.token=null;

}}})

export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser= state=> state.auth.user
export const selectCurrentToken= state=> state.auth.token