import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleTeacherOverview } from "../service/teacherService";

const initialState = {
  user: {}, // user info nào login(hs - teacher)
  isLogin: false, // kiểm tra xem đã login chưa -> chặn nếu chưa login
  isLoading: false,
  isError: false,
};

// action -> export
export const handleTeacherOverview = createAsyncThunk(
  "users/handleTeacherOverview",
  async (thunkAPI) => {
    const response = await handleTeacherOverview();
    return response.data;
  }
);

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  extraReducers: (builder) => {
    // login user
    builder
      .addCase(handleTeacherOverview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(handleTeacherOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.DT || {};
        state.isLogin = true;
      })
      .addCase(handleTeacherOverview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = authSlice.actions; // đây là action -> chỉ dùng khi trong reducer có reducers:{}

export default teacherSlice.reducer;
