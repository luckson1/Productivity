import {createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosError } from 'axios'
import { BaseURL } from "../utils/BaseUrl";
import { AppDispatch, AppState } from "./Store";

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
interface AppErrors {
msg: string | undefined;
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

export const createBugAction = createAsyncThunk <
BugResponse,
Payload,

{
   rejectValue: AppErrors;
  state: AppState
}
>(
  "bug/create",
  async (payload: Payload, { rejectWithValue, getState, dispatch}) => {
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

      const {data}= await axios.post(`${BaseURL}/bugs`, payload, config);
      dispatch(resetBugCreated());
      return data;
    } catch (err) {
    let error: AxiosError<AppErrors> = err // cast the error for access
    if (!error.response) {
      throw err
    }
  
    return rejectWithValue(error.response.data)
  }
  }
);

// action to get one bug into our state

export const fetchbugAction = createAsyncThunk <
BugResponse,
Payload,
{
   rejectValue: AppErrors;
  state: AppState
}
> (
  "bug/fetch",
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

      const {data} = await axios.get(
        `${BaseURL}/bugs/${payload?._id}`,
        config
      );

      return data;
    } catch (err) {
    let error: AxiosError<AppErrors> = err // cast the error for access
    if (!error.response) {
      throw err
    }
  
    return rejectWithValue(error.response.data)
  }
  }
);

//get   bugs all of them

export const fetchbugsAction = createAsyncThunk <
BugResponse,
undefined,

{
   rejectValue: AppErrors;
  state: AppState
}
>(
  "bugs/fetch",
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

      const {data} = await axios.get(`${BaseURL}/bugs`, config);
      return data;
    } catch (err) {
    let error: AxiosError<AppErrors> = err // cast the error for access
    if (!error.response) {
      throw err
    }
  
    return rejectWithValue(error.response.data)
  }
  }
);

// edit bug
export const editBugsAction = createAsyncThunk <
BugResponse,
Payload,
{
   rejectValue: AppErrors;
  state: AppState
  dispatch: AppDispatch
}
>(
  "bugs/update",
  async (payload: Payload, { rejectWithValue, getState, dispatch}) => {
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

      const {data} = await axios.put(
        `${BaseURL}/bugs/${payload?.bugId}`,
        payload,
        config
      );
    
      dispatch(resetBugUpdated());
      return data;
    } catch (err) {
    let error: AxiosError<AppErrors> = err // cast the error for access
    if (!error.response) {
      throw err
    }
  
    return rejectWithValue(error.response.data)
  }
  }
);

export const deleteBugAction = createAsyncThunk <
BugResponse,
Payload,
{
   rejectValue: AppErrors;
  state: AppState
}
>(
  "bug/delete",
  async (payload, { rejectWithValue, getState, dispatch}) => {
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

      const {data} = await axios.delete(
        `${BaseURL}/bugs/${payload?.bugId}`,
        config
      );
    
      dispatch(resetBugDeleted());
      return data;
    } catch (err) {
    let error: AxiosError<AppErrors> = err // cast the error for access
    if (!error.response) {
      throw err
    }
  
    return rejectWithValue(error.response.data)
  }
  }
);

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
    // create bug
    // handle pending state
    builder.addCase(createBugAction.pending, (state) => {
      state.bugCreatedLoading = true;
      state.bugAppErr = undefined;
      state.bugServerErr = undefined;
    });
 
    //hande success state
    builder.addCase(createBugAction.fulfilled, (state, action) => {
      state.bug= action?.payload;
      state.bugCreatedLoading = false;
      state.bugAppErr = undefined;
      state.bugServerErr = undefined;
    });
    //hande rejected state

    builder.addCase(createBugAction.rejected, (state, action) => {
      state.bugCreatedLoading = false;
      state.bugAppErr= action?.payload?.msg;
      state.bugServerErr = action?.error?.message;
    });

    // fetch one bug
    //handle pending state
    builder.addCase(fetchbugAction.pending, (state, action) => {
      state.bugLoading = true;
      state.bugAppErr = undefined;
      state.bugServerErr = undefined;
    });

    //hande success state
    builder.addCase(fetchbugAction.fulfilled, (state, action) => {
      state.bug= action?.payload;
      state.bugLoading = false;
    });
    //hande rejected state

    builder.addCase(fetchbugAction.rejected, (state, action) => {
      state.bugLoading = false;
      state.bugAppErr = action?.payload?.msg;
      state.bugServerErr = action?.error?.message;
    });

    //  fetch all bug bugs by gender
    //handle pending state
    builder.addCase(fetchbugsAction.pending, (state, action) => {
      state.bugsLoading = true;
      state.bugAppErr = undefined;
      state.bugServerErr = undefined;
    });

    //hande success state
    builder.addCase(fetchbugsAction.fulfilled, (state, action) => {
      state.bugsFetched= action?.payload;
      state.bugsLoading = false;
      state.bugAppErr = undefined;
      state.bugServerErr = undefined;
    });
    //hande rejected state

    builder.addCase(fetchbugsAction.rejected, (state, action) => {
      state.bugLoading = false;
      state.bugAppErr = action?.payload?.msg;
      state.bugServerErr = action?.error?.message;
    });

    // edit a bug

    //handle pending state
    builder.addCase(editBugsAction.pending, (state, action) => {
      state.editedBugLoading = true;
  
    });

    //hande success state
    builder.addCase(editBugsAction.fulfilled, (state, action) => {
      state.bug= action?.payload;
      state.editedBugLoading = false;
    });
    //hande rejected state

    builder.addCase(editBugsAction.rejected, (state, action) => {
      state.editedBugLoading = false;
      state.bugAppErr = action?.payload?.msg;
      state.bugServerErr = action?.error?.message;
    });

    //delete  an bug -action

    // delete a bug
    //handle pending state
    builder.addCase(deleteBugAction.pending, (state, action) => {
      state.deletedBugLoading = true;
    });

    //hande success state
    builder.addCase(deleteBugAction.fulfilled, (state, action) => {
      state.bug= action?.payload;
      state.deletedBugLoading = false;
  
    });
    //hande rejected state

    builder.addCase(deleteBugAction.rejected, (state, action) => {
      state.deletedBugLoading = false;
      state.bugAppErr = action?.payload?.msg;
      state.bugServerErr = action?.error?.message;
    });
  },
});

export default bugsSlices.reducer;
