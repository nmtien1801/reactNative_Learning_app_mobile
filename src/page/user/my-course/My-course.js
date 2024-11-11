import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../../component/Footer";

const ProgressBar = ({ progress }) => (
  <View style={styles.progressContainer}>
    <View style={[styles.progressBar, { width: `${progress}%` }]} />
  </View>
);



export default function MyCourse({ navigation, route }) {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "ON GOING", "COMPLETED"];

  const courses = [
    {
      id: "1",
      title: "UX Foundation",
      duration: "2hrs 25 mins",
      progress: 30,
      image: "https://v0.dev/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      title: "Design Basics",
      duration: "3hrs 25 mins",
      progress: 70,
      image: "https://v0.dev/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      title: "Digital Sketching",
      duration: "4hrs 50 mins",
      progress: 100,
      image: "https://v0.dev/placeholder.svg?height=100&width=100",
    },
    {
      id: "4",
      title: "Digital Portrait",
      duration: "3hrs 25 mins",
      progress: 70,
      image: "https://v0.dev/placeholder.svg?height=100&width=100",
    },
    {
      id: "5",
      title: "Web Design",
      duration: "2hrs 25 mins",
      progress: 30,
      image: "https://v0.dev/placeholder.svg?height=100&width=100",
    },
  ];

  const CourseCard = ({ course }) => (
    <TouchableOpacity style={styles.courseCard} onPress={() => navigation.navigate("Lesson")}>
      <Image source={{ uri: course.image }} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.duration}>{course.duration}</Text>
        <View style={styles.progressSection}>
          <Text style={styles.progressText}>{course.progress}% Complete</Text>
          <ProgressBar progress={course.progress} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Promotional Banner */}
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
            uri: "https://v0.dev/placeholder.svg?height=200&width=200",
          }}
          style={styles.bannerImage}
        />
      </View>

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
        data={courses}
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
  banner: {
    backgroundColor: "#8B5CF6",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bannerDiscount: {
    color: "#fff",
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
    color: "#fff",
    fontWeight: "bold",
  },
  bannerImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
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
    fontWeight: 600,
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
  duration: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  progressSection: {
    flex: 1,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  progressContainer: {
    height: 4,
    backgroundColor: "#F0F0F0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#00BCD4",
  },
});
