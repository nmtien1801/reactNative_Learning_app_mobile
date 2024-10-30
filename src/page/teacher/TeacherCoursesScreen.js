import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header_Teacher from "../../component/TeacherProfile/Header_Teacher";
import Nav_Teacher from "../../component/TeacherProfile/Nav_Teacher";
import Footer from "../../component/index";

const categories = [
  {
    id: "1",
    title: "UI/UX Design",
    courses: [
      {
        id: "1-1",
        title: "PHP in One Click",
        price: "$59",
        rating: 4.5,
        reviews: 1233,
        lessons: 18,
      },
      {
        id: "1-2",
        title: "Web Design",
        price: "$39",
        rating: 4.5,
        reviews: 1233,
        lessons: 18,
      },
    ],
  },
  {
    id: "2",
    title: "Graphic Design",
    courses: [
      {
        id: "2-1",
        title: "Adobe Photoshop Advanced",
        price: "$45",
        rating: 4.7,
        reviews: 5231,
        lessons: 15,
      },
      {
        id: "2-2",
        title: "Illustrator Masterclass",
        price: "$50",
        rating: 4.8,
        reviews: 4276,
        lessons: 20,
      },
    ],
  },
];

export default function TeacherCoursesScreen() {
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

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={item.courses}
        renderItem={renderCourseItem}
        keyExtractor={(course) => course.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header_Teacher />
        <Nav_Teacher />

        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.coursesContainer}
        />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  coursesContainer: {
    padding: 16,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllText: {
    color: "#4A90E2",
    fontSize: 14,
  },
  courseCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
});
