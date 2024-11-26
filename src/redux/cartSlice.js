import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartByUserService,
  addCourseToCart,
  deleteCartSelected,
  buyCoursesService,
} from "../service/userService";

const initialState = {
  listCart: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Action async to get the user's cart
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
      console.log("response", response); // Kiểm tra cấu trúc dữ liệu trả về từ API

      // Kiểm tra EC để xác định trạng thái thành công hay thất bại
      if (response.data.EC === 0) {
        // Nếu thành công, trả về dữ liệu trong DT
        return response.data.DT;
      } else {
        // Nếu có lỗi, từ chối với thông điệp lỗi
        return thunkAPI.rejectWithValue(response.data.EM);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Action async to delete selected cart items
export const deleteCart = createAsyncThunk(
  "/cart/deleteSelectedCourse",
  async (courseID, thunkAPI) => {
    console.log("courseID", courseID);
    try {
      const response = await deleteCartSelected(courseID);
      return response.data;
    } catch (error) {
      console.error("Error deleting selected cart items:", error);
      return thunkAPI.rejectWithValue(error.message || "Error deleting items");
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // When fetching cart is successful
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
      // When adding a course to the cart is successful
      .addCase(addCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading = false;
        // Thêm khóa học vào giỏ hàng (state.listCart sẽ được cập nhật với dữ liệu trả về từ DT)
        state.listCart = action.payload;
      })

      .addCase(addCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || action.error.message;
      });

    builder
      // Khi bắt đầu quá trình xóa (pending)
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      // Khi xóa thành công (fulfilled)
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoading = false;

        // Kiểm tra và lọc `listCart.DT` để xóa các mục đã chọn
        if (state.listCart && Array.isArray(state.listCart.DT)) {
          state.listCart.DT = state.listCart.DT.filter(
            (item) =>
              !Array.isArray(action.payload) ||
              !action.payload.includes(item.id)
          );
        } else {
          console.warn("listCart.DT không phải là mảng hoặc không tồn tại");
        }
      })

      // Khi xóa thất bại (rejected)
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || action.error.message || "Failed to remove items";
      });
  },
});

export default cartSlice.reducer;
