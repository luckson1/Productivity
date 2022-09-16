import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../utils/BaseUrl";

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

export const createTaskAction = createAsyncThunk(
  "task/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      //make http call here

      const { data } = await axios.post(`${BaseURL}/tasks`, payload, config);

      dispatch(resetTaskCreated());
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

export const fetchTaskAction = createAsyncThunk(
  "task/fetch",
  async (payload, { rejectWithValue, getState }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;

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

export const fetchTasksAction = createAsyncThunk(
  "tasks/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;

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
export const editTasksAction = createAsyncThunk(
  "tasks/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store

    const userToken = getState()?.users?.userAuth?.token;
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
      dispatch(resetTaskUpdated());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteTaskAction = createAsyncThunk(
  "task/delete",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store

    const userToken = getState()?.users?.userAuth?.token;
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
      dispatch(resetTaskDeleted());
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
  initialState: {},
  extraReducers: (builder) => {
    // set state to edit mode
    builder.addCase(isEditMode, (state, action) => {
      state.isEdit = true;
    });
    builder.addCase(isEditModeReset, (state, action) => {
      state.isEdit = false;
    });

    // render bug  form modals/components
    builder.addCase(isShowModal, (state, action) => {
      state.showModal = true;
    });
    builder.addCase(isShowModalReset, (state, action) => {
      state.showModal = false;
    });

    // render bug information modals/components
    builder.addCase(isShowInfoModal, (state, action) => {
      state.showInfoModal = true;
    });
    builder.addCase(isShowInfoModalReset, (state, action) => {
      state.showInfoModal = false;
    });

    // render bug delete modals/components
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
    builder.addCase(resetTaskCreated, (state, action) => {
      state.isTaskCreated = true;
    });
    //hande success state
    builder.addCase(createTaskAction.fulfilled, (state, action) => {
      state.taskCreated = action?.payload;
      state.taskCreatedLoading = false;
      state.taskAppErr = undefined;
      state.taskServerErr = undefined;
      state.isTaskCreated = false;
    });
    //hande rejected state

    builder.addCase(createTaskAction.rejected, (state, action) => {
      state.taskCreatedLoading = false;
      state.taskAppErr = action?.payload?.msg;
      state.taskServerErr = action?.error?.msg;
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
      state.taskCreated = action?.payload;
      state.taskLoading = false;
      state.taskAppErr = undefined;
      state.taskServerErr = undefined;
    });
    //hande rejected state

    builder.addCase(fetchTaskAction.rejected, (state, action) => {
      state.taskLoading = false;
      state.taskAppErr = action?.payload?.msg;
      state.taskServerErr = action?.error?.msg;
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
      state.taskServerErr = action?.error?.msg;
    });

    // edit a Task

    //handle pending state
    builder.addCase(editTasksAction.pending, (state, action) => {
      state.taskEditedLoading = true;
      state.editTaskAppErr = undefined;
      state.editTaskServerErr = undefined;
    });

    builder.addCase(resetTaskUpdated, (state, action) => {
      state.isTaskUpdated = true;
    });
    //hande success state
    builder.addCase(editTasksAction.fulfilled, (state, action) => {
      state.editTaskCreated = action?.payload;
      state.taskEditedLoading = false;
      state.editTaskAppErr = undefined;
      state.editTaskServerErr = undefined;
      state.isTaskUpdated = false;
    });
    //hande rejected state

    builder.addCase(editTasksAction.rejected, (state, action) => {
      state.taskEditedLoading = false;
      state.editTaskAppErr = action?.payload?.msg;
      state.editTaskServerErr = action?.error?.msg;
    });

    //delete  an Task -action

    // delete a Task
    //handle pending state
    builder.addCase(deleteTaskAction.pending, (state, action) => {
      state.deletedTaskLoading = true;
      state.deleteTaskAppErr = undefined;
      state.deleteTaskerverErr = undefined;
    });
    builder.addCase(resetTaskDeleted, (state, action) => {
      state.isTaskDeleted = true;
    });

    //hande success state
    builder.addCase(deleteTaskAction.fulfilled, (state, action) => {
      state.deleteTaskCreated = action?.payload;
      state.deletedTaskLoading = false;
      state.deleteTaskAppErr = undefined;
      state.deleteTaskerverErr = undefined;
      state.isTaskDeleted = false;
    });
    //hande rejected state

    builder.addCase(deleteTaskAction.rejected, (state, action) => {
      state.deletedTaskLoading = false;
      state.deleteTaskAppErr = action?.payload?.msg;
      state.deleteTaskerverErr = action?.error?.msg;
    });
  },
});

export default TasksSlices.reducer;
