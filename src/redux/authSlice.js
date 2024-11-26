import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleLoginApi,
  logOutUser,
  registerUser,
  changePasswordService,
} from "../service/userService";

const initialState = {
  user: {}, // user info nào login(hs - teacher)
  isLogin: false, // kiểm tra xem đã login chưa -> chặn nếu chưa login
  isLoading: false,
  isError: false,
};

// action -> export
export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async ({ email, password }, thunkAPI) => {
    const response = await handleLoginApi(email, password); // Đảm bảo hàm được gọi đúng cách
    return response.data;
  }
);

export const handleLogout = createAsyncThunk(
  "auth/handleLogout",
  async (thunkAPI) => {
    const response = await logOutUser();
    return response.data;
  }
);

export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async ({ email, userName, password }, thunkAPI) => {
    const response = await registerUser(email, userName, password);
    return response.data;
  }
);

export const handleChangePassword = createAsyncThunk(
  "auth/handleChangePassword",
  async ({ currentPassword, newPassword, email }, thunkAPI) => {
    const response = await changePasswordService(
      currentPassword,
      newPassword,
      email
    );
    return response.data;
  }
);

// đây là reducer
const authSlice = createSlice({
  name: "auth",
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
        if (action.payload.EC === 0) {
          state.isLogin = true;
        } else state.isLogin = false;

        // state.token = action.payload.token;
        // localStorage.setItem("learning_App", action.payload.DT.access_token); // Lưu token vào localStorage
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
        if (action.payload.EC === 0) {
          state.isLogin = false;
        } else state.isLogin = true;
        // localStorage.removeItem("learning_App"); // Xóa token khỏi localStorage
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

    // change password
    builder
      .addCase(handleChangePassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(handleChangePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        console.log("action: ", action);
      })
      .addCase(handleChangePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = authSlice.actions; // đây là action -> chỉ dùng khi trong reducer có reducers:{}

export default authSlice.reducer;
