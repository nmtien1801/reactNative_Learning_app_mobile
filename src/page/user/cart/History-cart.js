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
  const fullStars = Math.floor(rating); // Lấy số sao đầy đủ
  const hasHalfStar = rating % 1 !== 0; // Kiểm tra xem có sao phân nửa không

  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((index) => {
        if (index <= fullStars) {
          return (
            <Star
              key={index}
              size={20}
              color="#FFD700" // Màu vàng cho sao đầy đủ
              fill="#FFD700"
            />
          );
        } else if (index === fullStars + 1 && hasHalfStar) {
          return (
            <Star
              key={index}
              size={20}
              color="#FFD700" // Màu vàng cho sao nửa
              fill="transparent"
              stroke="#FFD700"
              strokeWidth={2}
            />
          );
        } else {
          return (
            <Star
              key={index}
              size={20}
              color="#E0E0E0" // Màu xám cho sao trống
              fill="transparent"
            />
          );
        }
      })}
    </View>
  );
};

// Thành phần hiển thị thông tin đơn hàng
const CourseItem = ({ order }) => {
  const course = order.OrderDetails[0].Course;
  const rating = course.averageRating || 1; // Nếu averageRating là undefined, sử dụng giá trị mặc định là 0
  console.log(rating);

  return (
    <View style={styles.courseItem}>
      {/* Hiển thị tên khóa học */}
      <Text style={styles.courseTitle}>{course.name}</Text>

      {/* Hiển thị tên giảng viên (hoặc người tạo khóa học) */}
      <Text style={styles.courseInstructor}>
        {course.UserFollow[0]?.user.userName}
      </Text>

      {/* Nếu có hình ảnh khóa học */}
      {course.image && (
        <Image
          source={
            /* placeholder image hoặc URL hình ảnh thật */ {
              uri: "https://v0.dev/placeholder.svg?height=200&width=200",
            }
          }
          style={styles.courseImage}
        />
      )}

      <View style={styles.detailsContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Thành tiền:</Text>
          <Text style={styles.price}>${order.total}</Text>
        </View>

        {/* Hiển thị sao đánh giá */}
        <View style={styles.ratingRow}>
          <StarRating rating={4.5} />
          {/* <Text style={styles.price}>${averageRating}</Text> */}
        </View>
      </View>
    </View>
  );
};

export default function HistoryCart({ navigation }) {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders); // Lấy trạng thái từ Redux
  const userId = 1; // ID người dùng (có thể được truyền từ màn hình khác hoặc lấy từ Redux)

  // Lấy dữ liệu đơn hàng khi component được mount
  useEffect(() => {
    dispatch(fetchOrdersByUserId(userId));
  }, [dispatch, userId]);
  console.log(orders);

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
          renderItem={({ item }) => <CourseItem order={item} />} // Render thông tin đơn hàng
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
    flexDirection: "column",
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
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
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
