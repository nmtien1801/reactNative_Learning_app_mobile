import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllLessonService } from "../service/userService";

const initialState = {
  listLesson: [],
  isLoading: false,
  isError: false,
};

// action -> export
export const getAllLesson = createAsyncThunk(
  "lesson/getAllLesson",
  async ( thunkAPI) => {
    const response = await getAllLessonService(); 
    return response.data;
  }
);

// đây là reducer
const lessonSlice = createSlice({
  name: "lesson",
  initialState,

  // dùng api mới sử dụng extraReducers
  // 3 trạng thái của api: pending, fulfilled, rejected
  extraReducers: (builder) => {
    // getAllLesson
    builder
      .addCase(getAllLesson.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listLesson = action.payload.DT || {};
        state.isLogin = true;
        

        // state.token = action.payload.token;
        // localStorage.setItem("learning_App", action.payload.DT.access_token); // Lưu token vào localStorage
      })
      .addCase(getAllLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    
  },
});

export const {} = lessonSlice.actions; // đây là action -> chỉ dùng khi trong reducer có reducers:{}

export default lessonSlice.reducer;
