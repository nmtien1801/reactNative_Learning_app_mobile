import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTopTeacherService,
  getCourseOfUserService,
  getAllCourseUserService,
  findCourseUserState1Service,
  findCourseUserState2Service,
  getSaveCourseOfUserService,
} from "../service/userService";

const initialState = {
  topTeacher: [],
  listCourse: [],
  isLoading: false,
  isError: false,
};

// action -> export
export const getTopTeacher = createAsyncThunk(
  "user/getTopTeacher",
  async (thunkAPI) => {
    const response = await getTopTeacherService();
    return response.data;
  }
);

export const getCourseOfUser = createAsyncThunk(
  "user/getCourseOfUser",
  async (id, thunkAPI) => {
    const response = await getCourseOfUserService(id);
    return response.data;
  }
);

export const getAllCourseUser = createAsyncThunk(
  "user/getAllCourseUser",
  async (id, thunkAPI) => {
    const response = await getAllCourseUserService(id);
    return response.data;
  }
);

export const findCourseUserState1 = createAsyncThunk(
  "user/findCourseUserState1",
  async (id, thunkAPI) => {
    const response = await findCourseUserState1Service(id);
    return response.data;
  }
);

export const findCourseUserState2 = createAsyncThunk(
  "user/findCourseUserState2",
  async (id, thunkAPI) => {
    const response = await findCourseUserState2Service(id);
    return response.data;
  }
);

export const getSaveCourseOfUser = createAsyncThunk(
  "user/getSaveCourseOfUser",
  async ({ id, state }, thunkAPI) => {
    const response = await getSaveCourseOfUserService(id, state);
    return response.data;
  }
);

// đây là reducer
const userSlice = createSlice({
  name: "user",
  initialState,

  // dùng api mới sử dụng extraReducers
  // 3 trạng thái của api: pending, fulfilled, rejected
  extraReducers: (builder) => {
    // getTopTeacher
    builder
      .addCase(getTopTeacher.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTopTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.topTeacher = action.payload.DT || [];
      })
      .addCase(getTopTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // getCourseOfUser
    builder
      .addCase(getCourseOfUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCourseOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listCourse = action.payload.DT || [];
      })
      .addCase(getCourseOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // getAllCourseUser
    builder
      .addCase(getAllCourseUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllCourseUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listCourse = action.payload.DT || [];
      })
      .addCase(getAllCourseUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // findCourseUserState1
    builder
      .addCase(findCourseUserState1.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(findCourseUserState1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listCourse = action.payload.DT || [];
      })
      .addCase(findCourseUserState1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // findCourseUserState2
    builder
      .addCase(findCourseUserState2.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(findCourseUserState2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listCourse = action.payload.DT || [];
      })
      .addCase(findCourseUserState2.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // getSaveCourseOfUser
    builder
      .addCase(getSaveCourseOfUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getSaveCourseOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listCourse = action.payload.DT || [];
      })
      .addCase(getSaveCourseOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = userSlice.actions; // đây là action -> chỉ dùng khi trong reducer có reducers:{}

export default userSlice.reducer;
