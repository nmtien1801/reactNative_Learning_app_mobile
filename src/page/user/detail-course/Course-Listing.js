import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../../component/footer/FooterUser";
import { searchCourse } from "../../../redux/courseSlice"; // Import the searchCourse action

export default function CourseListing({ navigation }) {
  const dispatch = useDispatch();
  const { listCourse, isLoading, isError } = useSelector(
    (state) => state.course
  );

  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Handle search when search button is pressed
  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(searchCourse(searchTerm)); // Dispatch the search action
    }
  };

  const CourseListItem = ({ item }) => (
    <View style={styles.courseItem}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("courseDetailOverView", { courseID: item.id })
        }
      >
        <Image
          source={{ uri: item.image }}
          style={styles.courseImage}
        />
      </TouchableOpacity>
      <View style={styles.courseDetails}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("courseDetailOverView", { courseID: item.id })
          }
        >
          <Text style={styles.courseName}>{item.name}</Text>
        </TouchableOpacity>
        <Text style={styles.instructorName}>
          {item.UserFollow[0]?.user.userName}
        </Text>
        <Text style={styles.price}>${item.Orders[0]?.OrderDetail?.price}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />

          <Text style={styles.rating}>{item.averageRating.toFixed(2)}</Text>
          <Text style={styles.reviews}>({item.totalRating} reviews)</Text>
        </View>
        <Text style={styles.lessons}>{item.totalLessons} lessons</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search for courses"
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm} // Update search term
          />
          <TouchableOpacity style={styles.filterButton} onPress={handleSearch}>
            <Text style={styles.filterButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Results */}
        <Text style={styles.resultsText}>{listCourse.length} Results</Text>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#00BCD4"
            style={styles.loadingIndicator}
          />
        ) : isError ? (
          <Text style={styles.errorText}>
            Error occurred while fetching courses
          </Text>
        ) : (
          <FlatList
            data={listCourse}
            renderItem={({ item }) => <CourseListItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            nestedScrollEnabled={true} // Kích hoạt cuộn lồng nhau -> do lồng trong scrollView
          />
        )}
      </ScrollView>

        <Footer navigation={navigation} showActive="search" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9", // Light background color
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    position: "absolute",
    left: 20,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingLeft: 45,
    paddingRight: 10,
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
  resultsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 15,
  },
  loadingIndicator: {
    marginTop: 30,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },

  courseItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: "contain",
  },
  courseDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  courseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  instructorName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00BCD4",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFD700",
    marginLeft: 5,
  },
  reviews: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  lessons: {
    fontSize: 14,
    color: "#666",
  },
});
