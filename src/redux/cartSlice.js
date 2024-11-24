import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartByUserService, addCartService } from "../service/userService";

const initialState = {
  listCart: [], // Giỏ hàng mặc định là một mảng trống
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Action async để lấy giỏ hàng của người dùng
export const getCartByUser = createAsyncThunk(
  "cart/getCartByUser",
  async (userID, thunkAPI) => {
    const response = await getCartByUserService(userID);
    return response.data;
  }
);

// Action async để thêm khóa học vào giỏ hàng
export const addCart = createAsyncThunk(
  "cart/addCart",
  async (data, thunkAPI) => {
    const response = await addCartService(data);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartByUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCartByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCart = action.payload;
      })
      .addCase(getCartByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });

    builder
      .addCase(addCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCart = action.payload;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export default cartSlice.reducer;
