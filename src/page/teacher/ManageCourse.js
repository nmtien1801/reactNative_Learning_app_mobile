import React from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../component/Footer";

const courses = [
  {
    id: "1",
    title: "UX Foundation",
    duration: "2h 30 mins",
    category: "Design",
    image: require("../../../img/User_Profile/Digital.jpg"),
  },
  {
    id: "2",
    title: "Design Basics",
    duration: "1h 25 mins",
    category: "Design",
    image: require("../../../img/User_Profile/ProductDesign.jpg"),
  },
  {
    id: "3",
    title: "Digital Sketching",
    duration: "3h 45 mins",
    category: "Business",
    image: require("../../../img/User_Profile/ProductDesign.jpg"),
  },
  {
    id: "4",
    title: "Digital Portrait",
    duration: "2h 15 mins",
    category: "Business",
    image: require("../../../img/User_Profile/ProductDesign.jpg"),
  },
  {
    id: "5",
    title: "Web Design",
    duration: "2h 35 mins",
    category: "Code",
    image: require("../../../img/User_Profile/ProductDesign.jpg"),
  },
  {
    id: "6",
    title: "Web Design",
    duration: "2h 35 mins",
    category: "Code",
    image: require("../../../img/User_Profile/ProductDesign.jpg"),
  },
  {
    id: "7",
    title: "Web Design",
    duration: "2h 35 mins",
    category: "Code",
    image: require("../../../img/User_Profile/ProductDesign.jpg"),
  },
];

export default function Component({ navigation }) {
  const renderCourseItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("ManageLesson")}>
      <View style={styles.courseCard}>
        <Image source={item.image} style={styles.courseImage} />
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.courseDuration}>{item.duration}</Text>
          <Text style={styles.courseCategory}>Categories: {item.category}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => navigation.navigate("FormCourse")}>
            <View style={[styles.iconButton, styles.editButton]}>
              <Ionicons name="pencil" size={18} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.iconButton, styles.trashButton]}>
              <Ionicons name="trash" size={18} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>My course</Text>

        <View style={styles.header1}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search course"
              placeholderTextColor="#666"
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity>
              <View style={styles.searchButton}>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("FormCourse")}>
            <View style={[styles.iconButton, styles.addButton]}>
              <Ionicons name="add" size={18} color="#FFf" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false} // ẩn thanh cuộn
        contentContainerStyle={styles.listContainer} // style cho cái view bao bọc FlatList
      />

      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
  },
  header1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  searchButton: {
    padding: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 4,
    margin: 4,
  },
  listContainer: {
    padding: 16,
  },
  courseCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 4,
    marginBottom: 8,
    padding: 12,
    elevation: 2,
    overflow: "hidden",
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  courseInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  courseDuration: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  courseCategory: {
    fontSize: 14,
    color: "#666",
  },
  actionButtons: {
    justifyContent: "space-between",
    paddingLeft: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    overflow: "hidden",
    // Shadow for Android
    elevation: 15,
  },
  editButton: {
    backgroundColor: "#1DCCE4",
  },
  trashButton: {
    backgroundColor: "#DD5159",
  },
  addButton: {
    backgroundColor: "#69E41D",
    marginLeft: 20,
    justifyContent: "center",
  },
});
