import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
 
} from "@reduxjs/toolkit/query/react";
import { BaseURL } from "../../../utils/BaseUrl";
import {  setCredentials } from "../../authslice";
import { AppDispatch, AppState } from "../../Store";

export type FetchBaseQueryError = {
  status: "PARSING_ERROR" | "FETCH_ERROR" | number | "CUSTOM_ERROR";
  originalStatus: number;
  data?: string;
  error: string;
};

export type QueryReturnValue = {
  data: {
    token: string;
  };
  meta: object;
  error?: FetchBaseQueryError;
};
const baseQuery = fetchBaseQuery({
  baseUrl: BaseURL,
  credentials: "include",
  headers: { "Content-Type": "multipart/form-data" },
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppState).auth.token;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let results = await baseQuery(args, api, extraOptions);

  const dispatch = api.dispatch as AppDispatch;
  const error = results?.error as FetchBaseQueryError;
  if (error?.originalStatus === 403) {
 
    const result = (await baseQuery(
      "/refresh",
      api,
      extraOptions
    )) as QueryReturnValue;
    const token = result?.data?.token;
    if (token) {
      const user = (api.getState() as AppState).auth.user;
      

      dispatch(setCredentials({ user, token }));
      results = await baseQuery(args, api, extraOptions);
    } else {
     console.log(token)
    }
  }
  return results;
};
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Bug", "Task", "Comment", "Team", "Profile"],
  endpoints: (builder) => ({}),
});
