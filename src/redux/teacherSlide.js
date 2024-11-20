import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleTeacherOverview } from "../service/teacherService";

const initialState = {
  teacherOverview: {},
  isLogin: false,
  isLoading: false,
  isError: false,
};

export const fetchTeacherOverview = createAsyncThunk(
  "teacher/fetchTeacherOverview/:teacherID",
  async (teacherID, thunkAPI) => {
    const response = await handleTeacherOverview(teacherID);
    return response.data; // Trả về dữ liệu từ API
  }
);

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherOverview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTeacherOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teacherOverview = action.payload; // Gán dữ liệu vào state
        console.log("teacherOverview", action.payload); // Kiểm tra dữ liệu
      })
      .addCase(fetchTeacherOverview.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default teacherSlice.reducer;
