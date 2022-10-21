import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseURL } from '../../../utils/BaseUrl'
import { logout, setCredentials } from '../../authslice'
import { getState } from '../../Hooks'
import { AppState } from '../../Store'

const basequery= fetchBaseQuery({
    baseUrl: BaseURL,
    // credentials : "include",
    prepareHeaders: (headers, { getState }) => {
         const token = (getState() as AppState).auth.token;
          // If we have a token set in state, let's assume that we should be passing it.
         if (token) {
         headers.set('Authorization', `Bearer ${token}`);
         headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        }
        return headers;
        },
})

export const apiSlice=createApi ({
    baseQuery:basequery,
    endpoints: builder=> ({})
})