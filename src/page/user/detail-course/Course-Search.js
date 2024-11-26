import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { findAllCourses, searchCourse } from "../../../redux/courseSlice"; // Import hành động searchCourse
import { Ionicons } from "@expo/vector-icons"; // Ensure this is imported for the icon
import Footer from "../../../component/footer/FooterUser";

// HotTopic Component
const HotTopic = ({ title, onPress }) => (
  <TouchableOpacity style={styles.hotTopic} onPress={onPress}>
    <Text style={styles.hotTopicText}>{title}</Text>
  </TouchableOpacity>
);

// Category Component
const Category = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.category} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#666" style={styles.categoryIcon} />
    <Text style={styles.categoryTitle}>{title}</Text>
    <Ionicons name="chevron-forward" size={24} color="#666" />
  </TouchableOpacity>
);

// CourseCard Component
const CourseCard = ({ course, navigation }) => (
  <TouchableOpacity
    style={[styles.courseCard, { width: 250 }]}
    onPress={() =>
      navigation.navigate("courseDetailOverView", { courseId: course.id })
    }
  >
    <Image
      source={{
        uri:
          course.image ||
          "https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg", // Fallback image if course image is not available
      }}
      style={styles.courseImage}
    />
    <View style={styles.courseContent}>
      <View style={styles.titleRow}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <TouchableOpacity>
          <Ionicons name="bookmark" size={24} color="#00BCD4" />
        </TouchableOpacity>
      </View>
      <Text style={styles.instructorName}>{course.instructor}</Text>
      <Text style={styles.price}>${course.price}</Text>
      <View style={styles.statsRow}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{course.rating}</Text>
          <Text style={styles.reviews}>({course.reviews})</Text>
        </View>
        <Text style={styles.lessons}>{course.lessons} lessons</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Main Component
export default function CourseSearch({ navigation, route }) {
  const dispatch = useDispatch();
  const {
    listCourse, // Correctly pulling course data from the Redux store
    isLoading,
    isError,
  } = useSelector((state) => state.course);

  const [courses, setCourses] = useState([]);
  const [keyword, setKeyword] = useState(""); // Để lưu từ khóa tìm kiếm

  // Fetch courses and update state
  useEffect(() => {
    dispatch(findAllCourses());
  }, [dispatch]);

  useEffect(() => {
    if (listCourse.length !== 0) {
      setCourses(
        listCourse.map((course) => ({
          id: course.id, // Ensure each course has a unique id
          title: course.name,
          instructor: course.UserFollow[0]?.user.userName, // Assuming structure
          price: course.Orders[0]?.OrderDetail?.price || "Free", // Fallback to 'Free' if no price
          rating: course.averageRating.toFixed(2) || "0.0", // Default to 0.0 if no rating
          reviews: course.totalRating || 0, // Default to 0 reviews if not available
          lessons: course.totalLessons || 0, // Default to 0 lessons if not available
          image: course.image,
        }))
      );
    }
  }, [listCourse]);

  // Tìm kiếm khóa học
  const handleSearch = () => {
    if (keyword.trim()) {
      dispatch(searchCourse(keyword)); // Gửi yêu cầu tìm kiếm
      navigation.navigate("courseListing", { keyword }); // Chuyển đến trang danh sách khóa học
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00BCD4" />
      </View>
    );
  }

  // Render error state
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error occurred while fetching courses
        </Text>
      </View>
    );
  }

  // Nếu không có khóa học nào
  if (!courses.length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No courses found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for courses"
            value={keyword}
            onChangeText={setKeyword}
            onSubmitEditing={handleSearch} // Gọi khi người dùng nhấn enter
          />

          <TouchableOpacity style={styles.filterButton} onPress={handleSearch}>
            <Text style={styles.filterButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Hot Topics */}
        <Text style={styles.sectionTitle}>Hot Topics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["Java", "Python", "SQL", "JavaScript", "Photoshop"].map(
            (topic, index) => (
              <HotTopic
                key={index}
                title={topic}
                onPress={() => {
                  setKeyword(topic); // Đặt từ khóa tìm kiếm
                  handleSearch(); // Gọi tìm kiếm
                }}
              />
            )
          )}
        </ScrollView>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        {[
          { id: 1, icon: "briefcase", title: "Business" },
          { id: 2, icon: "color-palette", title: "Design" },
          { id: 3, icon: "code-slash", title: "Coding" },
          { id: 4, icon: "film", title: "Movie" },
          { id: 5, icon: "language", title: "Language" },
        ].map((category, index) => (
          <Category
            key={index}
            icon={category.icon}
            title={category.title}
            onPress={() =>
              navigation.navigate("courseListing", { categoryID: category.id })
            } // Chuyển đến trang danh sách khóa học theo danh mục
          />
        ))}

        {/* Recommended Courses */}
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {courses.map((course) => (
            <CourseCard
              key={course.id} // Use the course id to ensure unique key
              course={course}
              navigation={navigation} // Pass navigation to CourseCard
            />
          ))}
        </ScrollView>
      </ScrollView>

      {/* Footer */}
      <Footer navigation={navigation} route={route} showActive="search" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: 20,
    position: "relative",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 10,
  },
  searchIcon: {
    position: "absolute",
    right: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
  hotTopic: {
    backgroundColor: "#E0F7FA",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  hotTopicText: {
    color: "#00BCD4",
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  categoryIcon: {
    marginRight: 15,
  },
  categoryTitle: {
    flex: 1,
    fontSize: 16,
  },
  courseCard: {
    marginRight: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  courseImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  courseContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  instructorName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00BCD4",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  reviews: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  lessons: {
    fontSize: 12,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: "#00BCD4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: "center",
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
