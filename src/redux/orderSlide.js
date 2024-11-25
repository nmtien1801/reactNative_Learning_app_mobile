import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrdersByUserId } from "../service/userService";

// Tạo async thunk để lấy đơn hàng
export const fetchOrdersByUserId = createAsyncThunk(
  "orders/getOrdersByUserId",
  async (userID) => {
    const response = await getOrdersByUserId(userID);
    return response.data; // Trả về dữ liệu nhận được
  }
);

// Tạo slice cho quản lý đơn hàng
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

// Xuất các actions và reducer
export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
