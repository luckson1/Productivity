import { apiSlice } from "./App/Api/Api";
import { BugsData } from "./bugsSlices";

export const bugApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBugs: builder.query({
      query: () => "/bugs",
      providesTags: ["Bug"]

    }),
    getBug: builder.query({
      query: (bug) => `/bugs/${bug?._id}`,
      providesTags: ["Bug"]
    }),
    createBug: builder.mutation({
      query: (bugetails: BugsData) => ({
        url: "/bugs",
        method: "POST",
        body: { ...bugetails },
       
      }),
      invalidatesTags: ['Bug'],
    }),
    updateBug: builder.mutation({
        query: (bugDetails: BugsData) => ({
            url: `/bugs/${bugDetails?.bugId}`,
            method: "PUT",
            body: {...bugDetails},
           
        }),
        invalidatesTags: ['Bug'],
    }),
    deleteBug: builder.mutation({
        query: (bug: BugsData)=> ({
            url: `/bugs/${bug?.bugId}`,
            method: "DELETE",
           
        }),
        invalidatesTags: ['Bug'],
    })
      
  }),
});

export const { useGetBugsQuery, useGetBugQuery, useCreateBugMutation, useDeleteBugMutation, useUpdateBugMutation } =
  bugApiSlice;
