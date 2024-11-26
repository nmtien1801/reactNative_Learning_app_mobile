import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReviewByCourseService, createReview } from "../service/userService"; // Thêm service submit review

// Initial state
const initialState = {
  listReview: [], // Danh sách reviews cho khóa học
  isLoading: false,
  isError: false,
};

// Action để lấy danh sách reviews
export const getReviewByCourse = createAsyncThunk(
  "review/getReviewByCourse",
  async (courseId, thunkAPI) => {
    const response = await getReviewByCourseService(courseId);
    return response.data;
  }
);

// Action để gửi review
export const submitCourseReview = createAsyncThunk(
  "review/createReview",
  async ({ courseID, userID, rating }, thunkAPI) => {
    try {
      const response = await createReview(courseID, userID, rating);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Submit failed");
    }
  }
);

// Reducer
const reviewSlice = createSlice({
  name: "review",
  initialState,

  // Xử lý các trạng thái của API trong extraReducers
  extraReducers: (builder) => {
    // Xử lý getReviewByCourse
    builder
      .addCase(getReviewByCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getReviewByCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listReview = action.payload.DT || [];
      })
      .addCase(getReviewByCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // Xử lý submitCourseReview
    builder
      .addCase(submitCourseReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(submitCourseReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const { courseID, rating } = action.meta.arg; // Lấy thông tin từ payload
        // Nếu cần lưu danh sách đánh giá, cập nhật state tại đây
        const course = state.listReview.find(
          (item) => item.courseID === courseID
        );
        if (course) {
          course.rating = rating; // Cập nhật rating mới
        }
      })

      .addCase(submitCourseReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = reviewSlice.actions; // Không có action nào trong reducer, chỉ dùng extraReducers

export default reviewSlice.reducer;
