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

export default function TeacherCourses({ navigation, route }) {
  const dispatch = useDispatch();
  const { TeacherCourses, isLoading, isError } = useSelector(
    (state) => state.teacher
  );
  const user = useSelector((state) => state.auth.user);
  
  const toast = useToast();
  const teacherID = route.params.params?.teacherID ?? user._id; // ID của giáo viên
  // const teacherID = 1; // ID của giáo viên

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    dispatch(fetchTeacherCourses(teacherID));
  }, [dispatch, teacherID]);

  // Trạng thái loading
  if (isLoading) {
    return (
      <Layout navigation={navigation} route={route}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Layout>
    );
  }

  // Trạng thái lỗi
  if (isError) {
    toast("Failed to load teacher data", "error");
    return (
      <Layout navigation={navigation} route={route}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load data</Text>
        </View>
      </Layout>
    );
  }

  // Kiểm tra dữ liệu TeacherCourses.DT
  if (!TeacherCourses || !TeacherCourses.DT) {
    return (
      <Layout navigation={navigation} route={route}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No data available</Text>
        </View>
      </Layout>
    );
  }

  // Destructure dữ liệu từ TeacherCourses.DT
  const courses = TeacherCourses.DT;

  // Nhóm các khóa học theo Category
  const groupedByCategory = courses.reduce((acc, course) => {
    const categoryName = course.Category.name;

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(course);

    return acc;
  }, {});

  // Render khóa học
  const renderCourseItem = ({ item }) => {
    const { name, title, image } = item;
    const courseImage =
      image && image.data && image.data.length > 0
        ? { uri: image }
        : require("../../../img/Login_Register/Login.jpg"); // Hình ảnh mặc định

    return (
      <View style={styles.courseCard}>
        <Image source={courseImage} style={styles.courseImage} />
        <View style={styles.courseInfo}>
          <Text style={styles.courseName}>{name}</Text>
          <Text style={styles.courseTitle}>{title}</Text>
        </View>
      </View>
    );
  };

  // Render các khóa học theo thể loại
  const renderCategoryItem = ({ item }) => {
    const { name: categoryName } = item;
    const categoryCourses = groupedByCategory[categoryName];

    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{categoryName}</Text>
        <FlatList
          data={categoryCourses}
          renderItem={renderCourseItem}
          keyExtractor={(course) => course.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.coursesContainer}
        />
      </View>
    );
  };

  const categoryNames = Object.keys(groupedByCategory);

  return (
    <Layout navigation={navigation} route={route}>
      {categoryNames.map((categoryName) => {
        return (
          <View key={categoryName}>
            <FlatList
              data={[{ name: categoryName }]}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.name}
            />
          </View>
        );
      })}
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
  categoryContainer: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  courseCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    width: 300,
    height: 150,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  courseInfo: {
    marginTop: 8,
  },
  courseName: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  courseTitle: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
});
