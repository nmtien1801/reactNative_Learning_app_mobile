import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleLoginApi, logOutUser, registerUser } from "../service/userService";

const initialState = {
  user: {}, // user info nào login(hs - teacher)
  isLogin: false, // kiểm tra xem đã login chưa -> chặn nếu chưa login
  isLoading: false,
  isError: false,
};

// action -> export
export const handleLogin = createAsyncThunk(
  "users/handleLogin",
  async ({ email, password }, thunkAPI) => {
    const response = await handleLoginApi(email, password); // Đảm bảo hàm được gọi đúng cách
    return response.data;
  }
);

export const handleLogout = createAsyncThunk(
  "users/handleLogout",
  async (thunkAPI) => {
    const response = await logOutUser();
    return response.data;
  }
);

export const handleRegister = createAsyncThunk(
  "users/handleRegister",
  async ({email, userName, password},thunkAPI) => {
    const response = await registerUser(email, userName, password);
    return response.data;
  }
);

// đây là reducer
const authSlice = createSlice({
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
        state.user = action.payload.DT || {};
        state.isLogin = true;
        

        // state.token = action.payload.token;
        localStorage.setItem("learning_App", action.payload.DT.access_token); // Lưu token vào localStorage
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // logout user
    builder
      .addCase(handleLogout.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(handleLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {};
        state.isLogin = false;
        localStorage.removeItem("learning_App"); // Xóa token khỏi localStorage
        console.log("action: ", action);
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // register user
    builder
      .addCase(handleRegister.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        console.log("action: ", action);
        
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = authSlice.actions; // đây là action -> chỉ dùng khi trong reducer có reducers:{}

export default authSlice.reducer;
