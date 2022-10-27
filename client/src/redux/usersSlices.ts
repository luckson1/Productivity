import {
  createAsyncThunk,
  createSlice,
  createAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { TypedUseSelectorHook } from "react-redux";
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
export const registerUserAction = createAsyncThunk<
  UserResponse,
  User,
  { rejectValue: AppErrors; dispatch: AppDispatch }
>("user/register", async (payload, { rejectWithValue, dispatch }) => {
  // configuring the request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    //http call

    const { data } = await axios.post(
      `${BaseURL}/users/register`,
      payload,
      config
    );

    //save user into localstorage
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(resetUserRegistered());
    return data;
  } catch (err) {
    let error: AxiosError<AppErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

// action to handle creation/invitation of a user by an admin
export const createUserAction = createAsyncThunk<
  UserResponse,
  User,
  { rejectValue: AppErrors; state: AppState; dispatch: AppDispatch }
>("user/invite", async (payload, { rejectWithValue, getState }) => {
  const userToken = getState().auth.token;
  //configure headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };
  try {
    //http call
    const { data } = await axios.post(
      `${BaseURL}/users/create`,
      payload,
      config
    );
    return data;
  } catch (err) {
    let error: AxiosError<AppErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

//login action

export const loginUserAction = createAsyncThunk<
  UserResponse,
  User,
  { rejectValue: AppErrors; dispatch: AppDispatch }
>("user/login", async (payload, { rejectWithValue, dispatch }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    //http call
    const { data } = await axios.post(
      `${BaseURL}/users/login`,
      payload,
      config
    );

    //save user into localstorage
    dispatch(resetLoginAction());
    return data;
  } catch (err) {
    let error: AxiosError<AppErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});



// get data of a single Profile

export const fetchUserProfileAction = createAsyncThunk<
  UserResponse,
  undefined,
  { rejectValue: AppErrors; dispatch: AppDispatch; state: AppState }
>("user/profile", async (payload, { rejectWithValue, getState }) => {
  const userToken = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    //http call
    const { data } = await axios.get(`${BaseURL}/users/profile`, config);

    localStorage.setItem("userData", JSON.stringify(data));
    return data;
  } catch (err) {
    let error: AxiosError<AppErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});
// get data of a team members

export const fetchTeamMembersAction = createAsyncThunk<
  UserResponse,
  undefined,
  { rejectValue: AppErrors; dispatch: AppDispatch; state: AppState }
>("user/team", async (payload, { rejectWithValue, getState }) => {
  const userToken = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    //http call
    const { data } = await axios.get(`${BaseURL}/users/team`, config);

    return data;
  } catch (err) {
    let error: AxiosError<AppErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

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

    localStorage.setItem("userData", JSON.stringify(data));
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
    localStorage.setItem("userData", JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
});

export const editProfileAction = createAsyncThunk<
  UserResponse,
  User,
  { rejectValue: AppErrors; dispatch: AppDispatch; state: AppState }
>("user/edit", async (payload, { rejectWithValue, dispatch, getState }) => {
  const userToken = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };
  try {
    const { data } = await axios.put(
      `${BaseURL}/users/update`,
      payload,
      config
    );
    localStorage.setItem("userData", JSON.stringify(data));

    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
});


// const userAuth = getState((state) => state?.auth);
const initialState = {
  userProfile: {},
  userAuth: {},

  userServerErr: null,
  userAppErr: null,
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

    // handle pending state
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(resetUserRegistered, (state, action) => {
      state.isRegistered = true;
    });
    //hande success state
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.userProfile = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
      state.isRegistered = false;
    });
    //handle rejected state

    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.message;
    });
    // create user by admin

    // handle pending state
    builder.addCase(createUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });

    //hande success state
    builder.addCase(createUserAction.fulfilled, (state, action) => {
      state.userProfile = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //handle rejected state

    builder.addCase(createUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.message;
    });

    // login
    // handle pending state
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(resetLoginAction, (state, action) => {
      state.isLoggedIn = true;
    });
    //hande success state
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
      state.isLoggedIn = false;
    });
    //hande rejected state

    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.message;
    });



    // profile

    // handle pending state
    builder.addCase(fetchUserProfileAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });

    //hande success state
    builder.addCase(fetchUserProfileAction.fulfilled, (state, action) => {
      state.userProfile = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //hande rejected state

    builder.addCase(fetchUserProfileAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.message;
    });

    // // team action
    // // handle pending state
    builder.addCase(fetchTeamMembersAction.pending, (state, action) => {
      state.userLoading = true;
    });

    //hande success state
    builder.addCase(fetchTeamMembersAction.fulfilled, (state, action) => {
      state.teamProfile = action?.payload;
      state.userLoading = false;
    });
    //hande rejected state

    builder.addCase(fetchTeamMembersAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.message;
    });

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
    // slices to handle update of profile info
    // handle pending state
    builder.addCase(editProfileAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });

    //hande success state
    builder.addCase(editProfileAction.fulfilled, (state, action) => {
      state.userProfile = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //hande rejected state

    builder.addCase(editProfileAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.message;
    });
  },
});

export default usersSlices.reducer;
