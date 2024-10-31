import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Bookmark, Star } from "lucide-react-native";
import Footer from "./Footer";

export default function CourseListting({ navigation, route }) {
  const CourseListItem = ({ item }) => (
    <View style={styles.courseItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate("courseDetailOverView")}
      >
        <Image source={{ uri: item.image }} style={styles.courseImage} />
      </TouchableOpacity>
      <View style={styles.courseDetails}>
        <View style={styles.courseHeader}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("courseDetailOverView")}
            >
              <Text style={styles.courseTitle}>{item.title}</Text>
            </TouchableOpacity>
            {item.isBestSeller && (
              <View style={styles.bestSellerBadge}>
                <Text style={styles.bestSellerText}>Best-seller</Text>
              </View>
            )}
          </View>
          <TouchableOpacity>
            <Bookmark size={24} color="#00BCD4" />
          </TouchableOpacity>
        </View>
        <Text style={styles.instructorName}>{item.instructor}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFD700" fill="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews})</Text>
          <Text style={styles.lessons}>{item.lessons} lessons</Text>
        </View>
      </View>
    </View>
  );

  const courses = [
    {
      id: "1",
      title: "UX Foundation",
      instructor: "Sara Weise",
      price: 51,
      rating: 4.5,
      reviews: 1233,
      lessons: 13,
      image: "https://v0.dev/placeholder.svg?height=100&width=100",
      isBestSeller: true,
    },
    {
      id: "2",
      title: "Design Basics",
      instructor: "Kelly Hamilton",
      price: 89,
      rating: 4.5,
      reviews: 1233,
      lessons: 12,
      image: "https://v0.dev/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      title: "Digital Sketching",
      instructor: "Ramono Wultschner",
      price: 49,
      rating: 4.5,
      reviews: 1233,
      lessons: 8,
      image: "https://v0.dev/placeholder.svg?height=100&width=100",
    },
    {
      id: "4",
      title: "Digital Portrait",
      instructor: "Ramono Wultschner",
      price: 67,
      rating: 4.5,
      reviews: 1233,
      lessons: 11,
      image: "https://v0.dev/placeholder.svg?height=100&width=100",
    },
    {
      id: "5",
      title: "Web Design",
      instructor: "Ryan Meyers",
      price: 29,
      rating: 4.5,
      reviews: 1233,
      lessons: 12,
      image: "https://v0.dev/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <View style={styles.container}>
      

      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Design"
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>120 Results</Text>

        <FlatList
          data={courses}
          renderItem={({ item }) => <CourseListItem item={item} />}
          keyExtractor={(item) => item.id}
          style={styles.container}
        />
      </ScrollView>

      <Footer navigation={navigation} route={route}/>
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

  courseItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  courseDetails: {
    flex: 1,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bestSellerBadge: {
    backgroundColor: "#00BCD4",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  bestSellerText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  instructorName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00BCD4",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
    marginRight: 4,
  },
  reviews: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  lessons: {
    fontSize: 14,
    color: "#666",
  },

  
});
