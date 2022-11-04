
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
    
  },
});

export default TasksSlices.reducer;
