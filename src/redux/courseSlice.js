import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  findAllCoursesService,
  findPopularCourseService,
  findCourseByIDService,
  findCourseSimilarService,
  searchCourseService,
  findInspireCoursesService,
  findCourseByCategoryService,
  updateSaveCourseService,
  updateGoIngCourseService,
} from "../service/userService";

const initialState = {
  listCourse: [],
  listCourseInspire: [],
  listCoursePopular: [],
  listCart: [], // Giỏ hàng sẽ lưu trữ các khóa học đã thêm
  courseDetail: {},
  listCourseSimilar: [],
  listSave: [],
  isSave: null,
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

export const searchCourse = createAsyncThunk(
  "course/searchCourse",
  async (keyword, thunkAPI) => {
    const response = await searchCourseService(keyword);
    return response.data;
  }
);

export const findInspireCourses = createAsyncThunk(
  "course/findInspireCourses",
  async (thunkAPI) => {
    const response = await findInspireCoursesService();
    return response.data;
  }
);

export const findCourseByCategory = createAsyncThunk(
  "course/findCourseByCategory",
  async (categoryID, thunkAPI) => {
    const response = await findCourseByCategoryService(categoryID);
    return response.data;
  }
);

export const updateSaveCourse = createAsyncThunk(
  "course/updateSaveCourse",
  async ({ courseID, state }, thunkAPI) => {
    const response = await updateSaveCourseService(courseID, state);
    return response.data;
  }
);

export const updateGoIngCourse = createAsyncThunk(
  "course/updateGoIngCourse",
  async (courseID, thunkAPI) => {
    const response = await updateGoIngCourseService(courseID);
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
    saveCourse: (state, action) => {
      state.listSave.push(action.payload);
    },

    // Remove course from save
    removeCourse: (state, action) => {
      state.listSave = state.listSave.filter(
        (course) => course.id !== action.payload.id
      );
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

    // searchCourse
    builder
      .addCase(searchCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(searchCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCourse = action.payload.DT || [];
        state.isLogin = true;
      })
      .addCase(searchCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });

    // findInspireCourses
    builder
      .addCase(findInspireCourses.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(findInspireCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCourseInspire = action.payload.DT || [];
        state.isLogin = true;
      })
      .addCase(findInspireCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });

    // findCourseByCategory
    builder
      .addCase(findCourseByCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(findCourseByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCourse = action.payload.DT || [];
        state.isLogin = true;
      })
      .addCase(findCourseByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });

    // updateSaveCourse
    builder
      .addCase(updateSaveCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        // state.isSave = null;
      })
      .addCase(updateSaveCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSave = action.payload.DT;
      })
      .addCase(updateSaveCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });

    // updateGoIngCourse
    builder
      .addCase(updateGoIngCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(updateGoIngCourse.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateGoIngCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  clearCart,
  saveCourse,
  removeCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
