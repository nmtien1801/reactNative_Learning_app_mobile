import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
  CheckBox,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCartByUser, deleteCart } from "../../../redux/cartSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Lấy dữ liệu giỏ hàng từ Redux
  const { listCart, isLoading, isError, errorMessage } = useSelector(
    (state) => state.cart
  );

  const [selectedItems, setSelectedItems] = useState([]); // Dùng để lưu các courseID được chọn

  const userID = 1; // User cụ thể (tùy chỉnh nếu cần)

  // Lấy danh sách giỏ hàng khi trang được tải
  useEffect(() => {
    dispatch(getCartByUser(userID));
  }, [dispatch, userID]);

  // Xử lý chọn/deselect một khóa học
  const handleSelectItem = (courseID) => {
    if (selectedItems.includes(courseID)) {
      setSelectedItems(selectedItems.filter((id) => id !== courseID));
    } else {
      setSelectedItems([...selectedItems, courseID]);
    }
  };

  // Xóa các khóa học được chọn khỏi giỏ hàng
  const handleRemoveSelected = () => {
    if (selectedItems.length > 0) {
      dispatch(deleteCart(selectedItems)) // Gọi action xóa với danh sách courseID
        .then(() => {
          setSelectedItems([]); // Xóa lựa chọn sau khi xóa thành công
          dispatch(getCartByUser(userID)); // Tải lại danh sách giỏ hàng
        })
        .catch((error) => {
          alert("Failed to remove selected courses: " + error.message);
        });
    } else {
      alert("No courses selected for removal.");
    }
  };

  // Hiển thị trạng thái tải dữ liệu
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Hiển thị lỗi nếu có
  if (isError) {
    return <Text style={styles.errorMessage}>Error: {errorMessage}</Text>;
  }

  const cartItems = listCart?.DT || []; // Danh sách các khóa học trong giỏ hàng
  if (cartItems.length === 0) {
    return <Text style={styles.emptyCart}>Your cart is empty!</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Hiển thị danh sách các khóa học */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) =>
          item.courseID ? item.courseID.toString() : item.id.toString()
        } // Kiểm tra courseID và fallback sang id
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <CheckBox
              value={selectedItems.includes(item.courseID || item.id)} // Kiểm tra xem item.courseID hay item.id có tồn tại không
              onValueChange={() => handleSelectItem(item.courseID || item.id)} // Xử lý lựa chọn khóa học
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("courseDetailOverView", {
                  courseId: item.courseId,
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.courseImage} />
            </TouchableOpacity>
            <View style={styles.courseDetails}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("courseDetailOverView", {
                    courseId: item.courseId,
                  })
                }
              >
                <Text style={styles.courseName}>{item.name}</Text>
              </TouchableOpacity>
              <Text style={styles.instructorName}>{item.userName}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{item.averageRating}</Text>
                <Text style={styles.reviews}>({item.totalRating} reviews)</Text>
              </View>
              <Text style={styles.lessons}>{item.totalLessons} lessons</Text>
            </View>
          </View>
        )}
      />

      {/* Nút xóa các khóa học đã chọn */}
      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleRemoveSelected}
      >
        <Text style={styles.buttonText}>Remove Selected</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  courseItem: {
    marginVertical: 10,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 15,
  },
  courseDetails: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: "600",
  },
  instructorName: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: "#FFD700",
    marginLeft: 5,
  },
  reviews: {
    fontSize: 12,
    color: "#777",
  },
  lessons: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
  emptyCart: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  errorMessage: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  clearButton: {
    padding: 10,
    backgroundColor: "#ff6347",
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
