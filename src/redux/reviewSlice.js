import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReviewByCourseService } from "../service/userService";

const initialState = {
  listReview: [],
  isLoading: false,
  isError: false,
};

// action -> export
export const getReviewByCourse = createAsyncThunk(
  "review/getReviewByCourse",
  async ( courseId, thunkAPI) => {
    const response = await getReviewByCourseService(courseId); 
    return response.data;
  }
);

// đây là reducer
const reviewSlice = createSlice({
  name: "review",
  initialState,

  // dùng api mới sử dụng extraReducers
  // 3 trạng thái của api: pending, fulfilled, rejected
  extraReducers: (builder) => {
    // getAllLesson
    builder
      .addCase(getReviewByCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getReviewByCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listReview = action.payload.DT || [];
        console.log("action: ", action);
      })
      .addCase(getReviewByCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    
  },
});

export const {} = reviewSlice.actions; // đây là action -> chỉ dùng khi trong reducer có reducers:{}

export default reviewSlice.reducer;
