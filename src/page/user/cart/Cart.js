import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartByUser,
  addCart,
  removeFromCart,
  clearCart,
} from "../../../redux/cartSlice";
import {
  addToCart,
  removeFromCart as removeCourseFromCart,
} from "../../../redux/courseSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { listCart, isLoading, isError, errorMessage } = useSelector(
    (state) => state.cart
  );
  const { listCourse } = useSelector((state) => state.course);

  const userID = 1; // Giả sử bạn đã có userID (có thể lấy từ state hoặc props)

  useEffect(() => {
    dispatch(getCartByUser(userID)); // Lấy giỏ hàng của người dùng
  }, [dispatch, userID]);

  const handleAddToCart = (course) => {
    dispatch(addToCart(course));
    dispatch(addCart(course)); // Thêm vào giỏ hàng API
  };

  const handleRemoveFromCart = (course) => {
    dispatch(removeCourseFromCart(course));
    dispatch(removeFromCart(course)); // Xóa khỏi giỏ hàng API
  };

  const handleClearCart = () => {
    dispatch(clearCart()); // Xóa tất cả khóa học trong giỏ
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error: {errorMessage}</Text>;
  }

  // Kiểm tra  data không
  if (!listCart) {
    return <Text>No data</Text>;
  } else {
    console.log("listCart", listCart);
  }

  // Đảm bảo listCart là mảng trước khi sử dụng .map()
  const cartItems = Array.isArray(listCart) ? listCart : [];

  // Destructure dữ liệu

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty!</Text>
      ) : (
        <View>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ marginVertical: 10 }}>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>

                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: "#ff6347",
                    borderRadius: 5,
                    marginTop: 5,
                  }}
                  onPress={() => handleRemoveFromCart(item)}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Remove from Cart
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#ff6347",
              borderRadius: 5,
              marginTop: 20,
            }}
            onPress={handleClearCart}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Clear Cart
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={{ fontSize: 20, marginTop: 30 }}>Available Courses</Text>
      {listCourse.length === 0 ? (
        <Text>No courses available!</Text>
      ) : (
        <FlatList
          data={listCourse}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              {/* TouchableOpacity thay cho Button */}
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#32CD32",
                  borderRadius: 5,
                  marginTop: 5,
                }}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  courseCard: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  courseDetails: {
    flex: 1,
    marginLeft: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6366f1",
    marginBottom: 4,
  },
  courseLessons: {
    fontSize: 14,
    color: "#6b7280",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f3f4f6",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "600",
  },
  checkoutButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#f44336", // Red for delete
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
