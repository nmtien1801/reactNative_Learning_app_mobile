import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {handleLoginAPI} from "../service/userService"

const initialState = {
  user: {}, // user info nào login(hs - teacher)
  isLoading: false,
  isError: false,
};

const handleLogin = createAsyncThunk(
  "users/handleLogin",
  async ({email, password}, thunkAPI) => {
    const response = await handleLoginAPI(email, password);
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
    // login user
    builder
      .addCase(handleLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        // state.token = action.payload.token;
        // localStorage.setItem("token", action.payload.token); // Lưu token vào localStorage
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true
      });
  },
});

export const {} = userSlice.actions; // đây là action

export default userSlice.reducer;
