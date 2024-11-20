import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleTeacherOverview } from "../service/teacherService";

const initialState = {
  teacherOverview: null, // Chỉnh sửa thành null thay vì {} để dễ kiểm tra.
  isLoading: false,
  isError: false,
};

export const fetchTeacherOverview = createAsyncThunk(
  "teacher/fetchTeacherOverview",
  async (teacherID, thunkAPI) => {
    try {
      const response = await handleTeacherOverview(teacherID);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Trả về lỗi nếu có
    }
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
        state.teacherOverview = action.payload; // Cập nhật state teacherOverview
      })
      .addCase(fetchTeacherOverview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error fetching teacher data:", action.payload); // Log lỗi khi fetch bị lỗi
      });
  },
});

export default teacherSlice.reducer;
