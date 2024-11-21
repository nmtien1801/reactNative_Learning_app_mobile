import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { findAllCourses } from "../../../redux/courseSlice"; // Đảm bảo sử dụng đúng action
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../../component/Footer";

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
const CourseCard = ({ title, instructor, price, rating, lessons }) => (
  <View style={styles.courseCard}>
    <Text style={styles.courseTitle}>{title}</Text>
    <Text style={styles.courseAuthor}>{instructor}</Text>
    <View style={styles.courseDetails}>
      <Text style={styles.coursePrice}>${price}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>{rating}</Text>
        <Text style={styles.lessonsText}>({lessons} lessons)</Text>
      </View>
    </View>
  </View>
);

// Main Component
export default function CourseSearch({ navigation, route }) {
  const dispatch = useDispatch();
  const {
    listCourse: courses, // Đảm bảo lấy đúng dữ liệu từ Redux store
    isLoading,
    isError,
  } = useSelector((state) => state.course); // Chỉnh sửa selector để truy cập đúng state

  useEffect(() => {
    dispatch(findAllCourses()); // Fetch courses when component mounts
  }, [dispatch]);

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

  // Không có dữ liệu
  if (!courses.length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No courses found</Text>
      </View>
    );
  } else {
    console.log("courses", courses);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for courses"
          />
        </View>

        {/* Hot Topics */}
        <Text style={styles.sectionTitle}>Hot Topics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["Java", "Python", "SQL", "JavaScript", "Photoshop"].map(
            (topic, index) => (
              <HotTopic
                key={index}
                title={topic}
                onPress={() => navigation.navigate("courseListing")}
              />
            )
          )}
        </ScrollView>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        {[
          { icon: "briefcase", title: "Business" },
          { icon: "color-palette", title: "Design" },
          { icon: "code-slash", title: "Coding" },
          { icon: "film", title: "Movie" },
          { icon: "language", title: "Language" },
        ].map((category, index) => (
          <Category
            key={index}
            icon={category.icon}
            title={category.title}
            onPress={() => navigation.navigate("courseListing")}
          />
        ))}

        {/* Recommended Courses */}
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.name}
              instructor={course.instructor || "Unknown"}
              price={course.price || "Free"}
              rating={course.rating || "0.0"}
              lessons={course.lessons || "0"}
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

  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  searchIcon: {
    position: "absolute",
    left: 25,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingLeft: 40,
    paddingRight: 10,
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: "#00BCD4",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
  hotTopicsContainer: {
    paddingLeft: 15,
    marginBottom: 20,
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
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
    marginBottom: 10,
  },
  viewMoreText: {
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
  recommendedContainer: {
    marginBottom: 20,
  },
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
    marginBottom: 10,
  },
  courseCard: {
    width: 250,
    marginLeft: 15,
    marginRight: 5,
  },
  courseImage: {
    width: "100%",
    height: 140,
    borderRadius: 8,
    marginBottom: 10,
  },
  bestSeller: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FFD700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bestSellerText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },
  discount: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF6347",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  courseAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  courseDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
  lessonsText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
});
