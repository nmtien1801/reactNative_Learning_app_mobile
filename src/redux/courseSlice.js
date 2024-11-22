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
  courseDetail: {},
  listCourseSimilar: [],
  isLogin: false, // kiểm tra xem đã login chưa -> chặn nếu chưa login
  isLoading: false,
  isError: false,
};

// action -> export
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
// đây là reducer
const authSlice = createSlice({
  name: "course",
  initialState,

  // dùng api mới sử dụng extraReducers
  // 3 trạng thái của api: pending, fulfilled, rejected
  extraReducers: (builder) => {
    // findAllCourses
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

    // findPopularCourses
    builder
      .addCase(findPopularCourses.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(findPopularCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCoursePopular = action.payload.DT || [];
        console.log("listCoursePopular", action.payload.DT);

        state.isLogin = true;
      })
      .addCase(findPopularCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // findCourseByID
    builder
      .addCase(findCourseByID.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(findCourseByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseDetail = action.payload?.DT || {};
        console.log("courseDetail", action.payload?.DT);

        state.isLogin = true;
      })
      .addCase(findCourseByID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // findCourseSimilar
    builder
      .addCase(findCourseSimilar.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(findCourseSimilar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCourseSimilar = action.payload.DT || [];
        console.log("listCourseSimilar", action.payload.DT);

        state.isLogin = true;
      })
      .addCase(findCourseSimilar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = authSlice.actions; // đây là action -> chỉ dùng khi trong reducer có reducers:{}

export default authSlice.reducer;
