import { apiSlice } from "./App/Api/Api";

export const commentApiSlice= apiSlice.injectEndpoints({
    endpoints: builder=> ({
        getComments: builder.query({
         query: (comment)=> `/comments/${comment?.id}`,
         providesTags: ['Comment']
        }),
createComment: builder.mutation ({
    query: (body)=> ({
        url: "/comments",
        method: "POST",
        body,
       
    }),
    invalidatesTags: ['Comment']
})
    })
})
export const {
    useGetCommentsQuery,
    useCreateCommentMutation
}=commentApiSlice