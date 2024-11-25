import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUserId } from "../../../redux/orderSlide";
import { ArrowLeft, Search, Star } from "lucide-react-native";

// Thành phần hiển thị sao đánh giá
const StarRating = ({ rating }) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          size={20}
          color={index <= rating ? "#FFD700" : "#E0E0E0"}
          fill={index <= rating ? "#FFD700" : "transparent"}
        />
      ))}
    </View>
  );
};

// Thành phần hiển thị thông tin đơn hàng
const CourseItem = ({ course }) => (
  <View style={styles.courseItem}>
    <Image source={{ uri: course.image }} style={styles.courseImage} />
    <View style={styles.courseInfo}>
      <View style={styles.titleContainer}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.instructorName}>{course.instructor}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Thành tiền:</Text>
          <Text style={styles.price}>${course.price}</Text>
        </View>
        <View style={styles.ratingRow}>
          <StarRating rating={course.rating} />
        </View>
      </View>
    </View>
  </View>
);

export default function HistoryCart({ navigation }) {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders); // Lấy trạng thái từ Redux
  const userId = 1; // ID người dùng (có thể được truyền từ màn hình khác hoặc lấy từ Redux)

  // Lấy dữ liệu đơn hàng khi component được mount
  useEffect(() => {
    dispatch(fetchOrdersByUserId(userId));
  }, [dispatch, userId]);
  console.log("order", orders);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Đơn đã mua</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Nội dung */}
      {loading ? (
        <Text style={styles.loadingText}>Đang tải...</Text>
      ) : error ? (
        <Text style={styles.errorText}>Lỗi: {error}</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item }) => <CourseItem course={item.courses} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  searchButton: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
  },
  courseItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  courseInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  titleContainer: {
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  instructorName: {
    fontSize: 14,
    color: "#666",
  },
  detailsContainer: {
    justifyContent: "space-between",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    marginRight: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF0000",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "red",
  },
});
