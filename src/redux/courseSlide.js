import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findAllCoursesService } from "../service/userService";

const initialState = {
  listCourse: [],
  isLogin: false, // kiểm tra xem đã login chưa -> chặn nếu chưa login
  isLoading: false,
  isError: false,
};

// action -> export
export const findAllCourses = createAsyncThunk(
  "course/findAllCourses",
  async ( thunkAPI) => {
    const response = await findAllCoursesService(); 
    return response.data;
  }
);


// đây là reducer
const authSlice = createSlice({
  name: "course",
  initialState,

  // dùng api mới sử dụng extraReducers
  // 3 trạng thái của api: pending, fulfilled, rejected
  extraReducers: (builder) => {
    // login user
    builder
      .addCase(findAllCourses.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(findAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCourse = action.payload.DT || [];
        console.log("listCourse", action.payload.DT);
        
        state.isLogin = true;
      })
      .addCase(findAllCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    
  },
});

export const {} = authSlice.actions; // đây là action -> chỉ dùng khi trong reducer có reducers:{}

export default authSlice.reducer;
