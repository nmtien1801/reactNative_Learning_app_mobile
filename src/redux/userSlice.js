import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTopTeacherService,
  getCourseOfUserService,
} from "../service/userService";

const initialState = {
  topTeacher: [],
  listCourse: [],
  isLoading: false,
  isError: false,
};

// action -> export
export const getTopTeacher = createAsyncThunk(
  "user/getTopTeacher",
  async (thunkAPI) => {
    const response = await getTopTeacherService();
    return response.data;
  }
);

export const getCourseOfUser = createAsyncThunk(
  "user/getCourseOfUser",
  async (id, thunkAPI) => {
    const response = await getCourseOfUserService(id);
    return response.data;
  }
);

// đây là reducer
const userSlice = createSlice({
  name: "user",
  initialState,

  // dùng api mới sử dụng extraReducers
  // 3 trạng thái của api: pending, fulfilled, rejected
  extraReducers: (builder) => {
    // getTopTeacher
    builder
      .addCase(getTopTeacher.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTopTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.topTeacher = action.payload.DT || [];
      })
      .addCase(getTopTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // getCourseOfUser
    builder
      .addCase(getCourseOfUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCourseOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listCourse = action.payload.DT || [];
      })
      .addCase(getCourseOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = userSlice.actions; // đây là action -> chỉ dùng khi trong reducer có reducers:{}

export default userSlice.reducer;
