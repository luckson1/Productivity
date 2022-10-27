import { apiSlice } from "./App/Api/Api";
import { User } from "./usersSlices";

export const authApiSlice= apiSlice.injectEndpoints({
    endpoints: builder=> ({
        login: builder.mutation({
         query: (credentials: User) => ({
            url: "/users/login",
            method: "POST",
            body: {...credentials}
         })
        }),
        registerUser :  builder.mutation({
            query: (body) => ({
              url: "users/register",
              method: "POST",
              body,
            }),
            
          }),
    })
})

export const {
    useLoginMutation,
    useRegisterUserMutation
}=authApiSlice