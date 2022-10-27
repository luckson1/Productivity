import { apiSlice } from "./App/Api/Api";
import { TasksData } from "./taskSlices";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Task"],
    }),
    gettask: builder.query({
      query: (task) => `/tasks/${task?._id}`,
    }),
    createtask: builder.mutation({
      query: (taskDetails: TasksData) => ({
        url: "/tasks",
        method: "POST",
        body: { ...taskDetails },
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: (taskDetails: TasksData) => ({
        url: `/tasks/${taskDetails?.taskId}`,
        method: "PUT",
        body: { ...taskDetails },
      }),
      invalidatesTags: ["Task"],
    }),
    deletetask: builder.mutation({
      query: (task: TasksData) => ({
        url: `/tasks/${task?.taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreatetaskMutation,
  useUpdateTaskMutation,
  useDeletetaskMutation,
  useGettaskQuery,
} = tasksApiSlice;
