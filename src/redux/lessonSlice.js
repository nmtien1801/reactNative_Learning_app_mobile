import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllLessonService,
  getLessonByCourseService,
} from "../service/userService";
import {
  createLessonService,
  deleteVideoService,
  updateLessonService,
} from "../service/teacherService";

const initialState = {
  urlVideo: "https://www.youtube.com/embed/vs5N49eZyKg?list=RDvs5N49eZyKg",
  listLesson: [],
  isLoading: false,
  isError: false,
};

// action -> export
export const getAllLesson = createAsyncThunk(
  "lesson/getAllLesson",
  async (thunkAPI) => {
    const response = await getAllLessonService();
    return response.data;
  }
);

export const getLessonByCourse = createAsyncThunk(
  "lesson/getLessonByCourse",
  async (courseID, thunkAPI) => {
    const response = await getLessonByCourseService(courseID);
    return response.data;
  }
);

export const createLesson = createAsyncThunk(
  "lesson/createLesson",
  async (data, thunkAPI) => {
    const response = await createLessonService(data);
    return response.data;
  }
);

export const deleteVideo = createAsyncThunk(
  "lesson/deleteVideo",
  async (videoID, thunkAPI) => {
    const response = await deleteVideoService(videoID);
    return response.data;
  }
);

export const updateLesson = createAsyncThunk(
  "lesson/updateLesson",
  async (data, thunkAPI) => {
    const response = await updateLessonService(data);
    return response.data;
  }
);

// đây là reducer
const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    // Add url video
    addUrlVideo: (state, action) => {
      state.urlVideo = action.payload;
    },
  },

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
      })
      .addCase(getAllLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // getLessonByCourse
    builder
      .addCase(getLessonByCourse.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getLessonByCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listLesson = action.payload.DT || {};
      })
      .addCase(getLessonByCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // createLesson
    builder
      .addCase(createLesson.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError;
      });

    // deleteVideo
    builder
      .addCase(deleteVideo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError;
      });

    // updateLesson
    builder
      .addCase(updateLesson.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { addUrlVideo} = lessonSlice.actions; // đây là action -> chỉ dùng khi trong reducer có reducers:{}

export default lessonSlice.reducer;
