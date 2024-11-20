import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk action to fetch teacher data
export const fetchTeacherOverview = createAsyncThunk(
  "teacher/fetchTeacherOverview",
  async (teacherID) => {
    const response = await axios.get(
      `http://localhost:8081/api/teacherOverview/${teacherID}`
    );
    return response.data.data; // Return the data from the API
  }
);

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teacherOverview: null,
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherOverview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTeacherOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teacherOverview = action.payload;
      })
      .addCase(fetchTeacherOverview.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default teacherSlice.reducer;
