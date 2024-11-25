import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUserId } from "../../../redux/orderSlide"; // Lấy đơn hàng của người dùng
import { submitCourseReview } from "../../../redux/reviewSlice"; // Action gửi review
import { ArrowLeft, Search, Star } from "lucide-react-native"; // Các icon
import { useToast } from "../../../component/customToast"; // Thông báo Toast

const StarRating = ({ rating, onPress }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((index) => {
        if (index <= fullStars) {
          return (
            <TouchableOpacity key={index} onPress={() => onPress(index)}>
              <Star size={20} color="#FFD700" fill="#FFD700" />
            </TouchableOpacity>
          );
        } else if (index === fullStars + 1 && hasHalfStar) {
          return (
            <TouchableOpacity key={index} onPress={() => onPress(index)}>
              <Star
                size={20}
                color="#FFD700"
                fill="transparent"
                stroke="#FFD700"
                strokeWidth={2}
              />
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity key={index} onPress={() => onPress(index)}>
              <Star size={20} color="#E0E0E0" fill="transparent" />
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

const CourseItem = ({ order }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(
    order.OrderDetails[0].Course.averageRating || 0
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const course = order.OrderDetails[0].Course;

  const handleStarPress = async (value) => {
    try {
      const result = await dispatch(
        submitCourseReview({
          courseID: order.OrderDetails[0].courseID,
          rating: value,
          userID: 1, // ID người dùng (có thể lấy từ Redux hoặc props)
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        setRating(value); // Cập nhật giao diện ngay lập tức
        toast("Đánh giá thành công!");
      } else {
        console.error("Lỗi khi gửi đánh giá:", result.error);
        toast("Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      toast("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setIsModalVisible(false);
    }
  };

  return (
    <View style={styles.courseItem}>
      <Text style={styles.courseTitle}>{course.name}</Text>
      <Text style={styles.courseInstructor}>
        {course.UserFollow[0]?.user.userName}
      </Text>
      {course.image && (
        <Image
          source={{
            uri:
              course.image ||
              "https://v0.dev/placeholder.svg?height=200&width=200",
          }}
          style={styles.courseImage}
        />
      )}

      <View style={styles.detailsContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Thành tiền:</Text>
          <Text style={styles.price}>${order.total}</Text>
        </View>

        <View style={styles.ratingRow}>
          {/* <StarRating rating={rating} onPress={handleStarPress} /> */}
          <TouchableOpacity
            style={styles.ratingButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.ratingButtonText}>Đánh giá</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn sao đánh giá</Text>
            <StarRating rating={rating} onPress={handleStarPress} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Main component HistoryCart
export default function HistoryCart({ navigation }) {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const userId = 1; // ID người dùng (có thể lấy từ Redux hoặc props)

  // Lấy dữ liệu đơn hàng khi component được mount
  useEffect(() => {
    dispatch(fetchOrdersByUserId(userId));
  }, [dispatch, userId]);

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

// Styles cho các thành phần
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
  ratingButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#FF6347", // Màu đỏ
    borderRadius: 5,
  },
  ratingButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#FF6347",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
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
