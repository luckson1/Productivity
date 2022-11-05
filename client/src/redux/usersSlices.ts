import {
  createAsyncThunk,
  createSlice,
  createAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BaseURL } from "../utils/BaseUrl";
import { getState } from "./Hooks";
import { AppDispatch, AppState } from "./Store";

export interface User {
  email: string;
  userId?: string;

  firstName?: string;
  lastName?: string;
  isAdmin?: boolean | undefined;
  password?: string;
  image?: string;
  invitedBy?: Array<string>;
  role?: string;
  status?: string;
}

export interface userData extends User {
  _id: string;
  image: string;
  isAdmin: boolean | undefined;
  updatedAt: string;
  createdAt: string;
}
interface AppErrors {
  msg: string | undefined;
}
interface UserResponse {
  user: userData;
  token?: string;
  teamMembers?: Array<userData>;
}

interface State {
  userServerErr: string | null | undefined;
  userAppErr: string | null | undefined;

  userProfile: UserResponse;
  isEdit: boolean;
  showModal: boolean;
  showProfileModal: boolean;
  isSignUp: boolean;
  isRegistered: boolean;
  userLoading: boolean;
  isLoggedIn: boolean;
  userAuth?: UserResponse;
  teamProfile: UserResponse;
  isProfilecreated: boolean;
}

//action
export const resetProfilecreated = createAction("user/created/reset");
export const resetUserRegistered = createAction("user/registered/reset");
export const isEditMode = createAction("user/isEdit/mode");
export const isEditModeReset = createAction("user/isEdit/reset");
export const isShowModal = createAction("user/isShowModal");
export const isShowModalReset = createAction("user/isShowModal/reset");
export const isShowProfileModal = createAction("user/isShowProfileModal");
export const isShowProfileModalReset = createAction(
  "user/isShowProfileModal/reset"
);
export const isShowSignUpModal = createAction("user/isShowSignUpModal");
export const isShowSignUpModalReset = createAction(
  "user/isShowSignUpModal/reset"
);
//login action creation
export const resetLoginAction = createAction("user/login/reset");

//create profile when onboarding
export const createProfileAction = createAsyncThunk<
  UserResponse,
  User,
  { rejectValue: AppErrors; dispatch: AppDispatch }
>("user/profile/create", async (payload, { rejectWithValue, dispatch }) => {
  const userToken = getState((state) => state?.users?.userAuth?.token)
    ? getState((state) => state?.users?.userAuth?.token)
    : getState((state) => state?.users?.userProfile?.token);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    //http call
    const { data } = await axios.put(`${BaseURL}/users`, payload, config);


    dispatch(resetProfilecreated());
    return data;
  } catch (err) {
    let error: AxiosError<AppErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

export const editProfilePicAction = createAsyncThunk<
  UserResponse,
  User,
  { rejectValue: AppErrors; dispatch: AppDispatch; state: AppState }
>("user/pic/edit", async (payload, { rejectWithValue, dispatch, getState }) => {
  const userToken = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${userToken}`,
    },
  };
  try {
    const { data } = await axios.put(`${BaseURL}/users`, payload, config);

    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
});


// const userAuth = getState((state) => state?.auth);
const initialState = {
} as State;
const usersSlices = createSlice({
  name: "user",
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

    // render user  profile modals/components
    builder.addCase(isShowProfileModal, (state, action) => {
      state.showProfileModal = true;
    });
    builder.addCase(isShowProfileModalReset, (state, action) => {
      state.showProfileModal = false;
    });
    // render team  form modals/components
    builder.addCase(isShowModal, (state, action) => {
      state.showModal = true;
    });
    builder.addCase(isShowModalReset, (state, action) => {
      state.showModal = false;
    });
    builder.addCase(isShowSignUpModal, (state, action) => {
      state.isSignUp = true;
    });
    builder.addCase(isShowSignUpModalReset, (state, action) => {
      state.isSignUp = false;
    });

    // register

    
    // slices to handle creation of profile info
    // handle pending state
    builder.addCase(createProfileAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(resetProfilecreated, (state, action) => {
      state.isProfilecreated = true;
    });

    //hande success state
    builder.addCase(createProfileAction.fulfilled, (state, action) => {
      state.userProfile = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
      state.isProfilecreated = false;
    });
    //hande rejected state

    builder.addCase(createProfileAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.message;
    });
    // slices to handle update of profile pic
    // handle pending state
    builder.addCase(editProfilePicAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });

    //hande success state
    builder.addCase(editProfilePicAction.fulfilled, (state, action) => {
      state.userProfile = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //hande rejected state

    builder.addCase(editProfilePicAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.message;
    });

  },
});

export default usersSlices.reducer;
