import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProjectByUserService,
  createProjectService,
} from "../service/userService";

const initialState = {
  listProjectUser: [],

  isLoading: false,
  isError: false,
};

// action -> export
export const getProjectByUser = createAsyncThunk(
  "project/getProjectByUser",
  async (id, thunkAPI) => {
    const response = await getProjectByUserService(id);
    return response.data;
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (data, thunkAPI) => {
    const response = await createProjectService(data);
    return response.data;
  }
);

// đây là reducer
const projectSlice = createSlice({
  name: "project",
  initialState,

  // dùng api mới sử dụng extraReducers
  // 3 trạng thái của api: pending, fulfilled, rejected
  extraReducers: (builder) => {
    // getProjectByUser
    builder
      .addCase(getProjectByUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProjectByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listProjectUser = action.payload.DT || {};
      })
      .addCase(getProjectByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    //  createProject
    builder
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = projectSlice.actions; // đây là action -> chỉ dùng khi trong reducer có reducers:{}

export default projectSlice.reducer;
