import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { buyCourseService, getOrdersByUserId } from "../service/userService";

// // Mua khóa học
// export const buyCourse = createAsyncThunk(
//   "orders/buyCourses",
//   async ({ courseIDs, userID }, { rejectWithValue }) => {
//     try {
//       const response = await buyCourseService(courseIDs, userID);
//       if (response?.DT) {
//         // Trả về dữ liệu đơn hàng khi mua thành công
//         return response.DT;
//       }
//       throw new Error("Invalid response data from API.");
//     } catch (error) {
//       console.error("Failed to buy courses:", error.message);
//       return rejectWithValue(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to buy courses."
//       );
//     }
//   }
// );

export const buyCourse = createAsyncThunk(
  "orders/buyCourses",
  async ({ courseIDs, userID }, { rejectWithValue }) => {
    try {
      const response = await buyCourseService(courseIDs, userID);

      if (response?.DT?.orderDetails) {
        // Trả về thông tin orderDetails, vì đó là mảng các khóa học đã mua
        return response.DT.orderDetails;
      }

      // Nếu không có orderDetails, ném lỗi
      throw new Error("Invalid response data: Missing orderDetails.");
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
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.error = null;
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
        // Lưu các đơn hàng vào state khi mua thành công
        state.orders = [...state.orders, ...action.payload];
      })
      .addCase(buyCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to buy courses.";
      });

    builder
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.DT || [];
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders.";
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
