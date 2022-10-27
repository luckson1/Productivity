import { apiSlice } from "./App/Api/Api";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: () => "users/team",
      providesTags: ["Team"],
    }),
    createTeamMember: builder.mutation({
        query: (body) => ({
          url: "users/create",
          method: "POST",
          body,
        }),
        invalidatesTags: ['Team'],
      }),
      getProfile: builder.query({
        query: (body) =>"users/profile",
       providesTags: ['Profile']
      }),
      createProfile: builder.mutation({
        query: (body) => ({
          url: "users",
          method: "PUT",
          body,
          headers: {"Content-Type": "multipart/form-data"}
        }),
        invalidatesTags: ['Profile'],
      }),
    
      editProfilePic: builder.mutation({
        query: (body) => ({
          url: "users",
          method: "PUT",
          body,
        }),
        invalidatesTags: ['Profile'],
      }),
      editProfile: builder.mutation({
        query: (body) => ({
          url: "users/update",
          method: "PUT",
          body,
        }),
        invalidatesTags: ['Profile'],
      }),
  }),
 
});

export const { useGetTeamQuery, useCreateProfileMutation, useCreateTeamMemberMutation, useEditProfileMutation, useEditProfilePicMutation, useGetProfileQuery } = usersApiSlice;
