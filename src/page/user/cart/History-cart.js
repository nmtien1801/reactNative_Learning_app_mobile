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
import { fetchOrdersByUserId } from "../../../redux/orderSlide";
import { submitCourseReview } from "../../../redux/reviewSlice";
import { ArrowLeft, Search, Star } from "lucide-react-native";
import { useToast } from "../../../component/customToast";

// Star Rating Component
const StarRating = ({ rating, onPress }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <View style={styles.starContainer}>
      {stars.map((index) => (
        <TouchableOpacity key={index} onPress={() => onPress(index)}>
          <Star
            size={20}
            color={index <= rating ? "#FFD700" : "#E0E0E0"}
            fill={index <= rating ? "#FFD700" : "transparent"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Course Item Component
const CourseItem = ({ order }) => {
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(
    order?.OrderDetails?.[0]?.Course?.averageRating || 0
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const course = order?.OrderDetails?.[0]?.Course;
  if (!course) return <Text style={styles.errorText}>Không có khóa học.</Text>;

  const handleStarPress = async (value) => {
    try {
      const result = await dispatch(
        submitCourseReview({
          courseID: order.OrderDetails[0]?.courseID,
          rating: value,
          userID: user._id,
        })
      );
      if (result.meta.requestStatus === "fulfilled") {
        setRating(value);
        toast("Đánh giá thành công!");
      } else {
        toast("Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } catch (error) {
      toast("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setIsModalVisible(false);
    }
  };

  return (
    <View style={styles.courseItem}>
      <Text style={styles.courseTitle}>{course?.name}</Text>
      <Text style={styles.courseInstructor}>
        {course?.UserFollow?.[0]?.user?.userName}
      </Text>
      <Image
        source={{
          uri: course?.image
            ? `data:image/png;base64,${course.image}`
            : "https://v0.dev/placeholder.svg?height=200&width=200",
        }}
        style={styles.courseImage}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.priceLabel}>Thành tiền:</Text>
        <Text style={styles.price}>${order?.total}</Text>
        <TouchableOpacity
          style={styles.ratingButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.ratingButtonText}>Đánh giá</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
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

// Main HistoryCart Component
const HistoryCart = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const { orders, loading, error } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersByUserId(user._id));
  }, [dispatch, user._id]);

  if (loading) return <Text style={styles.loadingText}>Đang tải...</Text>;
  if (error) return <Text style={styles.errorText}>Lỗi: {error}</Text>;
  if (!orders || orders.length === 0)
    return <Text style={styles.errorText}>Không có đơn hàng nào!</Text>;

  return (
    <SafeAreaView style={styles.container}>
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
      <FlatList
        data={orders || []}
        renderItem={({ item }) => <CourseItem order={item} />}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default HistoryCart;
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
    resizeMode: "contain",
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
