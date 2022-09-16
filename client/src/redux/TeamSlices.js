import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../utils/BaseUrl";

// actions for redirect after action is completed
// create team action

export const createTeamAction = createAsyncThunk(
  "team/create",
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

      const { data } = await axios.post(`${BaseURL}/teams`, payload, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// action to get one team into our state

export const fetchTeamAction = createAsyncThunk(
  "team/fetch",
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

      const { data } = await axios.get(
        `${BaseURL}/teams/${payload?.id}`,
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

export const fetchAllTeamsAction = createAsyncThunk(
  "all/teams/fetch",
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

      const { data } = await axios.get(`${BaseURL}/teams`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// edit team
export const editteam = createAsyncThunk(
  "teams/update",
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
        `${BaseURL}/teams/${payload?._id}`,
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

export const deleteteamAction = createAsyncThunk(
  "team/delete",
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
        `${BaseURL}/teams/${payload?._id}`,
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

const teamsSlices = createSlice({
  name: "team",
  initialState: {},
  extraReducers: (builder) => {
    // create team
    // handle pending state
    builder.addCase(createTeamAction.pending, (state, action) => {
      state.teamLoading = true;
      state.teamAppErr = undefined;
      state.teamServerErr = undefined;
    });

    //hande success state
    builder.addCase(createTeamAction.fulfilled, (state, action) => {
      state.teamCreated = action?.payload;
      state.teamLoading = false;
      state.teamAppErr = undefined;
      state.teamServerErr = undefined;
      state.isteamCreated = false;
    });
    //hande rejected state

    builder.addCase(createTeamAction.rejected, (state, action) => {
      state.teamLoading = false;
      state.teamAppErr = action?.payload?.msg;
      state.teamServerErr = action?.error?.msg;
    });

    // fetch one team
    //handle pending state
    builder.addCase(fetchTeamAction.pending, (state, action) => {
      state.teamLoading = true;
      state.teamAppErr = undefined;
      state.teamServerErr = undefined;
    });

    //hande success state
    builder.addCase(fetchTeamAction.fulfilled, (state, action) => {
      state.teamCreated = action?.payload;
      state.teamLoading = false;
      state.teamAppErr = undefined;
      state.teamServerErr = undefined;
    });
    //hande rejected state

    builder.addCase(fetchTeamAction.rejected, (state, action) => {
      state.teamLoading = false;
      state.teamAppErr = action?.payload?.msg;
      state.teamServerErr = action?.error?.msg;
    });

    //  fetch all team teams by gender
    //handle pending state
    builder.addCase(fetchAllTeamsAction.pending, (state, action) => {
      state.teamLoading = true;
      state.teamAppErr = undefined;
      state.teamServerErr = undefined;
    });

    //hande success state
    builder.addCase(fetchAllTeamsAction.fulfilled, (state, action) => {
      state.teamsFetched = action?.payload;
      state.teamLoading = false;
      state.teamAppErr = undefined;
      state.teamServerErr = undefined;
    });
    //hande rejected state

    builder.addCase(fetchAllTeamsAction.rejected, (state, action) => {
      state.teamLoading = false;
      state.teamAppErr = action?.payload?.msg;
      state.teamServerErr = action?.error?.msg;
    });

    // edit a team

    //handle pending state
    builder.addCase(editteam.pending, (state, action) => {
      state.teamLoading = true;
      state.teamAppErr = undefined;
      state.teamServerErr = undefined;
    });

    //hande success state
    builder.addCase(editteam.fulfilled, (state, action) => {
      state.teamEdited = action?.payload;
      state.teamLoading = false;
      state.teamAppErr = undefined;
      state.teamServerErr = undefined;
    });
    //hande rejected state

    builder.addCase(editteam.rejected, (state, action) => {
      state.teamLoading = false;
      state.teamAppErr = action?.payload?.msg;
      state.teamServerErr = action?.error?.msg;
    });

    //delete  an team -action

    // delete a team
    //handle pending state
    builder.addCase(deleteteamAction.pending, (state, action) => {
      state.teamLoading = true;
      state.teamAppErr = undefined;
      state.teamerverErr = undefined;
    });

    //hande success state
    builder.addCase(deleteteamAction.fulfilled, (state, action) => {
      state.teamd = action?.payload;
      state.teamLoading = false;
      state.teamAppErr = undefined;
      state.teamerverErr = undefined;
    });
    //hande rejected state

    builder.addCase(deleteteamAction.rejected, (state, action) => {
      state.teamLoading = false;
      state.teamAppErr = action?.payload?.msg;
      state.teamerverErr = action?.error?.msg;
    });
  },
});

export default teamsSlices.reducer;
