import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  findCourseByID,
  addToCart,
} from "../../../redux/courseSlice";

export default function Cart({ navigation, route }) {
  const cartCourses = useSelector((state) => state.course.listCart);
  const courseDetail = useSelector((state) => state.course.courseDetail);
  const dispatch = useDispatch();

  const [selectedCourses, setSelectedCourses] = useState([]);

  // Lấy courseID từ route nếu có
  const courseID = route.params;

  useEffect(() => {
    if (courseID) {
      dispatch(findCourseByID(courseID));
    }
  }, [courseID, dispatch]);

  useEffect(() => {
    if (courseDetail && courseDetail.id) {
      const existingCourse = cartCourses.find(
        (course) => course.id === courseDetail.id
      );
      if (!existingCourse) {
        dispatch(addToCart(courseDetail));
      }
    }
  }, [courseDetail, cartCourses, dispatch]);

  const toggleSelection = (id) => {
    setSelectedCourses((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((courseId) => courseId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const deleteSelectedCourses = () => {
    selectedCourses.forEach((id) => {
      dispatch(removeFromCart({ id }));
    });
    setSelectedCourses([]);
  };

  const total = cartCourses.reduce(
    (sum, course) => sum + (course.price || 0),
    0
  );

  const CourseItem = ({ course }) => (
    <View style={styles.courseCard}>
      {course.image && (
        <Image source={{ uri: course.image }} style={styles.courseImage} />
      )}
      <View style={styles.courseDetails}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseInstructor}>{course.instructor}</Text>
        <Text style={styles.coursePrice}>${course.price}</Text>
        <Text style={styles.courseLessons}>{course.lessons} lessons</Text>
      </View>
      <Checkbox
        status={selectedCourses.includes(course.id) ? "checked" : "unchecked"}
        onPress={() => toggleSelection(course.id)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {cartCourses.length > 0 ? (
        <FlatList
          data={cartCourses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CourseItem course={item} />}
        />
      ) : (
        <Text>No courses in cart.</Text>
      )}

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ${total}</Text>

        <TouchableOpacity
          style={[
            styles.deleteButton,
            { opacity: selectedCourses.length > 0 ? 1 : 0.5 },
          ]}
          onPress={deleteSelectedCourses}
          disabled={selectedCourses.length === 0}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate("homeUser")}
        >
          <Text style={styles.checkoutText}>Proceed to checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  courseCard: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  courseDetails: {
    flex: 1,
    marginLeft: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6366f1",
    marginBottom: 4,
  },
  courseLessons: {
    fontSize: 14,
    color: "#6b7280",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f3f4f6",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "600",
  },
  checkoutButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#f44336", // Red for delete
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
