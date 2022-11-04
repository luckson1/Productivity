import {createSlice, createAction} from "@reduxjs/toolkit";


export type Payload={
  title?: string;
    priority?: "Low" | "Medium" | "High";
    assigned?: string;
    description?: string;
    status: "Open" | "In Progress"| "In Review" |"Closed" | "Complete";
    _id?: string;
    createdAt?: string;
    bugId?: string;
    steps?: string;

}

export interface BugsData  extends Payload{
 updatedAt?: string
}

interface BugResponse {
  bug: BugsData;
  bugs: Array<BugsData>
}

interface State {
  bugServerErr: string | null | undefined,
  bugAppErr: string | null | undefined,

  bug:BugResponse
  bugsFetched:BugResponse
  isEdit: boolean,
  showModal: boolean;
  showInfoModal: boolean,
  bugCreatedLoading: boolean,
  bugLoading : boolean,
  bugsLoading : boolean,
  editedBugLoading : boolean,
  deletedBugLoading: boolean,


}

const initialState = {
  bug: {},
 
  bugServerErr: null,
  bugAppErr: null,
} as State


// actions
export const resetBugCreated = createAction("bug/created/reset");

export const resetBugUpdated = createAction("bug/updated/reset");
export const resetBugDeleted = createAction("bug/Deleted/reset");
export const isEditMode = createAction("bug/isEdit/mode");
export const isEditModeReset = createAction("bug/isEdit/reset");
export const isShowModal = createAction("bug/isShowFormModal");
export const isShowModalReset = createAction("bug/isShowFormModal/reset");
export const isShowInfoModal = createAction("bug/isShowInfoModal");
export const isShowInfoModalReset = createAction("bug/isShowModal/reset");
// create bug action


// create slices for dispatch

const bugsSlices = createSlice({
  name: "bug",
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
 
  },
});

export default bugsSlices.reducer;
