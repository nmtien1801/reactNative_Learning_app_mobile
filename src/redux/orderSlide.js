import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { buyCourseService, getOrdersByUserId } from "../service/userService"; // Đảm bảo buyCourseService đã được định nghĩa
import { deleteCart } from "./cartSlice";

// Mua khóa học
export const buyCourses = createAsyncThunk(
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

export const fetchOrdersByUserId = createAsyncThunk(
  "orders/getOrdersByUserId",
  async (userID) => {
    const response = await getOrdersByUserId(userID);
    return response.data; // Trả về dữ liệu nhận được
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

    builder
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true; // Bắt đầu tải
        state.error = null; // Reset lỗi
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false; // Kết thúc tải
        if (action.payload && action.payload.DT) {
          state.orders = action.payload.DT; // Lưu danh sách đơn hàng
        } else {
          state.orders = [];
          state.error = "Dữ liệu không hợp lệ từ API.";
        }
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false; // Kết thúc tải
        state.error = action.error.message || "Không thể tải dữ liệu từ API.";
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
