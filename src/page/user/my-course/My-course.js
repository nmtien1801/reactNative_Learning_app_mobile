import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  StyleSheet,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { findCourseByState } from "../../../redux/courseSlice";
import Footer from "../../../component/Footer";

export default function MyCourse({ navigation, route }) {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "ON GOING", "COMPLETED"];
  const dispatch = useDispatch();
  const { listCourse, isLoading, isError } = useSelector(
    (state) => state.course
  ); // Getting courses by state from Redux

  useEffect(() => {
    if (activeTab === "ON GOING") {
      dispatch(findCourseByState(2)); // Fetch ON GOING courses
    } else if (activeTab === "COMPLETED") {
      dispatch(findCourseByState(1)); // Fetch COMPLETED courses
    } else {
      dispatch(findCourseByState(0)); // Fetch all courses if "All" is selected
    }
  }, [activeTab, dispatch]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Error state
  if (isError) {
    console.log("error", isError);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load data</Text>
      </View>
    );
  }

  // No data state
  if (!listCourse || Object.keys(listCourse).length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  } else {
    console.log("listCourse", listCourse);
  }

  const CourseCard = ({ course }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => navigation.navigate("Lesson", {courseID: course.id})}
    >
      <Image source={{ uri: course.image }} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.description}>{course.description} description</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>PROJECT MANAGEMENT</Text>
            <Text style={styles.bannerDiscount}>20% OFF</Text>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>JOIN NOW</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: "https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg",
            }}
            style={styles.bannerImage}
          />
        </View>
      </View>

      <StatusBar barStyle="dark-content" />

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Course List */}
      <FlatList
        data={listCourse}
        renderItem={({ item }) => <CourseCard course={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.courseList}
      />

      <Footer navigation={navigation} route={route} showActive="book" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    justifyContent: "space-around",
  },
  tab: {
    marginRight: 24,
    paddingBottom: 8,
    alignItems: "center",
    flex: 1,
    paddingVertical: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#00BCD4",
  },
  tabText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#00BCD4",
    fontWeight: "bold",
  },
  courseList: {
    padding: 16,
  },
  courseCard: {
    flexDirection: "row",
    marginBottom: 16,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  courseInfo: {
    flex: 1,
    justifyContent: "center",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  bannerContainer: {
    padding: 16,
  },
  banner: {
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bannerDiscount: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: "#00BCD4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  joinButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  bannerImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  categoriesSection: {
    padding: 16,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewMoreCategories: {
    color: "#00BCD4",
    fontSize: 14,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
