import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../component/Footer";

const data = [
  {
    id: 1,
    image: require("../../../img/User_Profile/ProductDesign.jpg"),
    title: "Product Design",
    author: "Dennis Sweeney",
    price: 190,
    rating: 4.5,
    lessons: 12,
  },
  {
    id: 2,
    image: require("../../../img/User_Profile/ProductDesign.jpg"),
    title: "Website Design",
    author: "Ramono Wultschner",
    price: 59,
    rating: 4.5,
    lessons: 12,
  },

  {
    id: 3,
    image: require("../../../img/User_Profile/ProductDesign.jpg"),
    title: "Mobile UI Design",
    author: "Ramono Wultschner",
    price: 320,
    rating: 4.5,
    lessons: 12,
  },

  {
    id: 4,
    image: require("../../../img/User_Profile/ProductDesign.jpg"),
    title: "Digital Portrait",
    author: "Ramono Wultschner",
    price: 67,
    rating: 4.5,
    lessons: 12,
  },

  {
    id: 5,
    image: require("../../../img/User_Profile/ProductDesign.jpg"),
    title: "Product Design",
    author: "Dennis Sweeney",
    price: 190,
    rating: 4.5,
    lessons: 12,
  },

  {
    id: 6,
    image: require("../../../img/User_Profile/ProductDesign.jpg"),
    title: "Product Design",
    author: "Dennis Sweeney",
    price: 190,
    rating: 4.5,
    lessons: 12,
  },
];

const Item = ({ image, title, author, price, rating, lessons }) => (
  <View style={styles.courseItem}>
    <Image source={image} style={styles.courseImage} />
    <View style={styles.courseInfo}>
      <Text style={styles.courseTitle}>{title}</Text>
      <Text style={styles.courseAuthor}>{author}</Text>
      <View style={styles.courseDetails}>
        <Text style={styles.coursePrice}>${price}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <Text style={styles.lessonCount}>{lessons} lessons</Text>
      </View>
    </View>
    <Ionicons name="bookmark" style={styles.bookmarkIcon} />
  </View>
);

export default function UserProfileScreen({navigation, route}) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>User's profile</Text>
        </View>
        <View style={styles.profileSection}>
          <Image
            source={require("./../../../img/User_Profile/UserProfile1.jpg")}
            style={styles.bannerImage}
          />
          <Image
            source={require("./../../../img/User_Profile/User_Profile.jpg")}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Nhi Nhi</Text>
          <Text style={styles.userTitle}>UI/UX Designer</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>25</Text>
              <Text style={styles.statLabel}>On going</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>25</Text>
              <Text style={styles.statLabel}>Cancelled</Text>
            </View>
          </View>
        </View>
        <View style={styles.savedCoursesSection}>
          <Text style={styles.sectionTitle}>Saved courses</Text>

          <FlatList
            data={data}
            renderItem={({ item }) => (
              //  image, title, author, price, rating, lessons
              <Item
                image={item.image}
                title={item.title}
                author={item.author}
                price={item.price}
                rating={item.rating}
                lesson={item.lesson}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
      <Footer navigation={navigation} route={route}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 16,
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  bannerImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFF",
    position: "absolute",
    top: 100,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 60,
  },
  userTitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  savedCoursesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  courseItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  courseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  courseAuthor: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  courseDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
  lessonCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 12,
  },
  bookmarkIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    fontSize: 24,
    color: "#4A90E2",
  },
});
