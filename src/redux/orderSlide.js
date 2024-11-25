import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { buyCourseService } from "../service/userService"; // Đảm bảo buyCourseService đã được định nghĩa
import { deleteCart } from "./cartSlice";

// Mua khóa học
export const buyCourse = createAsyncThunk(
  "orders/buyCourses",
  async ({ courseIDs, userID }, { dispatch, rejectWithValue }) => {
    try {
      const response = await buyCourseService(courseIDs, userID);
      console.log("response", response);

      if (response?.data?.DT) {
        // Xóa các khóa học đã mua khỏi giỏ hàng
        await dispatch(deleteCart(courseIDs))
          .unwrap()
          .catch(() => {
            console.warn("Failed to remove courses from cart.");
          });

        return response.data.DT; // Trả về dữ liệu đơn hàng
      }

      throw new Error("Invalid response data from API.");
    } catch (error) {
      console.error("Failed to buy courses:", error.message);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to buy courses."
      );
    }
  }
);

// Slice quản lý đơn hàng
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], // Danh sách đơn hàng
    loading: false, // Trạng thái tải
    error: null, // Thông báo lỗi
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = []; // Xóa danh sách đơn hàng
      state.error = null; // Xóa thông báo lỗi
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buyCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = [...state.orders, ...action.payload]; // Thêm đơn hàng mới
      })
      .addCase(buyCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to buy courses.";
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
