import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../component/TeacherProfile/Layout_Teacher";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherCourses } from "../../redux/teacherSlide";
import { useToast } from "../../component/customToast";

export default function TeacherCourses() {
  const dispatch = useDispatch();
  const { TeacherCourses, isLoading, isError } = useSelector(
    (state) => state.teacher
  );
  const { showToast } = useToast();
  const teacherID = 1; // ID của giáo viên

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    dispatch(fetchTeacherCourses(teacherID));
  }, [dispatch, teacherID]);

  // Trạng thái loading
  if (isLoading) {
    return (
      <Layout>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Layout>
    );
  }

  // Trạng thái lỗi
  if (isError) {
    showToast("Failed to load teacher data");
    return (
      <Layout>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load data</Text>
        </View>
      </Layout>
    );
  }

  // Không có dữ liệu
  if (!TeacherCourses || TeacherCourses.length === 0) {
    return (
      <Layout>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No courses available</Text>
        </View>
      </Layout>
    );
  } else {
    console.log("TeacherCourses", TeacherCourses);
  }

  // const categories = [
  //   {
  //     id: "1",
  //     title: "UI/UX Design",
  //     courses: [
  //       {
  //         id: "1-1",
  //         title: "PHP in One Click",
  //         price: "$59",
  //         rating: 4.5,
  //         reviews: 1233,
  //         lessons: 18,
  //       },
  //       {
  //         id: "1-2",
  //         title: "Web Design",
  //         price: "$39",
  //         rating: 4.5,
  //         reviews: 1233,
  //         lessons: 18,
  //       },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     title: "Graphic Design",
  //     courses: [
  //       {
  //         id: "2-1",
  //         title: "Adobe Photoshop Advanced",
  //         price: "$45",
  //         rating: 4.7,
  //         reviews: 5231,
  //         lessons: 15,
  //       },
  //       {
  //         id: "2-2",
  //         title: "Illustrator Masterclass",
  //         price: "$50",
  //         rating: 4.8,
  //         reviews: 4276,
  //         lessons: 20,
  //       },
  //     ],
  //   },
  // ];
  // Destructure dữ liệu giáo viên và cung cấp giá trị mặc định tương tự như const categories

  const renderCourseItem = ({ item }) => (
    <View style={styles.courseCard}>
      <Image
        source={require("../../../img/Login_Register/Login.jpg")}
        style={styles.courseImage}
      />
      <View style={styles.courseInfo}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        <Text style={styles.coursePrice}>{item.price}</Text>
        <View style={styles.courseStats}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>
            {item.rating} ({item.reviews})
          </Text>
          <Text style={styles.studentsText}>• {item.lessons} lessons</Text>
        </View>
      </View>
    </View>
  );

  return (
    <Layout>
      <FlatList
        data={TeacherCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.coursesContainer}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  coursesContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#FF5A5F",
  },
  courseCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    flexDirection: "row",
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
  },
  courseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A90E2",
    marginTop: 8,
  },
  courseStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  studentsText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
});
