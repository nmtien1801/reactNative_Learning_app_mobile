import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  findAllCoursesService,
  findPopularCourseService,
  findCourseByIDService,
  findCourseSimilarService,
} from "../service/userService";

const initialState = {
  listCourse: [],
  listCourseInspire: [],
  listCoursePopular: [],
  listCart: [], // Giỏ hàng sẽ lưu trữ các khóa học đã thêm
  courseDetail: {},
  listCourseSimilar: [],
  isLogin: false, // Kiểm tra xem người dùng đã đăng nhập chưa
  isLoading: false,
  isError: false,
  errorMessage: "", // Store error message for debugging
};

// Action async để tìm các khóa học
export const findAllCourses = createAsyncThunk(
  "course/findAllCourses",
  async (thunkAPI) => {
    const response = await findAllCoursesService();
    return response.data;
  }
);

export const findPopularCourses = createAsyncThunk(
  "course/findPopularCourses",
  async (thunkAPI) => {
    const response = await findPopularCourseService();
    return response.data;
  }
);

export const findCourseByID = createAsyncThunk(
  "course/findCourseByID",
  async (id, thunkAPI) => {
    const response = await findCourseByIDService(id);
    return response.data;
  }
);

export const findCourseSimilar = createAsyncThunk(
  "course/findCourseSimilar",
  async (id, thunkAPI) => {
    const response = await findCourseSimilarService(id);
    return response.data;
  }
);

// Reducer
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    // Add course to cart
    addToCart: (state, action) => {
      const existingCourse = state.listCart.find(
        (course) => course.id === action.payload.id
      );
      if (!existingCourse) {
        state.listCart.push(action.payload);
      }
    },
    // Remove course from cart
    removeFromCart: (state, action) => {
      state.listCart = state.listCart.filter(
        (course) => course.id !== action.payload.id
      );
    },
    // Clear cart
    clearCart: (state) => {
      state.listCart = [];
    },
  },
  extraReducers: (builder) => {
    // findAllCourses
    builder
      .addCase(findAllCourses.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(findAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCourse = action.payload.DT || [];
        state.isLogin = true;
      })
      .addCase(findAllCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message; // Store error message
      });

    // findPopularCourses
    builder
      .addCase(findPopularCourses.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(findPopularCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCoursePopular = action.payload.DT || [];
        state.isLogin = true;
      })
      .addCase(findPopularCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });

    // findCourseByID
    builder
      .addCase(findCourseByID.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(findCourseByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseDetail = action.payload?.DT || {};
        state.isLogin = true;
      })
      .addCase(findCourseByID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });

    // findCourseSimilar
    builder
      .addCase(findCourseSimilar.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(findCourseSimilar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCourseSimilar = action.payload.DT || [];
        state.isLogin = true;
      })
      .addCase(findCourseSimilar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

// Export actions
export const { addToCart, removeFromCart, clearCart } = courseSlice.actions;

export default courseSlice.reducer;
