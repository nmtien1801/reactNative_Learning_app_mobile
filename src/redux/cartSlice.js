import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartByUserService, addCourseToCart } from "../service/userService";

const initialState = {
  listCart: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
  userID: 1, // Giả sử userID = 1
};

// Action async để lấy giỏ hàng của người dùng
export const getCartByUser = createAsyncThunk(
  "cart/getCartByUser",
  async (userID, thunkAPI) => {
    const response = await getCartByUserService(userID);
    return response.data;
  }
);

export const addCart = createAsyncThunk(
  "cart/addCourseToCart",
  async ({ courseID, userID }, thunkAPI) => {
    try {
      const response = await addCourseToCart(courseID, userID);
      return response.data; // Dữ liệu giỏ hàng cập nhật
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ:", error.response || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Khi lấy giỏ hàng thành công
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
        state.errorMessage = action.payload || action.error.message;
      });

    builder
      // Khi thêm khóa học vào giỏ hàng thành công
      .addCase(addCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading = false;
        // Cập nhật lại giỏ hàng sau khi thêm khóa học
        state.listCart = action.payload;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || action.error.message;
      });
  },
});

export default cartSlice.reducer;
