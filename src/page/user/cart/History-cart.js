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
import { fetchOrdersByUserId } from "../../../redux/orderSlide"; // Fetch orders of the user
import { submitCourseReview } from "../../../redux/reviewSlice"; // Action to submit review
import { ArrowLeft, Search, Star } from "lucide-react-native"; // Icons
import { useToast } from "../../../component/customToast"; // Toast notifications

// Star Rating Component
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

// Course Item Component
// Course Item Component
const CourseItem = ({ order }) => {
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(
    order.OrderDetails[0]?.Course?.averageRating || 0
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const course = order.OrderDetails[0]?.Course;

  const handleStarPress = async (value) => {
    try {
      const result = await dispatch(
        submitCourseReview({
          courseID: order.OrderDetails[0]?.courseID,
          rating: value,
          userID: user._id,
        })
      );
      console.log("====================================");
      console.log("userID", order.userID);

      console.log("courseID", order.OrderDetails[0]?.courseID);

      if (result.meta.requestStatus === "fulfilled") {
        setRating(value); // Update UI immediately
        toast("Đánh giá thành công!");
      } else {
        toast("Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } catch (error) {
      toast("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setIsModalVisible(false); // Close the modal after submitting review
    }
  };

  if (!course) {
    return <Text style={styles.errorText}>=====.</Text>;
  }

  if (!course) {
    return <Text style={styles.errorText}>=====.</Text>;
  }

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
          <TouchableOpacity
            style={styles.ratingButton}
            onPress={() => setIsModalVisible(true)} // Open the modal for review
          >
            <Text style={styles.ratingButtonText}>Đánh giá</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for Rating */}
      {/* Modal for Rating */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)} // Close modal when requested
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn sao đánh giá</Text>
            <StarRating rating={rating} onPress={handleStarPress} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)} // Close modal
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Main HistoryCart Component
export default function HistoryCart({ navigation }) {
  const user = useSelector((state) => state.auth.user); // Lấy thông tin user
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const userId = user._id;

  useEffect(() => {
    dispatch(fetchOrdersByUserId(userId)); // Fetch orders when component mounts
  }, [dispatch, userId]);

  if (loading) {
    return <Text style={styles.loadingText}>Đang tải...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Lỗi: {error}</Text>;
  }

  if (!orders || orders.length === 0) {
    return <Text style={styles.errorText}>Không có đơn hàng nào!</Text>;
  }

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

      {/* Content */}
      <FlatList
        data={orders}
        renderItem={({ item }) => <CourseItem order={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// Styles

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
    flexDirection: "row",
    flexDirection: "row",
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
    backgroundColor: "#FF6347",
    backgroundColor: "#FF6347",
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
    borderRadius: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 250,
    width: 250,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 15,
    marginTop: 15,
    backgroundColor: "#FF6347",
    paddingVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    fontSize: 16,
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "#FF0000",
    fontSize: 16,
    color: "#FF0000",
    marginTop: 20,
  },
  starContainer: {
    flexDirection: "row",
  },
  starContainer: {
    flexDirection: "row",
  },
});
