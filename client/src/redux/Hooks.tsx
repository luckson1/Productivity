
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "./Store";

export const getState: TypedUseSelectorHook<AppState>= useSelector
export const appDispatch: () => AppDispatch = useDispatch;  

