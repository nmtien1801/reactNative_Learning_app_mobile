import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleTeacherOverview,
  handleFindCourseByTeacherID_Categories,
  addNewCourseService,
} from "../service/teacherService";

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

export const fetchTeacherCourses = createAsyncThunk(
  "teacher/findCourseByTeacherID_Categories",
  async (teacherID, thunkAPI) => {
    try {
      const response = await handleFindCourseByTeacherID_Categories(teacherID);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Trả về lỗi nếu có
    }
  }
);

export const addNewCourse = createAsyncThunk(
  "teacher/addNewCourse",
  async (course, thunkAPI) => {
    try {
      const response = await addNewCourseService(course);
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

    builder
      .addCase(fetchTeacherCourses.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTeacherCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.TeacherCourses = action.payload; // Cập nhật state TeacherCourses
      })
      .addCase(fetchTeacherCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error fetching teacher courses:", action.payload); // Log lỗi khi fetch bị lỗi
      });

      // addNewCourse
      builder
      .addCase(addNewCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addNewCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(addNewCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error adding new course:", action.payload); // Log lỗi khi fetch b
      });

  },
});

export default teacherSlice.reducer;
