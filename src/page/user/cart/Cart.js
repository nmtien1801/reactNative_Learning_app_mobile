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
} from "../../../redux/courseSlice"; // Import actions from redux

export default function Cart({ navigation, route }) {
  // Get cart courses and course details from Redux state
  const cartCourses = useSelector((state) => state.course.listCart);
  const courseDetail = useSelector((state) => state.course.courseDetail);
  const dispatch = useDispatch();

  // Extract courseID from route params if available
  const courseID = route.params; // Make sure `courseID` is passed properly

  // Fetch course details when courseID is provided
  useEffect(() => {
    if (courseID) {
      console.log("Fetching course details for ID:", courseID);
      dispatch(findCourseByID(courseID)); // Dispatch action to fetch course details by ID
    }
  }, [courseID, dispatch]);

  // Add the fetched course to the cart if available
  useEffect(() => {
    if (courseDetail && courseDetail.id) {
      // Add course to cart only if it's not already in the cart
      const existingCourse = cartCourses.find(
        (course) => course.id === courseDetail.id
      );
      if (!existingCourse) {
        dispatch(addToCart(courseDetail)); // Dispatch action to add course to cart
      }
    }
  }, [courseDetail, cartCourses, dispatch]);

  // Handle removing course from the cart
  const toggleSelection = (id) => {
    dispatch(removeFromCart({ id })); // Dispatch action to remove course by ID
  };

  // Calculate the total price of the courses in the cart
  const total = cartCourses.reduce(
    (sum, course) => sum + (course.price || 0), // Sum up all the course prices
    0
  );

  // Course Item component to render each course in the cart
  const CourseItem = ({ course }) => (
    <View style={styles.courseCard}>
      {/* You can display the course image if available */}
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
        status={course.selected ? "checked" : "unchecked"} // Checkbox to toggle selection
        onPress={() => toggleSelection(course.id)} // Toggle selection when clicked
      />
    </View>
  );

  // Render cart page
  return (
    <SafeAreaView style={styles.container}>
      {/* If courseDetail exists and is not empty, render the cart list */}
      {cartCourses.length > 0 ? (
        <FlatList
          data={cartCourses} // Use the cartCourses state for the list
          keyExtractor={(item) => item.id.toString()} // Use the course ID as the key
          renderItem={({ item }) => <CourseItem course={item} />} // Render each course item
        />
      ) : (
        <Text>Loading course details...</Text> // Show loading text if courseDetail is not available
      )}

      {/* Footer displaying total price and checkout button */}
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ${total}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate("Checkout")} // Navigate to checkout screen
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
});
