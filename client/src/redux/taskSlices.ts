
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../utils/BaseUrl";
import { getState } from "./Hooks";
import { AppState } from "./Store";


export interface Task {
  title?:string;
status:"To Do" | "In Progress" | "Done" | "Complete";

start?: string;
end?: string;
user?:string;

summary?: string;
taskId:string;
assigned?: string,
id?: string,
_id?: string,
}
export interface TasksData extends Task {
  createdAt?: string;
  updatedAt?: string;
}

interface TaskResponse {
  task: TasksData;
  tasks: Array<TasksData>
}
interface AppErrors {
msg: string | undefined;
}

interface State {
  taskServerErr: string | null | undefined,
  taskAppErr: string | null | undefined,

  task:TaskResponse
  tasksFetched:TaskResponse
  isEdit: boolean,
  showModal: boolean;
  showInfoModal: boolean,
  showDeleteModal: boolean,
  taskCreatedLoading: boolean,
  taskLoading : boolean,
  tasksLoading : boolean,
  editedTaskLoading : boolean,
  deletedTaskLoading: boolean,


}

const initialState = {
  task: {},
 
  taskServerErr: null,
  taskAppErr: null,
} as State
// actions
export const resetTaskCreated = createAction("task/created/reset");

export const resetTaskUpdated = createAction("task/updated/reset");
export const resetTaskPublished = createAction("task/publish/reset");
export const resetTaskDeleted = createAction("task/Deleted/reset");
export const isEditMode = createAction("task/isEdit/mode");
export const isEditModeReset = createAction("task/isEdit/reset");
export const isShowModal = createAction("task/isShowFormModal");
export const isShowModalReset = createAction("task/isShowFormModal/reset");
export const isShowInfoModal = createAction("task/isShowInfoModal");
export const isShowInfoModalReset = createAction("task/isShowInfoModal/reset");
export const isShowDeleteModal = createAction("task/isShowDeleteModal");
export const isShowDeleteModalReset = createAction(
  "task/isShowDeleteModal/reset"
);
// create Task action

export const createTaskAction = createAsyncThunk <
TaskResponse,
Task,

{
  rejectValue: AppErrors;
  state: AppState;

}
>(
  "task/create",
  async (payload, { rejectWithValue, getState}) => {
    //get user token from store
    
    const userToken = getState().auth.token

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      //make http call here

      const { data } = await axios.post(`${BaseURL}/tasks`, payload, config);

      
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// action to get one Task into our state

export const fetchTaskAction = createAsyncThunk <
TaskResponse,
Task,

{
  rejectValue: AppErrors;
  state: AppState
}
>(
  "task/fetch",
  async (payload, { rejectWithValue, getState}) => {
    //get user token from store
    const userToken = getState().auth.token

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      //make http call here

      const { data } = await axios.get(
        `${BaseURL}/tasks/${payload?.id}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchTasksAction = createAsyncThunk <
TaskResponse,
undefined,

{
  rejectValue: AppErrors;
  state: AppState
}
>(
  "tasks/fetch",
  async (undefined, { rejectWithValue, getState}) => {
    //get user token from store
    const userToken = getState().auth.token

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      //make http call here

      const { data } = await axios.get(`${BaseURL}/tasks`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// edit Task
export const editTasksAction = createAsyncThunk <
TaskResponse,
Task,

{
  rejectValue: AppErrors;
  state: AppState
}
>(
  "tasks/update",
  async (payload, { rejectWithValue, getState}) => {
    //get user token from store

    const userToken = getState().auth.token
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      //make http call here

      const { data } = await axios.put(
        `${BaseURL}/tasks/${payload?.taskId}`,
        payload,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteTaskAction = createAsyncThunk <
TaskResponse,
Task,

{
  rejectValue: AppErrors;
  state: AppState
}
>(
  "task/delete",
  async (payload, { rejectWithValue, getState}) => {
    //get user token from store

    const userToken = getState().auth.token
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      //make http call here

      const { data } = await axios.delete(
        `${BaseURL}/tasks/${payload?.taskId}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// create slices for dispatch

const TasksSlices = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // set state to edit mode
    builder.addCase(isEditMode, (state, action) => {
      state.isEdit = true;
    });
    builder.addCase(isEditModeReset, (state, action) => {
      state.isEdit = false;
    });

    // render task  form modals/components
    builder.addCase(isShowModal, (state, action) => {
      state.showModal = true;
    });
    builder.addCase(isShowModalReset, (state, action) => {
      state.showModal = false;
    });

    // render task information modals/components
    builder.addCase(isShowInfoModal, (state, action) => {
      state.showInfoModal = true;
    });
    builder.addCase(isShowInfoModalReset, (state, action) => {
      state.showInfoModal = false;
    });

    // render task delete modals/components
    builder.addCase(isShowDeleteModal, (state, action) => {
      state.showDeleteModal = true;
    });
    builder.addCase(isShowDeleteModalReset, (state, action) => {
      state.showDeleteModal = false;
    });
    // create Task
    // handle pending state
    builder.addCase(createTaskAction.pending, (state, action) => {
      state.taskCreatedLoading = true;
      state.taskAppErr = undefined;
      state.taskServerErr = undefined;
    });

    //hande success state
    builder.addCase(createTaskAction.fulfilled, (state, action) => {
      state.task = action?.payload;
      state.taskCreatedLoading = false;
      state.taskAppErr = undefined;
      state.taskServerErr = undefined;

    });
    //hande rejected state

    builder.addCase(createTaskAction.rejected, (state, action) => {
      state.taskCreatedLoading = false;
      state.taskAppErr = action?.payload?.msg;
      state.taskServerErr = action?.error?.message;
    });

    // fetch one Task
    //handle pending state
    builder.addCase(fetchTaskAction.pending, (state, action) => {
      state.taskLoading = true;
      state.taskAppErr = undefined;
      state.taskServerErr = undefined;
    });

    //hande success state
    builder.addCase(fetchTaskAction.fulfilled, (state, action) => {
      state.task = action?.payload;
      state.taskLoading = false;
      state.taskAppErr = undefined;
      state.taskServerErr = undefined;
    });
    //hande rejected state

    builder.addCase(fetchTaskAction.rejected, (state, action) => {
      state.taskLoading = false;
      state.taskAppErr = action?.payload?.msg;
      state.taskServerErr = action?.error?.message;
    });

    //  fetch all Task Tasks by gender
    //handle pending state
    builder.addCase(fetchTasksAction.pending, (state, action) => {
      state.taskLoading = true;
      state.taskAppErr = undefined;
      state.taskServerErr = undefined;
    });

    //hande success state
    builder.addCase(fetchTasksAction.fulfilled, (state, action) => {
      state.tasksFetched = action?.payload;
      state.taskLoading = false;
      state.taskAppErr = undefined;
      state.taskServerErr = undefined;
    });
    //hande rejected state

    builder.addCase(fetchTasksAction.rejected, (state, action) => {
      state.taskLoading = false;
      state.taskAppErr = action?.payload?.msg;
      state.taskServerErr = action?.error?.message;
    });

    // edit a Task

    //handle pending state
    builder.addCase(editTasksAction.pending, (state, action) => {
      state.taskLoading = true;
      state.taskAppErr = undefined;
      state.taskServerErr = undefined;
    });

   
    //hande success state
    builder.addCase(editTasksAction.fulfilled, (state, action) => {
      state.task = action?.payload;
      state.taskLoading = false;
      state.taskAppErr = undefined;
      state.taskServerErr = undefined;
     
    });
    //hande rejected state

    builder.addCase(editTasksAction.rejected, (state, action) => {
      state.taskAppErr = action?.payload?.msg;
      state.taskServerErr = action?.error?.message;
    });

    //delete  an Task -action

    // delete a Task
    //handle pending state
    builder.addCase(deleteTaskAction.pending, (state, action) => {
      state.deletedTaskLoading = true;
      state.taskAppErr = undefined;
      state.taskServerErr = undefined;
    });
  

    //hande success state
    builder.addCase(deleteTaskAction.fulfilled, (state, action) => {
      state.task = action?.payload;
      state.deletedTaskLoading = false;
      state.taskAppErr = undefined;
      state.taskServerErr = undefined;
  
    });
    //hande rejected state

    builder.addCase(deleteTaskAction.rejected, (state, action) => {
      state.deletedTaskLoading = false;
      state.taskAppErr = action?.payload?.msg;
      state.taskServerErr = action?.error?.message;
    });
  },
});

export default TasksSlices.reducer;
